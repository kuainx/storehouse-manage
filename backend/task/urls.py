from django.urls import re_path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views
from . import storeViews

urlpatterns = [
    re_path(r"^all$", views.task_list),
    re_path(r"^set$", views.task_set),
    re_path(r"^remove$", views.task_remove),
    re_path(r"^import$", storeViews.task_import),
    re_path(r"^export$", storeViews.task_export),
    re_path(r"^get$", storeViews.task_get),
]

urlpatterns = format_suffix_patterns(urlpatterns)
