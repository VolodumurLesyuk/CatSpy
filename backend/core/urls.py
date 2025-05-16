from rest_framework.routers import DefaultRouter
from .api.viewsets import SpyCatViewSet, MissionViewSet

router = DefaultRouter()
router.register(r'spycats', SpyCatViewSet)
router.register(r'missions', MissionViewSet)

urlpatterns = router.urls
