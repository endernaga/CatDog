import random
from itertools import chain
from operator import attrgetter

import telebot
from django.db.models import Max, QuerySet
from rest_framework import viewsets, status, mixins
from rest_framework.decorators import action, api_view
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from usolapohvist import settings
from usolapohvist_app.serializers import (
    CatSerializer,
    ImagesSerializer,
    CatListSerializer,
    DogSerializer,
    DogListSerializer,
    CatDetailSerializer,
    DogDetailSerializer,
)

from usolapohvist_app.models import Cat, Dog


def filter_queryset(
    qs: QuerySet,
    sex: str = None,
    age: str = None,
    vaccinated: str = None,
    sterilized: str = None,
    size: str = None,
) -> QuerySet:
    if sex:
        if sex == "male":
            sex = "Хлопчик"

        if sex == "female":
            sex = "Дівчинка"

        qs = qs.filter(sex=sex)

    if size:
        if size == "small":
            size = "Маленький (до 30 см)"

        if size == "average":
            size = "Середній (30-50 см)"

        if size == "big":
            size = "Великий (від 50 см)"

        qs = qs.filter(size=size)

    if age:
        if age == "young":
            qs = qs.filter(age=1)

        if age == "teenager":
            qs = qs.filter(age__in=[2, 3, 4, 5])

        if age == "old":
            qs = qs.filter(age__gt=5)

    if vaccinated:
        qs = qs.filter(vaccinated=vaccinated == "true")

    if sterilized:
        qs = qs.filter(sterilized=sterilized == "true")

    return qs


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 9
    page_size_query_param = "page_size"
    max_page_size = 20


class AddNewPhoto:

    @action(detail=True, methods=["POST"], url_path="addphoto")
    def add_new_photo(self, request, pk=None):
        animal = self.get_object()
        serializer = ImagesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            animal.photo.add(serializer.instance)
            animal.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Animals(mixins.ListModelMixin, GenericViewSet):
    pagination_class = StandardResultsSetPagination
    serializer_class = DogListSerializer

    def get_queryset(self):
        dogs = Dog.objects.all()
        cats = Cat.objects.all()

        sex = self.request.GET.get("sex")
        age = self.request.GET.get("age")
        vaccinated = self.request.GET.get("vaccinated")
        sterilized = self.request.GET.get("sterilized")
        size = self.request.GET.get("size")

        cats = filter_queryset(cats, sex, age, vaccinated, sterilized)
        dogs = filter_queryset(dogs, sex, age, vaccinated, sterilized, size)

        return sorted(list(chain(cats, dogs)), key=attrgetter("id"))


class CatViewSet(viewsets.ModelViewSet, AddNewPhoto):
    queryset = Cat.objects.all()
    serializer_class = CatSerializer
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        queryset = Cat.objects.all()
        sex = self.request.GET.get("sex")
        age = self.request.GET.get("age")
        vaccinated = self.request.GET.get("vaccinated")
        sterilized = self.request.GET.get("sterilized")

        return filter_queryset(queryset, sex, age, vaccinated, sterilized)

    def get_serializer_class(self):
        if self.action == "add_new_photo":
            return ImagesSerializer

        if self.action == "list":
            return CatListSerializer

        if self.action == "retrieve":
            return CatDetailSerializer

        return CatSerializer


class DogViewSet(viewsets.ModelViewSet, AddNewPhoto):
    queryset = Dog.objects.all()
    serializer_class = DogSerializer
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        queryset = Dog.objects.all()
        sex = self.request.GET.get("sex")
        age = self.request.GET.get("age")
        vaccinated = self.request.GET.get("vaccinated")
        sterilized = self.request.GET.get("sterilized")
        size = self.request.GET.get("size")

        return filter_queryset(queryset, sex, age, vaccinated, sterilized, size)

    def get_serializer_class(self):
        if self.action == "add_new_photo":
            return ImagesSerializer

        if self.action == "list":
            return DogListSerializer

        if self.action == "retrieve":
            return DogDetailSerializer

        return DogSerializer


@api_view(["GET"])
def guess_the_sex(request):
    dog_or_cat = random.choice(["dog", "cat"])
    resp = {
        "dog": {
            "male": DogSerializer(get_male(Dog)).data,
            "female": DogSerializer(get_female(Dog)).data,
        },
        "cat": {
            "male": CatSerializer(get_male(Cat)).data,
            "female": CatSerializer(get_female(Cat)).data,
        },
    }

    temp = list(resp[dog_or_cat].values())
    random.shuffle(temp)

    res = dict(zip(resp[dog_or_cat], temp))

    return Response(res)


def get_female(obj):
    max_id = (
        obj.objects.all().filter(sex="Дівчинка").aggregate(max_id=Max("id"))["max_id"]
    )
    while True:
        pk = random.randint(1, max_id)
        category = obj.objects.filter(pk=pk, sex="Дівчинка").first()
        if category:
            return category


def get_male(obj):
    max_id = (
        obj.objects.all().filter(sex="Хлопчик").aggregate(max_id=Max("id"))["max_id"]
    )
    while True:
        pk = random.randint(1, max_id)
        category = obj.objects.filter(pk=pk, sex="Хлопчик").first()
        if category:
            return category


@api_view(["POST"])
def save_sos_form(request):
    if request.method == "POST":
        if not settings.BOT_TOKEN:
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data={"error": "BOT_TOKEN is required"},
            )
        bot = telebot.TeleBot(settings.BOT_TOKEN)
        text = f"""!!!SOS!!!
        {request.data.get('name')}
        {request.data.get('phone')}
        {request.data.get('text')}
        """
        bot.send_message("-4229249922", text)
        return Response(status=status.HTTP_201_CREATED, data="success")
