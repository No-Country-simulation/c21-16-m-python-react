from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterEmailViewSet, LoginEmailViewSet


# Crear un router para manejar las vistas basadas en ViewSets
router = DefaultRouter()
router.register(r'register', RegisterEmailViewSet, basename='register')
router.register(r'login', LoginEmailViewSet, basename='login')

urlpatterns = [
    path('', include(router.urls)),
]