from django.urls import path
from . import views
from .views import login_manual


urlpatterns = [
    path('index.php',views.main,name='main'),
    path('',views.main, name='main'),
    path('Forms/', views.forms, name='Forms'),
    path('accounts/login/',login_manual,name="login"),
    path('profile/', views.profile, name='profile'),
    path('Summary/',views.summary,name="Summary"),
    path('accounts/logout/',views.logout_view,name="logout")

]

