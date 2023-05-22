from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Task
from .serializers import TaskSerializer


@api_view(["GET"])
def task_list(request):
    tasks = Task.objects.all()
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)


@api_view(["POST"])
def task_set(request):
    task = Task.objects.get(id=request.data["id"])
    serializer = TaskSerializer(task, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def task_remove(request):
    task = Task.objects.get(id=request.data["id"])
    task.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
