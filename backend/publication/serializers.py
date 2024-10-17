from rest_framework import serializers
from .models import Files, Publication


# Define un serializer para el modelo "Files" que gestiona los archivos adjuntos.
class FilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Files
        fields = ['id', 'file']


# Define un serializer para el modelo "Publication" que gestiona las publicaciones.
class PublicationSerializer(serializers.ModelSerializer):
    files = FilesSerializer(many=True, required=False)

    class Meta:
        model = Publication
        fields = ['id', 'content', 'files', 'publication_date']
        read_only_fields = ['id', 'publication_date']

    def create(self, validated_data):
        # Elimina los datos de los archivos si existen
        files_data = validated_data.pop('files', [])

        # Obtiene el usuario del contexto de la solicitud
        request = self.context.get('request')
        user = request.user

        # Crea la publicación
        publication = Publication.objects.create(
            id_user=user, **validated_data
        )

        # Si hay archivos, crea instancias y asócialas a la publicación
        for file_data in files_data:
            # Valida cada archivo usando el FilesSerializer
            file_serializer = FilesSerializer(data=file_data)
            if file_serializer.is_valid():
                file_instance = file_serializer.save()
                publication.files.add(file_instance)
            else:
                # Lanza un error si el archivo no es válido
                raise serializers.ValidationError(file_serializer.errors)

        return publication
