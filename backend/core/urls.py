from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

# Configuración mínima de Swagger y Redoc
schema_view = get_schema_view(
    openapi.Info(title="APIs", default_version='v1'),
    public=True,
)


urlpatterns = [

    # Rutas de Swagger y Redoc
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

    # JWT
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),


    path('admin/', admin.site.urls),
]