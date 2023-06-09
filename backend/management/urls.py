from django.urls import re_path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    re_path(r"^settings/$", views.setting_list),
    re_path(r"^init/settings$", views.init_settings),
    re_path(r"^init/stores$", views.init_stores),
]

urlpatterns = format_suffix_patterns(urlpatterns)
