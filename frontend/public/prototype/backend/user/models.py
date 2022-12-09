from django.db import models
# Create your models here.
list_display = ('id', 'user_num', 'user_database')
class User(models.Model):
    id = models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    user_num = models.IntegerField(default=0)
    user_database = models.TextField(default= "")

    def _str_(self):
        return self.title
