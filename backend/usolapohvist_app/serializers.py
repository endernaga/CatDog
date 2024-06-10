from rest_framework import serializers

from usolapohvist_app.models import Cat, ImagesForAnimals, Dog


class ImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImagesForAnimals
        fields = ("image",)

    def pre_save(self, obj):
        obj.samplesheet = self.request.FILES.get("file")


class CatSerializer(serializers.ModelSerializer):
    photo = serializers.SerializerMethodField(read_only=True, source="get_photo")

    def get_photo(self, obj):
        return [i.image.url for i in obj.photo.all()]

    class Meta:
        model = Cat
        fields = (
            "id",
            "name",
            "photo",
            "sex",
            "age",
            "description",
            "specifics",
            "history",
            "character",
            "sterilized",
            "vaccinated",
        )


class CatListSerializer(CatSerializer):

    def get_photo(self, obj):
        return obj.photo.first().image.url

    class Meta:
        model = Cat
        fields = ("id", "name", "photo", "sex", "age", "sterilized", "vaccinated")


class DogSerializer(serializers.ModelSerializer):
    photo = serializers.SerializerMethodField(read_only=True, source="get_photo")

    def get_photo(self, obj):
        return [i.image.url for i in obj.photo.all()]

    class Meta:
        model = Dog
        fields = (
            "id",
            "name",
            "photo",
            "sex",
            "age",
            "description",
            "specifics",
            "history",
            "character",
            "sterilized",
            "vaccinated",
            "size"
        )
