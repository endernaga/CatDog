from drf_spectacular.utils import (
    extend_schema,
    OpenApiParameter,
    inline_serializer,
    OpenApiExample,
)
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from liked_animals.liked import Liked
from usolapohvist_app.serializers import DogSerializer

@extend_schema(
    methods=["GET"],
    responses={200: DogSerializer(many=True)}
)
@extend_schema(
    methods=["DELETE"],
    responses={204: None},
    description="<h1>Delete an liked animal , you should send in body a kind as string and id as integer</h1>",
)
@extend_schema(
    methods=["POST", "DELETE"],
    responses={201: None},
    request=OpenApiParameter(
        name="bbox",
        location=OpenApiParameter.HEADER,
    ),
    examples=[OpenApiExample(name="Examples", value={"kind": "string", "id": 0})],
)
@api_view(["GET", "POST", "DELETE"])
def liked_animals(request):
    if request.method == "GET":
        pagination = PageNumberPagination()
        pagination.page_size = 10
        animals = list(Liked(request))
        result_page = pagination.paginate_queryset(queryset=animals, request=request)
        animal_serializer = DogSerializer(result_page, many=True)
        return pagination.get_paginated_response(animal_serializer.data)
    if request.method == "POST":
        liked = Liked(request)
        animal_kind = request.POST.get("kind")
        animal_id = request.POST.get("id")
        liked.add(animal_kind, animal_id)
        return Response(status=status.HTTP_201_CREATED)
    if request.method == "DELETE":
        liked = Liked(request)
        animal_kind = request.POST.get("kind")
        animal_id = request.POST.get("id")
        liked.remove(animal_kind, animal_id)
        return Response(status=status.HTTP_204_NO_CONTENT)

@extend_schema(
    methods=["GET"],
    responses={200: DogSerializer(many=True)}
)
@api_view(["GET"])
def get_liked_cats(request):
    pagination = PageNumberPagination()
    pagination.page_size = 10
    animals = list(Liked(request).get_cats())
    result_page = pagination.paginate_queryset(queryset=animals, request=request)
    animal_serializer = DogSerializer(result_page, many=True)
    return pagination.get_paginated_response(animal_serializer.data)

@extend_schema(
    methods=["GET"],
    responses={200: DogSerializer(many=True)}
)
@api_view(["GET"])
def get_liked_dogs(request):
    pagination = PageNumberPagination()
    pagination.page_size = 10
    animals = Liked(request).get_dogs()
    result_page = pagination.paginate_queryset(queryset=animals, request=request)
    animal_serializer = DogSerializer(result_page, many=True)
    return pagination.get_paginated_response(animal_serializer.data)
