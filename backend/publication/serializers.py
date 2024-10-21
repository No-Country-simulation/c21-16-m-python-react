from rest_framework import serializers
from .models import Files, Publication


# Define un serializer para el modelo "Files" que gestiona los archivos adjuntos.
class FilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Files
        fields = ['id', 'file']


# Define un serializer para el modelo "Publication" que gestiona las publicaciones.
class PublicationSerializer(serializers.ModelSerializer):
    files_set = FilesSerializer(many=True, read_only=True)
    files = serializers.ListField(
        # Especifica que cada elemento de la lista es un archivo
        child=serializers.FileField(),
        required=False
    )

    class Meta:
        model = Publication
        fields = ['id', 'content', 'files', 'files_set', 'publication_date']
        read_only_fields = ['id', 'publication_date']

    def create(self, validated_data):
        # Extrae los datos de los archivos del validated_data
        files_data = validated_data.pop('files', [])

        # Crea la publicación con el contenido restante
        publication = Publication.objects.create(**validated_data)

        # Guarda cada archivo asociado a la publicación
        for file_data in files_data:
            Files.objects.create(publication=publication, file=file_data)

        return publication
