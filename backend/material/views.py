from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Material
from .serializers import MaterialSerializer


@api_view(["GET"])
def material_list(request):
    materials = Material.objects.all()
    serializer = MaterialSerializer(materials, many=True)
    return Response(serializer.data)


@api_view(["POST"])
def material_set(request):
    material = Material.objects.get(id=request.data["id"])
    serializer = MaterialSerializer(material, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def material_new(request):
    serializer = MaterialSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
