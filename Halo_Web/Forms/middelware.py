import os
from django.shortcuts import redirect
from django.urls import reverse
from dotenv import load_dotenv

# Cargar .env (hazlo aquí si no estás seguro de si se cargó en settings.py)
load_dotenv()

class TokenRequiredMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

        env = os.getenv('ENV', 'DEV')
        self.is_dev = env == 'DEV'

        base_paths = [
            '/',
            '/index.php',
            '/registration/login/',
            '/filter/',
            '/registration/register/',
            '/api/get/public/',
            '/load/public/',
            '/static/',
        ]

        # Prefijar con /halofiles si no es entorno DEV
        if not self.is_dev:
            self.excluded_paths = ['/halofiles' + path for path in base_paths]
        else:
            self.excluded_paths = base_paths

    def __call__(self, request):
        #return self.get_response(request)
        path = request.path
        
        if any(path.startswith(p) for p in self.excluded_paths):
            return self.get_response(request)
        
        token = request.session.get('auth_token')

        if not token:
            print(f"[Middleware] PATH: {path}")
            return redirect(reverse('login'))  # Asegúrate de que esté bien definido

        return self.get_response(request)
