from django.db.models import Q
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Task, TaskType
from .serializers import TaskSerializer
from management.models import Setting
from store.models import Store, StoreStatus
from store.serializers import StoreSerializer
from log.views import new_log, LogType


def stacker_sort():
    n = int(Setting.objects.get(key="storen").value)
    task_num = [[i, Task.objects.filter(stacker=i).count()] for i in range(0, n)]
    task_num.sort(key=lambda k: k[1])
    return task_num


@api_view(["POST"])
def task_import(request):
    task_num = stacker_sort()
    stacker = task_num[0][0]
    empty_store = (
        Store.objects.filter(status=StoreStatus.EMPTY)
        .filter(Q(storen=stacker * 2) | Q(storen=stacker * 2 + 1))
        .first()
    )
    empty_store.status = StoreStatus.RESERVED
    serializer = StoreSerializer(
        empty_store, data=request.data["material"], partial=True
    )
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
        "priority": request.data["priority"],
    }
    serializer = TaskSerializer(data=task_data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    serializer.save()
    new_log(
        "入库任务：" + empty_store.__str__() + "；物料：" + str(empty_store.material),
        "task_import",
    )
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["POST"])
def task_export(request):
    task_num = stacker_sort()
    for stacker in task_num:
        useable_store = (
            Store.objects.filter(status=StoreStatus.OCCUPIED)
            .filter(Q(storen=stacker[0] * 2) | Q(storen=stacker[0] * 2 + 1))
            .filter(material=request.data["material"]["material"])
        )
        if useable_store.count() != 0:
            cas = useable_store.order_by("-storey").first()
            cas.status = StoreStatus.LOCKED
            cas.save()
            task_data = {
                "stacker": stacker[0],
                "type": TaskType.OUT,
                "targetn": cas.storen,
                "targetx": cas.storex,
                "targety": cas.storey,
                "priority": request.data["priority"],
            }
            serializer = TaskSerializer(data=task_data)
            if not serializer.is_valid():
                return Response(
                    serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
            serializer.save()
            new_log("出库任务：" + cas.__str__() + "；物料：" + str(cas.material), "task_export")
            return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(status=status.HTTP_404_NOT_FOUND)


def toHex(num, length=2):
    return hex(num)[2:].zfill(length)


def get_task_resolve(str1):
    if str1[0:2] != "01":
        return "0301"
    stacker = int(str1[2:4], base=16)
    positiony = int(str1[4:6], base=16)
    positionx = int(str1[6:10], base=16)
    if str1[10:12] == "01":
        last_task = Task.objects.filter(stacker=stacker).filter(executing=True)
        if last_task.count() == 0:
            return "0302"
        last_task = last_task.first()
        print(last_task)
        last_task_store = Store.objects.get(
            storen=last_task.targetn, storey=last_task.targety, storex=last_task.targetx
        )
        if last_task_store.status == StoreStatus.RESERVED:
            last_task_store.status = StoreStatus.OCCUPIED
        if last_task_store.status == StoreStatus.LOCKED:
            last_task_store.status = StoreStatus.EMPTY
        new_log(
            "任务" + str(last_task.id) + "完成，库位" + last_task_store.__str__(),
            "get_task_resolve",
        )
        last_task_store.save()
        last_task.delete()
    task_list = Task.objects.filter(stacker=stacker)
    if task_list.count() == 0:
        return "020000000000"
    new_task = task_list.first()
    new_task.executing = True
    new_task.save()
    ret_type = toHex(new_task.type + 1)
    targetn = toHex(new_task.targetn)
    targety = toHex(new_task.targety)
    targetx = toHex(new_task.targetx, 4)
    return "02" + ret_type + targetn + targety + targetx


@api_view(["POST"])
def task_get(request):
    try:
        msg = get_task_resolve(request.data["msg"])
    except Exception as e:
        msg = "0303"
        new_log(request.data["msg"] + " =>Err: " + str(e), "task_get", LogType.ERROR)
    finally:
        new_log(request.data["msg"] + " => " + msg, "task_get")
        return Response({"msg": msg}, status=status.HTTP_200_OK)
