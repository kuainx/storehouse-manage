from django.urls import re_path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    re_path(r"^all$", views.material_list),
    re_path(r"^set$", views.material_set),
    re_path(r"^new$", views.material_new),
]

urlpatterns = format_suffix_patterns(urlpatterns)
