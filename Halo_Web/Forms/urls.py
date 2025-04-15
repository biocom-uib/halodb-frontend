from django.urls import path
from . import views
from .views.views_forms import *
from .views.views_auth import *
from .views.views_profile import *


urlpatterns = [
    path('index.php',main,name='main'),
    path('',main, name='main'),
    path('Forms/',load_experiment_form, name='Forms'),
    path('registration/login/',login_manual,name="login"),
    path('registration/SignUp',start_registration,name="register"),
    path('registration/confirm-registration',register_user,name="confirmRegister"),
    path('Sample/',sample_insert,name="Sample"),
    path('profile/', profile, name='profile'),
    path('Summary/',summary,name="Summary"),
    path('registration/logout/',logout_view,name="logout"),
    path('mySamples/<int:sample_id>/<str:step_name>',get_step_info,name="mySamples"),
    re_path(r'^.*/api/get/(?P<query_params>.+)/$', api_get_calls, name='api_get_calls'),
    path('secure-static/<path:filename>/', get_static_file, name='secure_static'),
]

