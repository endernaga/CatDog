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


@extend_schema(methods=["GET"], responses={200: DogSerializer(many=True)})
@extend_schema(
    methods=["POST", "DELETE"],
    responses={201: None},
    request=OpenApiParameter(
        name="bbox",
        location=OpenApiParameter.HEADER,
    ),
    examples=[OpenApiExample(name="Examples", value={"kind": "string", "id": 0})],
)
@api_view(["GET", "POST"])
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
        animal_kind = request.data.get("kind")
        animal_id = request.data.get("id")
        if not animal_kind:
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data={"kind": "this field is required"},
            )
        if not animal_id:
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data={"id": "this field is required"},
            )
        liked.add(kind=animal_kind, animal_id=animal_id)
        return Response(
            status=status.HTTP_201_CREATED,
            data=DogSerializer(liked.get_pets(kind=animal_kind, id=animal_id)).data,
        )


@extend_schema(methods=["GET"], responses={200: DogSerializer(many=True)})
@api_view(["GET"])
def liked_cats(request):
    if request.method == "GET":
        pagination = PageNumberPagination()
        pagination.page_size = 10
        animals = list(Liked(request).get_cats())
        result_page = pagination.paginate_queryset(queryset=animals, request=request)
        animal_serializer = DogSerializer(result_page, many=True)
        return pagination.get_paginated_response(animal_serializer.data)


@extend_schema(methods=["GET"], responses={200: DogSerializer(many=True)})
@api_view(["GET"])
def liked_dogs(request):
    if request.method == "GET":
        pagination = PageNumberPagination()
        pagination.page_size = 10
        animals = Liked(request).get_dogs()
        result_page = pagination.paginate_queryset(queryset=animals, request=request)
        animal_serializer = DogSerializer(result_page, many=True)
        return pagination.get_paginated_response(animal_serializer.data)


@api_view(["DELETE"])
def delete_liked_dog(request, pk):
    if request.method == "DELETE":
        try:
            Liked(request).remove("cats", str(pk))
        except KeyError:
            return Response(
                data="No animals this kind added yet", status=status.HTTP_404_NOT_FOUND
            )
        return Response(data="success", status=status.HTTP_204_NO_CONTENT)


@api_view(["DELETE"])
def delete_liked_cat(request, pk):
    if request.method == "DELETE":
        try:
            Liked(request).remove("cats", str(pk))
        except KeyError:
            return Response(
                data="No animals this kind added yet", status=status.HTTP_404_NOT_FOUND
            )
        return Response(data="success")
