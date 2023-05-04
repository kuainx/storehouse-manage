from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Setting
from .serializers import SettingSerializer


@api_view(['GET', 'POST'])
def setting_list(request):
    if request.method == 'GET':
        settings = Setting.objects.all()
        serializer = SettingSerializer(settings, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        setting = Setting.objects.get(key=request.data['key'])
        setting.value=request.data['value']
        setting.save()
        settings = Setting.objects.all()
        serializer = SettingSerializer(settings, many=True)
        return Response(serializer.data)
