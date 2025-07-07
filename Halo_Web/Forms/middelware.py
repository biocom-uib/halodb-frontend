from django.shortcuts import redirect, render
from django.urls import reverse

class TokenRequiredMiddleware:
    def __init__(self, get_response):
        
        self.get_response = get_response
        # Opcional: rutas excluidas (como login, static, etc.)
        self.excluded_paths = [
            '/registration/login/',
            '/filter/',
            '/registration/register/',
            '/api/get/public/',  # ¡sin reverse aquí!
            '/load/public/',
            '/static/'  # o '/secure_static/' si así se llama tu ruta
]


    def __call__(self, request):
        print(f"[Middleware] PATH: {request.path}")
        print(f"[Middleware] TOKEN: {request.session.get('auth_token')}")
        # Si la ruta está excluida, continúa normal
        if request.path =="/":
            return self.get_response(request)
        if any(request.path.startswith(path) for path in self.excluded_paths):
            return self.get_response(request)

        # Verificamos el token en sesión
        token = request.session.get('auth_token')
        print("Miramos si hay tojkenb")
        if not token:
            print("Entro con token!!")
            return redirect("login")
        print(f"Hay token: {token}")
        # Continuar con la respuesta si el token existe
        return self.get_response(request)
