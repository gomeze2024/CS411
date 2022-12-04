from django.db import models
from .api import get_weather_2
# Create your models here.

class DressUp(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField(default= get_weather_2())
    completed = models.BooleanField(default=False)

    def _str_(self):
        return self.title
