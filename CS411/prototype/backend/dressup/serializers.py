from rest_framework import serializers
from .models import DressUp

class DressUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = DressUp
        fields = ('id', 'title', 'description', 'completed')