import os
import requests
import uuid

from django.core.cache import cache
from django.conf import settings
from django.core.mail import send_mail

static_paths={
      "Forms": lambda path,filename: path+f"/Forms/{filename}",
      "Profile": lambda path,filename: path+f"/Profile/{filename}",
      "Others": lambda path,filename: path+f"/Others/{filename}",
}

def buscar_archivo(path, filename):
    for carpeta, ruta_func in static_paths.items():
        # Construir la ruta completa usando la función lambda
        ruta_completa = ruta_func(path, filename)
        
        # Verificar si el archivo existe en esa ruta
        if os.path.exists(ruta_completa):
            print(f"El archivo {filename} se encuentra en la carpeta {carpeta}: {ruta_completa}")
            return ruta_completa

def store_user_temp(data):
   token = str(uuid.uuid4())
   cache.set(f'pending_user:{token}',data,timeout=3600)
   return token

def send_confirmation_email(email, token):
    base_url=settings.ALLOWED_HOSTS[1] if settings.DEBUG else settings.ALLOWED_HOSTS[1]
    link = f"{base_url}/registration/confirm-registration/{token}/"
    message = f"Confirma tu registro haciendo clic en: {link}"
    send_mail(
        "Welcome to haloPhiles! Confirm your account",
        message,
        'halophiles.dev@gmail.com',
        [email],
        fail_silently=False,
    )
