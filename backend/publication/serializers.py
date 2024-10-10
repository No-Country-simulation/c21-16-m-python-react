from rest_framework import serializers
from .models import Files, Publication


# Define un serializer para el modelo "Files" que gestiona los archivos adjuntos.
class FilesSerializer(serializers.ModelSerializer):
    # Define qué campos del modelo "Files" se enviarán en la respuesta.
    class Meta:
        model = Files
        # Envía el identificador del archivo y el propio archivo.
        fields = ['id', 'file']


# Define un serializer para el modelo "Publication" que gestiona las publicaciones.
class PublicationSerializer(serializers.ModelSerializer):
    # Relaciona las publicaciones con sus archivos. El parámetro "many=True" indica que una publicación puede tener muchos archivos.
    # "read_only=True" significa que los archivos no se pueden modificar directamente desde este serializer.
    files = FilesSerializer(many=True, read_only=True)

    # Define qué campos del modelo "Publication" se enviarán en la respuesta.
    class Meta:
        model = Publication
        # Incluye los campos de la publicación.
        fields = ['id', 'id_user', 'content', 'files', 'publication_date']
