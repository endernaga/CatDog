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
    category = serializers.CharField(read_only=True)

    def get_photo(self, obj):
        return [i.image.url for i in obj.photo.all()]

    class Meta:
        model = Cat
        fields = (
            "id",
            "name",
            "category",
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

    def create(self, validated_data):
        return Cat.objects.create(**validated_data, category="cat")


class CatListSerializer(CatSerializer):

    def get_photo(self, obj):
        return obj.photo.first().image.url if obj.photo.first() else None

    class Meta:
        model = Cat
        fields = (
            "id",
            "name",
            "category",
            "photo",
            "sex",
            "age",
            "sterilized",
            "vaccinated",
        )


class DogSerializer(serializers.ModelSerializer):
    photo = serializers.SerializerMethodField(read_only=True, source="get_photo")
    category = serializers.CharField(read_only=True)

    def get_photo(self, obj):
        return [i.image.url for i in obj.photo.all()]

    class Meta:
        model = Dog
        fields = (
            "id",
            "name",
            "category",
            "photo",
            "sex",
            "age",
            "description",
            "specifics",
            "history",
            "character",
            "sterilized",
            "vaccinated",
            "size",
        )

    def create(self, validated_data):
        return Dog.objects.create(**validated_data, category="dog")


class DogListSerializer(DogSerializer):
    def get_photo(self, obj):
        return obj.photo.first().image.url if obj.photo.first() else None

    class Meta:
        model = Dog
        fields = (
            "id",
            "name",
            "category",
            "photo",
            "sex",
            "age",
            "sterilized",
            "vaccinated",
            "size",
        )
