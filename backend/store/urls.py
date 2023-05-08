from django.urls import re_path
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.routers import DefaultRouter
from . import views
from .viewset import StoreViewSet

router = DefaultRouter()
router.register(r'', StoreViewSet)
urlpatterns = router.urls

# urlpatterns = [
#     re_path(r'^all$', views.store_list),
#     re_path(r'^query$', views.store_query),
# ]

# urlpatterns = format_suffix_patterns(urlpatterns)
