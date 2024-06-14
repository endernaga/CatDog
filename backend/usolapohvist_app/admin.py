from django.contrib import admin
from usolapohvist_app.models import Cat, Dog

# Register your models here.
admin.site.register((Cat, Dog))
