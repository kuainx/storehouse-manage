from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Task
from .serializers import TaskSerializer
from store.models import Store
from store.serializers import StoreSerializer


@api_view(['POST'])
def task_input(request):
    Task.objects.annotate()

    task = Task.objects.get(id=request.data['id'])
    task.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
