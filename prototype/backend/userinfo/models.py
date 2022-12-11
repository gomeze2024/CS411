from django.db import models
<<<<<<< HEAD
from .api import get_weather_2, get_news_2
=======
from .api2 import get_weather

>>>>>>> b060a4af3adef94b0b15ad65245e840fbaafffed
# Create your models here.

list_display = ('id', 'user_email', 'location', 'weather', 'news','color')
class UserInfo(models.Model):
    id = models.CharField(max_length=320, default=0, primary_key=True)
    user_email = models.CharField(max_length=320)
    location = models.TextField(default= "We don't have your location yet. Give it to us please")
    weather = models.JSONField(default= 'dict')
    news = models.JSONField(default= 'dict')
    color = models.TextField(default=  "We can't update your color without you updating your color. Give it to us please")

    def _str_(self):
        return self.title

    def save(self, *args, **kwargs):
<<<<<<< HEAD
        ip_string = self.location
        self.weather = get_weather_2 (ip_string)
        self.news = get_news_2 ()
=======
        zip_string = self.location
        self.weather = get_weather(zip_string)
>>>>>>> b060a4af3adef94b0b15ad65245e840fbaafffed
        super().save(*args, **kwargs) 
