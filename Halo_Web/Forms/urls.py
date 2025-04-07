from django.urls import path
from . import views
from .views.views_forms import *
from .views.views_auth import *
from .views.views_profile import *


urlpatterns = [
    path('index.php',main,name='main'),
    path('',main, name='main'),
    path('Forms/',forms, name='Forms'),
    path('registration/login/',login_manual,name="login"),
    path('registration/SignUp',register_user,name="register"),
    path('Sample/',sample_insert,name="Sample"),
    path('profile/', profile, name='profile'),
    path('Summary/',summary,name="Summary"),
    path('registration/logout/',logout_view,name="logout"),
    path('api/get/<str:query_params>/', api_get_calls, name="api_get_calls")

]

