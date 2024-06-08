from django.db import models


SIZE_CHOICES = (("S", "Small"), ("M", "Medium"), ("L", "Large"))


# Create your models here.
class Animals(models.Model):
    name = models.CharField(max_length=255)
    photo = models.ImageField(upload_to="animals_image")
    sex = models.TextField(
        choices=(("male", "Male"), ("female", "Female")), default="male"
    )
    age = models.IntegerField()
    description = models.TextField()
    countOfFavor = models.IntegerField()
    specifics = models.CharField(max_length=255)
    history = models.TextField()
    character = models.CharField(255)

    class Meta:
        abstract = True


class Cat(Animals):
    pass


class Dog(Animals):
    size = models.CharField(choices=SIZE_CHOICES, default="S", max_length=255)
