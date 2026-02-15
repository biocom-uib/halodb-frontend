from django.contrib import admin
from .models import Formulario


@admin.register(Formulario)
class FormularioAdmin(admin.ModelAdmin):
    """Admin configuration for Formulario model."""
    
    list_display = ('titulo', 'step', 'created_at', 'updated_at')
    list_filter = ('step', 'created_at')
    search_fields = ('titulo',)
    ordering = ('step', 'titulo')
    readonly_fields = ('created_at', 'updated_at')
    
    fieldsets = (
        ('Información del Formulario', {
            'fields': ('titulo', 'step')
        }),
        ('Fechas', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

