from django.urls import path, include
from rest_framework import routers

from usolapohvist_app.views import (
    CatViewSet,
    DogViewSet,
    guess_the_sex,
    save_sos_form,
    Animals,
)

router = routers.DefaultRouter()
router.register("cats", CatViewSet)
router.register("dogs", DogViewSet)
router.register("animals", Animals, basename="animals")

urlpatterns = [
    path("", include(router.urls)),
    path("heOrShe/", guess_the_sex),
    path("sos/", save_sos_form),
]


app_name = "usolapohvist_app"
