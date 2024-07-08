from django.urls import path

<<<<<<< HEAD
from liked_animals.views import liked_animals, get_liked_cats, get_liked_dogs

urlpatterns = [
    path("liked_animals/", liked_animals),
    path("liked_cats/", get_liked_cats),
    path("liked_dogs/", get_liked_dogs),
=======
from liked_animals.views import (
    liked_animals,
    liked_cats,
    liked_dogs,
    delete_liked_dog,
    delete_liked_cat,
)

urlpatterns = [
    path("liked_animals/", liked_animals),
    path("liked_cats/", liked_cats),
    path("liked_dogs/", liked_dogs),
    path("liked_dogs/<int:pk>/", delete_liked_dog),
    path("liked_cats/<int:pk>/", delete_liked_cat),
>>>>>>> origin/developers
]

app_name = "liked_animals"
