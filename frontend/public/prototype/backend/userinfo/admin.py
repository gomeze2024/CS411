from django.contrib import admin
from .models import UserInfo

class UserInfoAdmin(admin.ModelAdmin):
    list_display = ('id', 'user_email', 'location', 'weather', 'news','color')

# Register your models here.

admin.site.register(UserInfo, UserInfoAdmin)