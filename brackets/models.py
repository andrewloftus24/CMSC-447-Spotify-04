from django.db import models

# Create your models here.

class Brackets(models.Model):
    text = models.TextField();
    image_url = models.TextField();

class ShareableLink(models.Model):
    shareCode = models.CharField(max_length=10)
    time_to_expire = models.DateTimeField(auto_now_add=True, blank=True)