from .views_import import *

def signup(request):
    template=loader.get_template('registration/register.html')
    return HttpResponse(template.render())

def get_user_data(request):
    token=request.session.get("auth_token")

    if not token:
        return JsonResponse({"status":"error","message":"Usuario no autenticado"},status=401)
    url=URL+"user/"
    headers={"Authorization":f"Bearer {token}"}

    response=request.get(url,headers=headers)

    if response.status_code == 200:
        user_data = response.json()  # Obtener la respuesta en JSON
        return JsonResponse({"status": "success", "user": user_data})
    else:
        return JsonResponse({"status": "error", "message": "No se pudo obtener la información del usuario"}, status=500)