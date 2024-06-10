from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from usolapohvist_app.serializers import (
    CatSerializer,
    ImagesSerializer,
    CatListSerializer,
    DogSerializer,
)

from usolapohvist_app.models import Cat, Dog


class AddNewPhoto:

    @action(detail=True, methods=["POST"], url_path="addphoto")
    def add_new_photo(self, request):
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
