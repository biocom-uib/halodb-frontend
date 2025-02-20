from django.template import loader
from django.http import HttpResponse

def forms(request):
    template=loader.get_template('Formulario.html')
    return HttpResponse(template.render())

def login(request):
    template=loader.get_template('LogIn.html')
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
