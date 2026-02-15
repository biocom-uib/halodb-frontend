from django.db import models
from django.core.validators import MinValueValidator


class Formulario(models.Model):
    """
    Modelo para almacenar información de formularios de experimentos.
    """
    titulo = models.CharField(
        max_length=255,
        verbose_name="Título",
        help_text="Título del formulario"
    )
    step = models.IntegerField(
        verbose_name="Paso",
        validators=[MinValueValidator(0)],
        help_text="Número de paso del formulario"
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Última actualización")
    
    class Meta:
        verbose_name = "Formulario"
        verbose_name_plural = "Formularios"
        ordering = ['step', 'titulo']
        indexes = [
            models.Index(fields=['step']),
        ]
    
    def __str__(self):
        return f"{self.titulo} (Paso {self.step})"

