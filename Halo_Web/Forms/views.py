from django.contrib.auth import authenticate, login,logout
from django.contrib.auth.decorators import login_required
from django.template import loader
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib import messages
def forms(request):
    template=loader.get_template('Formulario.html')
    return HttpResponse(template.render())

def signup(request):
    template=loader.get_template('SignUp.html')
    return HttpResponse(template.render())

def summary(request):
  template = loader.get_template('Summary.html')
  return HttpResponse(template.render())

def main(request):
  template = loader.get_template('index.html')
  return HttpResponse(template.render())

@login_required
def profile(request):
  return render(request, "profile.html")

def logout_view(request):
  logout(request)
  return render (request, "index.html")

def login_manual(request):
  if request.method == "POST":
      user = request.POST.get("username")
      password = request.POST.get("password")
      # Buscar el usuario por email
      try:
          user = User.objects.get(username=user)
      except User.DoesNotExist:
          messages.error(request, "No existe una cuenta con ese usuario.")
          return render(request, "registration/login.html")

      # Autenticar usando username del usuario encontrado
      user = authenticate(request, username=user.username, password=password)

      if user is not None:
          login(request, user)
          return redirect("profile") # Redirigir a la página principal
      else:
          messages.error(request, "Usuario o contraseña incorrectos")
          return render(request, 'registration/login.html')

  return render(request, "registration/login.html")
