from django.urls import path
from .views.views_forms import *
from .views.views_auth import *
from .views.views_profile import *
from .views.views_api import *
from .views.views_api_files import *
from .views.views_extern import *


urlpatterns = [
    # Main pages
    path('', main, name='main'),
    path('index/', main, name='main_index'),
    
    # Authentication
    path('registration/login/', login_manual, name="login"),
    path('registration/SignUp/', register_user, name="register"),
    path('registration/confirm-registration/', register_user, name="confirmRegister"),
    path('registration/logout/', logout_view, name="logout"),
    path('account/verify/', verify_account, name="verify"),
    
    # User profile
    path('profile/', profile, name='profile'),
    
    # Forms and samples
    path('Forms/', load_experiment_form, name='Forms'),
    path('Sample/', sample_insert, name="Sample"),
    path('Summary/', summary, name="Summary"),
    path('mySamples/<int:sample_id>/<str:step_name>/', get_step_info, name="mySamples"),
    
    # Filter
    path('filter/', load_filter, name='filter'),
    path('filter/<str:id>/', load_filter, name='filter_with_id'),
    
    # Group invitations
    path('group/<int:group_id>/invite/<str:uid>/<str:group_name>/<str:email>/', 
         send_group_invite, name="groupInvite"),
    path('group/accept/<int:group_id>/', accept_group_invite, name="accept_invitation"),
    path('group/decline/<int:group_id>/', decline_group_invite, name="decline_invitation"),
    
    # API endpoints
    path('upload/<str:table>/', api_post_calls, name="api_post"),
    path('api/get/public/<path:query_params>/', api_get_calls_simple, name='api_get_calls_simple'),
    path('api/get/<path:query_params>/', api_get_calls, name='api_get_calls'),
    path('api/put_file/<path:src>/', api_put_file, name='api_put_file'),
    path('api/get_file/<path:src>/', api_get_file, name='api_get_file'),
    path('api/put/<path:src>/', api_put_calls, name='api_put'),
    
    # Static and info display
    path('secure-static/<path:filename>/', get_static_file, name='secure_static'),
    path('infoDisplay/<path:filename>/', load_info_display, name='load_info_display'),
    path('public/infoDisplay/<path:filename>/', load_info_display, name='load_public_info_display'),
]


