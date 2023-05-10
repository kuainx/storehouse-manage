from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Log
from .serializers import LogSerializer


@api_view(['GET'])
def log_list(request):
    logs = Log.objects.all().order_by('-id')[:10]
    serializer = LogSerializer(logs, many=True)
    return Response(serializer.data)
