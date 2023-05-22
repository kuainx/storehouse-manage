from rest_framework.routers import DefaultRouter
from .viewset import StoreViewSet

router = DefaultRouter()
router.register(r"", StoreViewSet)
urlpatterns = router.urls
