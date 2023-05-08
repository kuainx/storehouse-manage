# viewset_test.py
from rest_framework import viewsets
from .models import Store
from .serializers import StoreSerializer


class StoreViewSet(viewsets.ModelViewSet):
    """
    ### Store/
    - 接口描述：获取所有存储库
    - 接口地址：/store
    - 请求方式：GET
    - 返回数据：JSON

    ### Store/
    - 接口描述：新增库位
    - 接口地址：/store
    - 请求方式：POST

    ### Store/<id>
    - 接口描述：获取/修改/删除指定库位
    - 接口地址：/store/<id>
    - 请求方式：GET, PUT, PATCH, DELETE
    - 返回数据：JSON
    """
    queryset = Store.objects.all()
    serializer_class = StoreSerializer
