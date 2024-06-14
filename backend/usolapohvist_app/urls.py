from django.urls import path, include
from rest_framework import routers

from usolapohvist_app.views import CatViewSet

router = routers.DefaultRouter()
router.register("cats", CatViewSet)

urlpatterns = [
    path("", include(router.urls))
]


app_name = "usolapohvist_app"
