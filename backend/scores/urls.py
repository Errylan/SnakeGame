from rest_framework.routers import DefaultRouter
from .views import ScoreViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r'scores', ScoreViewSet, basename='score')

urlpatterns = [
    path('', include(router.urls)),
]
