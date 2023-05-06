from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Store
from .serializers import StoreSerializer


@api_view(['GET', 'POST'])
def store_list(request):
    if request.method == 'GET':
        stores = Store.objects.all()
        serializer = StoreSerializer(stores, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        store = Store.objects.get(id=request.data['id'])
        store.status = request.data['status']
        store.good = request.data['good']
        store.details = request.data['details']
        store.save()
        serializer = StoreSerializer(store)
        return Response(serializer.data)
