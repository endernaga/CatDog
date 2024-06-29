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
        cats = Cat.objects.filter(id__in=self.liked.get("cat")) if self.liked.get("cat") else []
        dogs = Dog.objects.filter(id__in=self.liked.get("dog")) if self.liked.get("dog") else []
        animals = list(chain(cats, dogs))
        for animal in animals:
            yield animal

    def get_dogs(self):
        return Dog.objects.filter(id__in=self.liked.get("cat"))

    def get_cats(self):
        return Cat.objects.filter(id__in=self.liked.get("dog"))

    def __len__(self):
        return sum(self.liked.get("cat"), self.liked.get("dog"))

    def add(self, kind: str, animal_id: int):
        if kind not in self.liked:
            self.liked[kind] = [animal_id]
        else:
            self.liked[kind].append(animal_id)
        self.save()

    def save(self):
        self.session.modified = True

    def remove(self, kind: str, animal_id: int):
        if animal_id in self.liked[kind]:
            print(animal_id)
            self.liked[kind].remove(animal_id)
            self.save()

    def clear(self):
        del self.session[settings.LIKED_SESSION_ID]
        self.save()
