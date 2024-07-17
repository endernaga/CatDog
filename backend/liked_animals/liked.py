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
        animals = list(chain(cats, dogs))
        for animal in animals:
            yield animal

    def get_dogs(self):
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

    @staticmethod
    def get_pets(kind: str, id: int):
        if kind == "cats":
            return Cat.objects.get(id=id)
        if kind == "dogs":
            return Dog.objects.get(id=id)

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

    def remove(self, kind: str, animal_id: str):
        if kind not in self.liked:
            raise KeyError(f"Kind not added to session")

        if animal_id in self.liked[kind]:
            self.liked[kind].remove(animal_id)
            self.save()

    def clear(self):
        del self.session[settings.LIKED_SESSION_ID]
        self.save()
