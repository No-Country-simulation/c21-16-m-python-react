from .models import Publication, Files
from rest_framework import viewsets, status
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from .serializers import PublicationSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import MultiPartParser, FormParser

CustomUser = get_user_model()


class PublicationViewSet(viewsets.ModelViewSet):
    """Muestra todas las publicaciones en la pagina principal (home)"""
    # Usa el serializer "PublicationSerializer" para convertir las publicaciones a formato JSON.
    serializer_class = PublicationSerializer

    # Define qué publicaciones se van a mostrar, en este caso, todas las publicaciones en la base de datos.
    queryset = Publication.objects.all()

    # Permite que cualquier persona (sin necesidad de iniciar sesión) pueda ver las publicaciones.
    permission_classes = [AllowAny]

    # Solo permite el método "GET", que es el que se usa para obtener/leer datos (no se puede crear ni modificar desde aquí).
    http_method_names = ['get']


class UserPublicationViewSet(viewsets.ModelViewSet):
    """Muestra las publicaciones del usuario que ha iniciado sesion (publicaciones de su propio perfil)"""
    # Usa el mismo serializer que antes, "PublicationSerializer".
    serializer_class = PublicationSerializer

    # Solo permite que los usuarios autenticados puedan ver sus propias publicaciones.
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_queryset(self):
        user = self.request.user
        #files = Files.objects.filter(publication=id)
        return Publication.objects.filter(id_user=user)

    def perform_create(self, serializer):
        files = self.request.FILES.getlist('files[]')
        serializer.save(id_user=self.request.user, files=files)


class FriendPublicationViewSet(viewsets.ModelViewSet):
    """Muestra las publicaciones de otros usuarios (por ejemplo, cuando se visita el perfil de un amigo) puede eliminarse si no se usan publicaciones privadas dentro de la pagina."""

    # Usa el mismo serializer para las publicaciones.
    serializer_class = PublicationSerializer

    # Solo permite que los usuarios autenticados puedan ver las publicaciones de otros usuarios.
    permission_classes = [IsAuthenticated]

    # Solo permite el método "GET", para obtener/leer publicaciones (no se pueden modificar).
    http_method_names = ['get']

    # Define que se van a mostrar las publicaciones de un usuario específico (como el perfil de un amigo).
    def get_queryset(self):
        # Obtiene el ID del usuario cuyas publicaciones se quieren ver desde los parámetros de la URL.
        id_user = self.request.query_params.get('user_id')

        # Si se ha proporcionado el ID del usuario, se muestran sus publicaciones.
        if id_user:
            return Publication.objects.filter(id_user=id_user)

        # Si no se ha proporcionado un ID, no se devuelve ninguna publicación.
        return Publication.objects.none()
