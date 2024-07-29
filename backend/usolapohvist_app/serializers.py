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


class CatDetailSerializer(CatSerializer):
    age = serializers.SerializerMethodField(method_name="get_age")

    def get_age(self, obj):
        age = obj.age
        if age == 1:
            return "1 рік"

        if 1 < age < 5:
            return f"{age} роки"

        if age >= 5:
            return f"{age} років"

    class Meta(CatSerializer.Meta): ...


class CatListSerializer(CatSerializer):
    age = serializers.SerializerMethodField(method_name="get_age")

    def get_age(self, obj):
        age = obj.age
        if age == 1:
            return "1 рік"

        if 1 < age < 5:
            return f"{age} роки"

        if age >= 5:
            return f"{age} років"

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


class DogDetailSerializer(DogSerializer):
    age = serializers.SerializerMethodField(method_name="get_age")
    size = serializers.SerializerMethodField(method_name="get_size")

    def get_size(self, obj):
        if obj.sex == "Дівчинка":
            if obj.size == "Маленький (до 30 см)":
                return "Маленька (до 30 см)"
            if obj.size == "Середній (30-50 см)":
                return "Середня (30-50 см)"
            if obj.size == "Великий (від 50 см)":
                return "Велика (від 50 см)"
        return obj.size

    def get_age(self, obj):
        age = obj.age
        if age == 1:
            return "1 рік"

        if 1 < age < 5:
            return f"{age} роки"

        if age >= 5:
            return f"{age} років"

    class Meta(DogSerializer.Meta): ...


class DogListSerializer(DogSerializer):
    age = serializers.SerializerMethodField(method_name="get_age")

    def get_age(self, obj):
        age = obj.age
        if age == 1:
            return "1 рік"

        if 1 < age < 5:
            return f"{age} роки"

        if age >= 5:
            return f"{age} років"

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
