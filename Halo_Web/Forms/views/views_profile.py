from .views_import import *
from .responseController import responseController
from .send_email import send_email

def signup(request):
    template=loader.get_template('registration/register.html')
    return HttpResponse(template.render())

def load_info_display(request,filename):
    return render(request, 'infoDisplay.html')

def get_user_data(request):
    token=request.session.get("auth_token")

    if not token:
        return JsonResponse({"status":"error","message":"Usuario no autenticado"},status=401)
    
    url=URL+"user/"
    headers={"Authorization":f"Bearer {token}"}

    response=requests.get(url,headers=headers)

    return responseController(response=response,error_msg="Failed fetching user data!!!")
    
def get_step_info(request,sample_id,step_name):
    token=request.session.get("auth_token")

    if not token:
        return JsonResponse({"status":"error","message":"Usuario no autenticado"},status=401)   
    
    url=URL+f"user/list/{step_name}/{sample_id}/"
    headers={"Authorization":f"Bearer {token}"}
    response = requests.get(url, headers=headers)
    return responseController(response=response,error_msg="Failed fetching step info")

@csrf_exempt
def send_group_invite(request,group_id,uid,email,group_name):
    token=request.session.get("auth_token")

    if not token:
        return JsonResponse({"status":"error","message":"Usuario no autenticado"},status=401)   
    
    url=URL+f"group/{group_id}/invite/{uid}"
    headers={"Authorization":f"Bearer {token}"}
    response = requests.post(url, headers=headers)
    if response.status_code==200:
        send_email(email,"invitation",{
            "id":uid,
            "group":group_name
        })
    return responseController(response=response,error_msg="Failed fetching step info")

@csrf_exempt
def accept_group_invite(request,group_id):
    token=request.session.get("auth_token")

    if not token:
        return JsonResponse({"status":"error","message":"Usuario no autenticado"},status=401)
    
    url=URL+f"group/{group_id}/invitation"
    headers={"Authorization":f"Bearer {token}"}

    response=requests.put(url,headers=headers)

    return responseController(response=response,error_msg="Failed accpeting group invite!!!")

@csrf_exempt
def decline_group_invite(request,group_id):
    token=request.session.get("auth_token")

    if not token:
        return JsonResponse({"status":"error","message":"Usuario no autenticado"},status=401)
    
    url=URL+f"group/{group_id}/invitation"
    headers={"Authorization":f"Bearer {token}"}

    response=requests.delete(url,headers=headers)

    return responseController(response=response,error_msg="Failed accpeting group invite!!!")