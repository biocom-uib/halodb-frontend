from .views_import import *

from .send_email import send_email

from .views_api import api_get_calls_simple

from Forms.utils import *



def main(request):
  template = loader.get_template('index.html')
  return HttpResponse(template.render())

def profile(request):
  token = request.session.get("auth_token")
  if not token:
    return redirect("login")
  
  headers={"Authorization":f"Bearer {token}"}
  url=URL+"user/"

  response=requests.get(url,headers=headers)
  userInf=response.json()["message"]
  return render(request, "profile.html",{"user":userInf})

def logout_view(request):
  
  return render (request, "index.html")

'''TO DO: Add SMTP or similar service to send automatic mails to users'''

'''
@csrf_exempt
def start_registration(request):
    if request.method=="POST":
      data = json.loads(request.body)

      token = store_user_temp(data)
      send_confirmation_email(data['email'], token)

      return JsonResponse({'message': 'Correo enviado para confirmar registro'})
    
    return render(request, "registration/register.html")
    

@csrf_exempt
def register_user(request,token):
  key = f'pending_user:{token}'
  data = cache.get(key)

  if not data:
      return JsonResponse({'error': 'Token inválido o expirado'}, status=400)

  url = URL + "user/"
  response = requests.post(url, json=data)
  
  if response.status_code == 200:
      cache.delete(key)  # Eliminar los datos después de usarlos
      return redirect('login')
  else:
      return JsonResponse({'status':'error','message':'Error interno, sistema no operativo:'},status=405)
'''

@csrf_exempt
def verify_account(request):
  uid=request.GET.get('uid')
  date=request.GET.get('date').replace("T"," ")

  full_url=URL+"verify/"

  response=requests.put(full_url,json={"date":date,"uid":uid})
  if response.status_code==200:
    messages.success(request, 'Youre account has been verified succesfully!')
    return redirect('login')
  else:
    return redirect('main')
    
@csrf_exempt
def register_user(request):
  if request.method== "POST":
    full_url=URL+"user/"
    name= request.POST.get("name")
    surname= request.POST.get("surname")
    email = request.POST.get("email")
    password = request.POST.get("password")
  
    response=requests.post(full_url,
      json={
        "name":name,
        "surname":surname,
        "email":email,
        "password":password
      })

    if response.status_code==200:
      uid=response.json()["message"]["user"]["uid"]    
      parsed_data=json.loads(api_get_calls_simple(request=request,query_params="/users/").content)
      for user in parsed_data:

        if user["uid"]==uid:
          send_email(email,uid,user["registration_time"])
      messages.warning(request, 'To complete the register, please check your email and confirm the account')
      return redirect('login')
    else:
      messages.error(request, response.json()['message']['message'])
    
  return render(request,"registration/register.html")


@csrf_exempt
def login_manual(request):
  if request.method == "POST":
      
      email = request.POST.get("email")
      password = request.POST.get("password")
      data={"email":email, "password":password}

      url=URL+"login"
      
      response=requests.post(url,json=data)
      if response.status_code == 200:
        response_data = response.json()
        token = response_data.get("token")

        if token:
          request.session["auth_token"] = token
          request.session.set_expiry(3600)
          return redirect("profile")
        else:
          messages.error(request, response.json()['message'])
      else:
        print(response.json())
        messages.error(request, response.json()['message'])
  return render(request, "registration/login.html")
