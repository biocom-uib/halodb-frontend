from .views_import import *

@csrf_exempt
def load_usability_form(request):
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
    
  return render(request,"Usability.html")