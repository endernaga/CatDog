from rest_framework import serializers

from usolapohvist_app.models import Cat


class CatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cat
        fields = '__all__'

