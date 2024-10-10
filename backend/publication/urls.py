from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PublicationViewSet, UserPublicationViewSet, FriendPublicationViewSet

router = DefaultRouter()
router.register(r'publications', PublicationViewSet,
                basename='publication')
router.register(r'user-publications', UserPublicationViewSet,
                basename='user-publication')
router.register(r'friend-publications', FriendPublicationViewSet,
                basename='friend-publication')

urlpatterns = [
    path('', include(router.urls)),
]
