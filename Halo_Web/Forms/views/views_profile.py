from .views_import import *

def signup(request):
    template=loader.get_template('registration/register.html')
    return HttpResponse(template.render())

def load_info_display(request):
    return render(request, 'infoDisplay.html')

def get_user_data(request):
    token=request.session.get("auth_token")

    if not token:
        return JsonResponse({"status":"error","message":"Usuario no autenticado"},status=401)
    
    url=URL+"user/"
    headers={"Authorization":f"Bearer {token}"}

    response=requests.get(url,headers=headers)

    if response.status_code == 200:
        user_data = response.json()  # Obtener la respuesta en JSON
        return JsonResponse({"status": "success", "user": user_data})
    else:
        return JsonResponse({"status": "error", "message": "No se pudo obtener la información del usuario"}, status=500)
    
def get_step_info(request,sample_id,step_name):
    token=request.session.get("auth_token")

    if not token:
        return JsonResponse({"status":"error","message":"Usuario no autenticado"},status=401)   
    
    url=URL+f"user/list/{step_name}/{sample_id}"
    headers={"Authorization":f"Bearer {token}"}

    try:
        # Hacer la petición GET a la API externa
        response = requests.get(url, headers=headers)
        print(f"url:{url}, response:{response.status_code}")
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