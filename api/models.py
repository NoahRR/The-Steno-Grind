from django.db import models
from django.contrib.auth.models import User


# groups of words
class WordGroup(models.Model):
    parent = models.ForeignKey(User, on_delete=models.CASCADE)

    name = models.CharField(max_length=100, blank=False, default="unnamed group")

    def __str__(self):
        return self.name

# levels of new words following 'THE ART OF CHORDING'
class Levels(models.Model):
    #  parent = models.ForeignKey(User, on_delete=models.CASCADE)

    name = models.CharField(max_length=100, blank=False, default="unnamed group")

    def __str__(self):
        return self.name

# custom inputs
class Word(models.Model):
    #  parent_user = models.ForeignKey(User, on_delete=models.CASCADE, blank=False)
    parent_group = models.ForeignKey(WordGroup, on_delete=models.CASCADE, blank=False, null=True)
    parent_level = models.ForeignKey(Levels, on_delete=models.CASCADE, blank=False, null=True)

    stroke = models.CharField(max_length=20, blank=True, null=True)
    translation = models.CharField(max_length=200, blank=False, default="N/A")

    def __str__(self):
        return self.translation


