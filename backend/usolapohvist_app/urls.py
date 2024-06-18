from django.urls import path, include
from rest_framework import routers

from usolapohvist_app.views import CatViewSet, DogViewSet

router = routers.DefaultRouter()
router.register("cats", CatViewSet)
router.register("dogs", DogViewSet)

urlpatterns = [path("", include(router.urls))]


app_name = "usolapohvist_app"
