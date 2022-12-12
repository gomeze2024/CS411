from rest_framework import serializers
from .models import UserInfo

class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = ('id','user_email', 'location', 'weather', 'news','color')