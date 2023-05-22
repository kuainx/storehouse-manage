from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Log, LogType
from .serializers import LogSerializer


@api_view(['GET'])
def log_list(request):
    logs = Log.objects.all().order_by('-id')[:10]
    serializer = LogSerializer(logs, many=True)
    return Response(serializer.data)


def new_log(msg, reporter, type=LogType.LOG):
    log = Log.objects.create(msg=msg, reporter=reporter, type=type)
    log.save()
