from django.db.models import Q
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Task, TaskType
from .serializers import TaskSerializer
from management.models import Setting
from store.models import Store, StoreStatus
from store.serializers import StoreSerializer


@api_view(['POST'])
def task_import(request):
    n = int(Setting.objects.get(key="storen").value)
    task_num = [[i, Task.objects.filter(stacker=i).count()]
                for i in range(0, n)]
    task_num.sort(key=lambda k: k[1])
    stacker = task_num[0][0]
    empty_store = Store.objects.filter(status=StoreStatus.EMPTY).filter(
        Q(storen=stacker*2) | Q(storen=stacker*2+1)).first()
    empty_store.status = StoreStatus.RESERVED
    serializer = StoreSerializer(
        empty_store, data=request.data['material'], partial=True)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    serializer.save()
    # empty_store = []
    # for i in task_num:
    #     stacker = i[0]*2
    #     empty_store.append(Store.objects.filter(status=StoreStatus.EMPTY).filter(
    #         Q(storen=stacker) | Q(storen=stacker+1)).first())
    task_data = {
        "stacker": stacker,
        "type": TaskType.IN,
        "targetn": empty_store.storen,
        "targetx": empty_store.storex,
        "targety": empty_store.storey,
        "priority": request.data['priority']
    }
    serializer = TaskSerializer(data=task_data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    serializer.save()
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def task_export(request):
    useable_store = Store.objects.filter(status=StoreStatus.OCCUPIED).filter(
        material=request.data['material'])
    print(useable_store)
    reachable_n = 0
    return Response(status=status.HTTP_200_OK)
    task_data = {
        "stacker": stacker,
        "type": TaskType.IN,
        "targetn": empty_store.storen,
        "targetx": empty_store.storex,
        "targety": empty_store.storey,
        "priority": request.data['priority']
    }
    serializer = TaskSerializer(data=task_data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    serializer.save()
    return Response(serializer.data, status=status.HTTP_200_OK)
