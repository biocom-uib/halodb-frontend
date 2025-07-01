from django.urls import path
from . import views
from .views.views_forms import *
from .views.views_auth import *
from .views.views_profile import *
from .views.views_api import *
from .views.views_api_files import *
from .views.views_extern import *


urlpatterns = [
    path('index.php',main,name='main'),
    path('',main, name='main'),
    path('Forms/',load_experiment_form, name='Forms'),
    path('registration/login/',login_manual,name="login"),
    path('registration/SignUp',register_user,name="register"),
    path('account/verify',verify_account,name="verify"),
    path('registration/confirm-registration',register_user,name="confirmRegister"),
    path('Sample/',sample_insert,name="Sample"),
    path('profile/', profile, name='profile'),
    path('Summary/',summary,name="Summary"),
    path('registration/logout/',logout_view,name="logout"),
    path('upload/<str:table>',api_post_calls,name="api_post"),
    path('mySamples/<int:sample_id>/<str:step_name>',get_step_info,name="mySamples"),
    path('api/get/public/<path:query_params>', api_get_calls_simple, name='api_get_calls_simple'),
    path('api/get/<path:query_params>', api_get_calls, name='api_get_calls'),
    path('api/put_file/<path:src>', api_put_file, name='api_put_file'),
    path('api/get_file/<path:src>', api_get_file, name='api_get_file'),
    path('api/put/<path:src>', api_put_calls, name='api_put_file'),
    path('secure-static/<path:filename>/', get_static_file, name='secure_static'),
    path('infoDisplay/<path:filename>',load_info_display,name='load_info_display'),
    path('public/infoDisplay/<path:filename>',load_info_display,name='load_info_display'),
    path('filter',load_filter,name='filter'),
    path('filter/<str:id>',load_filter,name='filter')
]

