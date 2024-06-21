import random

from django.db.models import Max
from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from usolapohvist_app.serializers import (
    CatSerializer,
    ImagesSerializer,
    CatListSerializer,
    DogSerializer,
    DogListSerializer,
)

from usolapohvist_app.models import Cat, Dog


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
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

        if age:
            queryset = queryset.filter(age__in=age.split(","))

        if sex:
            queryset = queryset.filter(sex=sex)

        if vaccinated:
            queryset = queryset.filter(vaccinated=vaccinated == "true")

        if sterilized:
            queryset = queryset.filter(sterilized=sterilized == "true")

        return queryset

    def get_serializer_class(self):
        if self.action == "add_new_photo":
            return ImagesSerializer

        if self.action == "list":
            return CatListSerializer

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

        if age:
            queryset = queryset.filter(age__in=age.split(","))

        if sex:
            queryset = queryset.filter(sex=sex)

        if vaccinated:
            queryset = queryset.filter(vaccinated=vaccinated == "true")

        if sterilized:
            queryset = queryset.filter(sterilized=sterilized == "true")

        if size:
            queryset = queryset.filter(size=size)

        return queryset

    def get_serializer_class(self):
        if self.action == "add_new_photo":
            return ImagesSerializer

        if self.action == "list":
            return DogListSerializer

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
        obj.objects.all().filter(sex="female").aggregate(max_id=Max("id"))["max_id"]
    )
    while True:
        pk = random.randint(1, max_id)
        category = obj.objects.filter(pk=pk, sex="female").first()
        if category:
            return category


def get_male(obj):
    max_id = obj.objects.all().filter(sex="male").aggregate(max_id=Max("id"))["max_id"]
    while True:
        pk = random.randint(1, max_id)
        category = obj.objects.filter(pk=pk, sex="male").first()
        if category:
            return category
