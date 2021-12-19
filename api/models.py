from django.db import models

# Create your models here.
import string
import random

from django.db import models


# Create your models here.

def generate_code():
    return ''.join(random.choice(string.ascii_uppercase) for i in range(6))

class Lobby(models.Model):
    code = models.CharField(max_length=8, default=generate_code, unique=True)
    host = models.CharField(max_length=50, default=None, unique=True, primary_key=True)
    bracket_type = models.CharField(max_length=20, default='single_elim')
    song_type = models.CharField(max_length=10, default='Artist')
    artist = models.CharField(max_length=60, default='None')
    playlist = models.CharField(max_length=60, default='None')
    max_users = models.IntegerField()

class User(models.Model):
    host = models.ForeignKey(Lobby, on_delete=models.CASCADE)
    name = models.CharField(max_length=50, default=None)



