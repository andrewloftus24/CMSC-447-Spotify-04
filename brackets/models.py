from django.db import models

# Create your models here.

class Brackets(models.Model):
    text = models.TextField();
    image_url = models.TextField();