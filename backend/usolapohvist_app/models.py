from django.db import models


SIZE_CHOICES = (("S", "Small"), ("M", "Medium"), ("L", "Large"))
CATEGORY_CHOICES = (("dog", "Dog"), ("cat", "Cat"))


class ImagesForAnimals(models.Model):
    image = models.ImageField(upload_to="animals_image/%Y/%m/%d/")


# Create your models here.
class Animals(models.Model):
    name = models.CharField(max_length=255)
    photo: models.ManyToManyField
    sex = models.TextField(
        choices=(("male", "Male"), ("female", "Female")), default="male"
    )
    age = models.IntegerField()
    description = models.TextField()
    countOfFavor = models.IntegerField(default=0)
    specifics = models.CharField(max_length=255)
    category = models.CharField(choices=CATEGORY_CHOICES, default="cat")
    history = models.TextField()
    character = models.CharField(max_length=255, blank=True, null=True)
    sterilized = models.BooleanField(default=False)
    vaccinated = models.BooleanField(default=False)

    class Meta:
        abstract = True


class Cat(Animals):
    photo = models.ManyToManyField(ImagesForAnimals, related_name="cat_photo")


class Dog(Animals):
    photo = models.ManyToManyField(ImagesForAnimals, related_name="dog_photo")
    size = models.CharField(choices=SIZE_CHOICES, default="S", max_length=255)
