from .views_import import *



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

@csrf_exempt
def register_user(request):
  if request.method=="POST":
    body_unicode = request.body.decode('utf-8')
    registerInformation = json.loads(body_unicode)

    url = URL + "user/"
    response = requests.post(url, json=registerInformation)
    
    if response.status_code == 200:
        return JsonResponse(response.json())
    else:
        return JsonResponse({'status':'error','message':'Error interno, sistema no operativo:'},status=405)

  return render(request, "registration/register.html")

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
          return JsonResponse({'status':'error','message':'Error interno, sistema no operativo'},status=405)
      else:
          return render(request, "registration/login.html",{"messages":["Los datos introducidos son incorrectos"]})
  return render(request, "registration/login.html")
