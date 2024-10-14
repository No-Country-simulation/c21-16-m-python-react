from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterEmailViewSet, LoginEmailViewSet, ProfileViewSet

router = DefaultRouter()
router.register(r'register', RegisterEmailViewSet, basename='register')
router.register(r'login', LoginEmailViewSet, basename='login')

urlpatterns = [
    path('', include(router.urls)),
    path('profile/', ProfileViewSet.as_view(
        {'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='profile'),
]
