from django.db import models
from django.conf import settings

class Role(models.Model):
    """
    Modelo que representa un rol dentro de la plataforma (por ejemplo, admin, colaborador).
    """
    name = models.CharField(max_length=50, unique=True)  
    description = models.TextField(blank=True, null=True)  
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,  # Relación uno a uno con el modelo de usuario (CustomUser)
        related_name='role',  # Cambiamos a singular porque es una relación uno a uno
        on_delete=models.SET_NULL,  # Asigna null al campo si se elimina el usuario
        null=True,  # Esto permite que un rol inicialmente no esté asignado a ningún usuario
        blank=True  # El campo puede quedar vacío
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Role'
        verbose_name_plural = 'Roles'
