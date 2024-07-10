from django.contrib import admin
from usolapohvist_app.models import Cat, Dog, ImagesForAnimals

# Register your models here.
admin.site.register((Cat, Dog, ImagesForAnimals))
