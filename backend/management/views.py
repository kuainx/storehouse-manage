from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings
import tablib

from .models import Setting
from .serializers import SettingSerializer
from .resource import SettingResource


@api_view(['GET', 'POST'])
def setting_list(request):
    if request.method == 'GET':
        settings = Setting.objects.all()
        serializer = SettingSerializer(settings, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        setting = Setting.objects.get(key=request.data['key'])
        setting.value = request.data['value']
        setting.save()
        settings = Setting.objects.all()
        serializer = SettingSerializer(settings, many=True)
        return Response(serializer.data)


@api_view(['POST'])
def init_settings(request):
    with open(settings.BASE_DIR / "statics/defaultSettings.csv", "r", encoding="utf-8") as r:
        data = tablib.Dataset().load(r)
        result = SettingResource().import_data(
            data, dry_run=True)  # Test the data import
        if not result.has_errors():
            SettingResource().import_data(
                data, dry_run=False)  # Actually import now
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
