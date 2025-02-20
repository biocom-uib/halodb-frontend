from django.urls import path
from . import views

urlpatterns = [
    path('',views.main, name='main'),
    path('Forms/', views.forms, name='Forms'),
    path('Login/', views.login, name='Login'),
    path('Signup/', views.signup, name='Signup'),
    path('Summary/', views.summary, name='Summary'),
]