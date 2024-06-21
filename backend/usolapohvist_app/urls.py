from django.urls import path, include
from rest_framework import routers

from usolapohvist_app.views import CatViewSet, DogViewSet, guess_the_sex

router = routers.DefaultRouter()
router.register("cats", CatViewSet)
router.register("dogs", DogViewSet)

urlpatterns = [path("", include(router.urls)), path("heOrShe/", guess_the_sex)]


app_name = "usolapohvist_app"
