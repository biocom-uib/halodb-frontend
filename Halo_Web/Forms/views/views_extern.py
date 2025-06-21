from .views_import import *

@csrf_exempt
def load_usability_form(request):
  if request.method== "POST":
    print("Enviado")
  return render(request,"Usability.html")

def load_filter(request):
  if request.method== "POST":
    print("Enviado")
  return render(request,"filter.html")