from django.urls import path, include
from api.views import ItemViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'items', ItemViewSet)

urlpatterns = [
	path('', include(router.urls))
]