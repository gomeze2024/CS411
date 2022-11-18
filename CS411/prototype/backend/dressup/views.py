from django.shortcuts import render
from rest_framework import viewsets
from .serializers import DressUpSerializer
from .models import DressUp

# Create your views here.

class DressUpView(viewsets.ModelViewSet):
    serializer_class = DressUpSerializer
    queryset = DressUp.objects.all()