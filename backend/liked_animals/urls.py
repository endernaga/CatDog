from django.urls import path

from liked_animals.views import liked_animals, get_liked_cats, get_liked_dogs

urlpatterns = [
    path("liked_animals/", liked_animals),
    path("liked_cats/", get_liked_cats),
    path("liked_dogs/", get_liked_dogs),
]

app_name = "liked_animals"
