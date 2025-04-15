from .views_import import *

#from utils import buscar_archivo



def load_experiment_form(request):
    return render(request,"Formulario.html")

def summary(request):
    referer = request.META.get('HTTP_REFERER')
    if not referer or 'Forms' not in referer:
        return redirect('/')
    template = loader.get_template('Summary.html')
    
    return HttpResponse(template.render())


def sample_insert(request):
   return render(request,"Sample.html")

def get_static_file(request,filename):
    """"The users must be logged to use this kind of services"""
    if not request.session.get("auth_token"):
            return JsonResponse({"status":"error","message":"Usuario no autenticado"},status=401)
    
    #DEV Envior
    if settings.DEBUG:
        # En desarrollo, buscar en STATICFILES_DIRS
        file_path = os.path.join(settings.STATICFILES_DIRS[0], "HTML")
    else:
        # En producción, usar STATIC_ROOT
        file_path = os.path.join(settings.STATIC_ROOT, "HTML")

    file_path = os.path.normpath(os.path.join(file_path, filename))
    if os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8") as file:
            content = file.read()  # Leer el contenido como string
            return JsonResponse({"message": content})  # Devolver como JSON
    else:
        print(f"NO Exsite {file_path}")
        raise Http404("Archivo no encontrado.")
  
def api_get_calls(request, query_params):
    """Hace una petición GET a la API externa y devuelve la respuesta como JSON"""

    """"The users must be logged to use this kind of services"""
    token = request.session.get("auth_token")
    if not token:
            return JsonResponse({"status":"error","message":"Usuario no autenticado"},status=401)

    # Construir la URL con el parámetro dinámico
    full_url = f"{URL}{query_params}"
    headers={"Authorization":f"Bearer {token}"}
    try:
        # Hacer la petición GET a la API externa
        response = requests.get(full_url, headers=headers)

        # Verificar si la respuesta es correcta (código 200)
        if response.status_code == 200:
            return JsonResponse(response.json())  # Devolver la respuesta de la API externa
        else:
            return JsonResponse(
                {"error": "Error en la API externa", "status_code": response.status_code},
                status=response.status_code
            )
    
    except requests.exceptions.RequestException as e:
        return JsonResponse({"error": "Error en la conexión a la API externa", "details": str(e)}, status=500)