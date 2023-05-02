from rest_framework import serializers
from .models import Setting
from django.contrib.auth import get_user_model

User = get_user_model()


class SettingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Setting
        fields = '__all__'
        read_only_fields = ('key',)
