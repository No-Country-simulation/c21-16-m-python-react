from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Publication
from .serializers import PublicationSerializer


# Vista para mostrar todas las publicaciones en la página principal (home).
class PublicationViewSet(viewsets.ModelViewSet):
    # Usa el serializer "PublicationSerializer" para convertir las publicaciones a formato JSON.
    serializer_class = PublicationSerializer

    # Define qué publicaciones se van a mostrar, en este caso, todas las publicaciones en la base de datos.
    queryset = Publication.objects.all()

    # Permite que cualquier persona (sin necesidad de iniciar sesión) pueda ver las publicaciones.
    permission_classes = [AllowAny]

    # Solo permite el método "GET", que es el que se usa para obtener/leer datos (no se puede crear ni modificar desde aquí).
    http_method_names = ['get']


# Vista para mostrar las publicaciones del usuario que ha iniciado sesión (su propio perfil).
class UserPublicationViewSet(viewsets.ModelViewSet):
    # Usa el mismo serializer que antes, "PublicationSerializer".
    serializer_class = PublicationSerializer

    # Solo permite que los usuarios autenticados (que han iniciado sesión) puedan ver sus propias publicaciones.
    permission_classes = [IsAuthenticated]

    # Define que solo se van a mostrar las publicaciones del usuario que ha iniciado sesión.
    def get_queryset(self):
        # Filtra las publicaciones para que solo se muestren las que pertenecen al usuario actual.
        return Publication.objects.filter(id_user=self.request.user)


# Vista para mostrar las publicaciones de otros usuarios (por ejemplo, cuando se visita el perfil de un amigo).
class FriendPublicationViewSet(viewsets.ModelViewSet):
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
