from django.urls import path, include
from rest_framework import routers

from usolapohvist_app.views import CatViewSet, DogViewSet, guess_the_sex, save_sos_form

router = routers.DefaultRouter()
router.register("cats", CatViewSet)
router.register("dogs", DogViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("heOrShe/", guess_the_sex),
    path("sos/", save_sos_form),
]


app_name = "usolapohvist_app"
