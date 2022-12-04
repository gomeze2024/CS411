from django.db import models
from .api import get_weather_2
# Create your models here.
list_display = ('user_email', 'location', 'weather', 'news','color')
class UserInfo(models.Model):
    user_email = models.CharField(max_length=320, default = "email@gmail.com")
    location = models.TextField(default= "We don't have your location yet. Give it to us please")
    weather = models.TextField(default= "We can't update your weather without your location. Give it to us please")
    news = models.TextField(default=  "We can't update your news without your location. Give it to us please")
    color = models.TextField(default=  "We can't update your color without you updating your color. Give it to us please")

    def _str_(self):
        return self.title
