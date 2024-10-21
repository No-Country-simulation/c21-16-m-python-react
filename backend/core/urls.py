from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework import permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.conf import settings
from django.conf.urls.static import static
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView



urlpatterns = [

     # Rutas de Spectacular
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),  # Esquema en formato JSON Para descargar el JSON en texto
    path('api/docs/swagger/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),  # Documentación en Swagger UI
    path('api/docs/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),  # Documentación en Redoc

    # JWT
    path('api/auth/token/', TokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('api/auth/refresh-token/',
         TokenRefreshView.as_view(), name='token_refresh'),

    # Rutas de la app users
    path('api/auth/', include('users.urls')),

    # Rutas de la app publication
    path('api/posts/', include('publication.urls')),

    path('admin/', admin.site.urls),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
