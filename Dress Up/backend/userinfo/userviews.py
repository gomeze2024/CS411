from django.shortcuts import render
from rest_framework import viewsets
from .serializers import UserInfoSerializer
from .models import UserInfo

# Create your views here.

class UserInfoView(viewsets.ModelViewSet):
    serializer_class = UserInfoSerializer
    queryset = UserInfo.objects.all()