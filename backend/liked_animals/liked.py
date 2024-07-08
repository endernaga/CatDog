from django.conf import settings
from itertools import chain

from usolapohvist_app.models import Cat, Dog


class Liked(object):
    def __init__(self, request):
        self.session = request.session
        liked = self.session.get(settings.LIKED_SESSION_ID)
        if not liked:
            liked = self.session[settings.LIKED_SESSION_ID] = {}
        self.liked = liked

    def __iter__(self):
<<<<<<< HEAD
        cats = Cat.objects.filter(id__in=self.liked.get("cats")) if self.liked.get("cats") else []
        dogs = Dog.objects.filter(id__in=self.liked.get("dogs")) if self.liked.get("dogs") else []
=======
        cats = (
            Cat.objects.filter(id__in=self.liked.get("cats"))
            if self.liked.get("cats")
            else []
        )
        dogs = (
            Dog.objects.filter(id__in=self.liked.get("dogs"))
            if self.liked.get("dogs")
            else []
        )
>>>>>>> origin/developers
        animals = list(chain(cats, dogs))
        for animal in animals:
            yield animal

    def get_dogs(self):
<<<<<<< HEAD
        return Dog.objects.filter(id__in=self.liked.get("cats"))

    def get_cats(self):
        return Cat.objects.filter(id__in=self.liked.get("dogs"))
=======
        return (
            Dog.objects.filter(id__in=self.liked.get("dogs"))
            if self.liked.get("dogs")
            else []
        )

    def get_cats(self):
        return (
            Cat.objects.filter(id__in=self.liked.get("cats"))
            if (self.liked.get("cats"))
            else []
        )
>>>>>>> origin/developers

    def __len__(self):
        return sum(self.liked.get("cats"), self.liked.get("dogs"))

    def add(self, kind: str, animal_id: int):
        if kind not in self.liked:
            self.liked[kind] = [animal_id]
        else:
            self.liked[kind].append(animal_id)
        self.save()

    def save(self):
        self.session.modified = True

<<<<<<< HEAD
    def remove(self, kind: str, animal_id: int):
        if animal_id in self.liked[kind]:
            print(animal_id)
=======
    def remove(self, kind: str, animal_id: str):
        if animal_id in self.liked[kind]:
>>>>>>> origin/developers
            self.liked[kind].remove(animal_id)
            self.save()

    def clear(self):
        del self.session[settings.LIKED_SESSION_ID]
        self.save()
