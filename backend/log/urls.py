from django.urls import re_path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    re_path(r'^get/$', views.log_list),
]

urlpatterns = format_suffix_patterns(urlpatterns)
