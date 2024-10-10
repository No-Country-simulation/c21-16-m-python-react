from django.db import models
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError

# Importa el modelo de usuario predeterminado del sistema, que es usado para gestionar a los usuarios registrados.
CustomUser = get_user_model()


def blog_thumbnail_directory(instance, filename):
    """
    Define la ruta donde se guardará el archivo subido, organizando en carpetas según el nombre del usuario
    y el tipo de archivo (imagen o video).
    """
    # Obtén el nombre de usuario del objeto de publicación (instance).
    # Asumiendo que id_user es un objeto CustomUser con un atributo 'username'
    user_name = instance.id_user.username

    # Obtén la extensión del archivo.
    # Obtiene la extensión del archivo y la convierte a minúsculas.
    ext = filename.split('.')[-1].lower()

    # Define la carpeta según la extensión del archivo.
    # Extensiones comunes de imágenes.
    if ext in ['jpg', 'jpeg', 'png', 'gif']:
        folder = 'imagenes'
    elif ext in ['mp4', 'mov', 'avi', 'mkv']:  # Extensiones comunes de videos.
        folder = 'videos'
    else:
        # Para manejar archivos que no son ni imágenes ni videos.
        folder = 'otros'

    # Retorna la ruta donde se guardará el archivo.
    return f'publication/{user_name}/{folder}/{filename}'


# Define el modelo "Publication" que representa una publicación en la aplicación.
class Publication(models.Model):
    # Relaciona cada publicación con un usuario (autor). Si el usuario es eliminado, sus publicaciones también se eliminan (on_delete=models.CASCADE).
    id_user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    # Campo que almacena el contenido de la publicación (como texto).
    content = models.TextField()

    # Relación con otro modelo llamado "Files". Permite que una publicación tenga varios archivos adjuntos, como imágenes o videos.
    # El parámetro "blank=True" indica que no es obligatorio que haya archivos en la publicación.
    files = models.ManyToManyField('Files', blank=True)

    # Guarda la fecha y hora en la que la publicación se creó automáticamente.
    publication_date = models.DateTimeField(auto_now_add=True)

    # Método para validar que una publicación no tenga más de 10 archivos adjuntos.
    def clean(self):
        if self.files.count() > 10:
            # Lanza un error si se intenta añadir más de 10 archivos.
            raise ValidationError("No more than 10 files are allowed.")


# Define el modelo "Files" que representa los archivos adjuntos a una publicación (como imágenes o videos).
class Files(models.Model):
    # Campo que almacena el archivo adjunto (imagen, video, etc.).
    file = models.FileField(upload_to=blog_thumbnail_directory)
