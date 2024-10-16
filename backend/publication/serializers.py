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
    files = FilesSerializer(many=True, required=False)

    # Define qué campos del modelo "Publication" se enviarán en la respuesta.
    class Meta:
        model = Publication
        # Incluye los campos de la publicación.
        files = ['id', 'content', 'files', 'publication_date']
        read_only_fields = ['id', 'publication_date']

    def create(self, validated_data):
        files_data = validated_data.pop('files', [])
        request = self.context.get('request')
        user = request.user

        publication = Publication.objects.create(
            id_user=user, **validated_data)

        # Si se han enviado archivos, crea instancias de Files y asócialas a la publicación
        for file_data in files_data:
            file_instance = Files.objects.create(**file_data)
            publication.files.add(file_instance)

        return publication
