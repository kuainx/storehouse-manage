from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings
import tablib
import time

from .models import Setting
from .serializers import SettingSerializer
from .resource import SettingResource
from store.models import Store
from store.serializers import StoreSerializer
from store.resource import StoreResource


def get_time_response():
    return {"t": time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())}


@api_view(["GET", "POST"])
def setting_list(request):
    if request.method == "GET":
        settings = Setting.objects.all()
        serializer = SettingSerializer(settings, many=True)
        return Response(serializer.data)

    elif request.method == "POST":
        setting = Setting.objects.get(key=request.data["key"])
        setting.value = request.data["value"]
        setting.save()
        settings = Setting.objects.all()
        serializer = SettingSerializer(settings, many=True)
        return Response(serializer.data)


@api_view(["POST"])
def init_settings(request):
    with open(
        settings.BASE_DIR / "statics/defaultSettings.csv", "r", encoding="utf-8"
    ) as r:
        data = tablib.Dataset().load(r)
        result = SettingResource().import_data(data, dry_run=True)
        if not result.has_errors():
            SettingResource().import_data(data, dry_run=False)
            return Response(get_time_response(), status=status.HTTP_201_CREATED)
        else:
            return Response(
                get_time_response(), status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


def get_setting(key):
    return Setting.objects.get(key=key).value


@api_view(["POST"])
def init_stores(request):
    n = int(get_setting("storen"))
    x = int(get_setting("storex"))
    y = int(get_setting("storey"))
    Store.objects.filter(id__gte=n * y * x).delete()
    dataset = []
    id = 0
    for nn in range(0, n * 2):
        for yy in range(0, y):
            dataset.extend([[xx + id, nn, yy, xx] for xx in range(0, x)])
            id += x
    headers = ("id", "storen", "storey", "storex")
    data = tablib.Dataset(*dataset, headers=headers)
    result = StoreResource().import_data(data, dry_run=True)
    if not result.has_errors():
        StoreResource().import_data(data, dry_run=False)
        return Response(get_time_response(), status=status.HTTP_201_CREATED)
    else:
        return Response(
            get_time_response(), status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
