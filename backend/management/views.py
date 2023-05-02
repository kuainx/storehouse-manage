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
        serializer = SettingSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
