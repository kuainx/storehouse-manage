from django.urls import re_path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    re_path(r'^all$', views.task_list),
    re_path(r'^set$', views.task_set),
    re_path(r'^new$', views.task_new),
    re_path(r'^remove$', views.task_remove),
]

urlpatterns = format_suffix_patterns(urlpatterns)
