from .views_import import *
from .send_email import send_email
from .views_api import api_get_calls_simple

import logging

logger = logging.getLogger(__name__)


def main(request):
    """Render the main index page."""
    return render(request, "index.html")


def profile(request):
    """Display user profile information."""
    token = request.session.get("auth_token")
    if not token:
        return redirect("login")
    
    try:
        headers = {"Authorization": f"Bearer {token}"}
        url = URL + "user/"
        
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        user_data = response.json()
        userInf = user_data.get("data", {}).get("message", {})
        
        return render(request, "profile.html", {"user": userInf})
    
    except requests.exceptions.RequestException as e:
        logger.error(f"Error fetching user profile: {e}")
        messages.error(request, "Error al cargar el perfil. Por favor, intenta de nuevo.")
        return redirect("main")
    except (KeyError, ValueError) as e:
        logger.error(f"Error parsing user data: {e}")
        messages.error(request, "Error al procesar los datos del usuario.")
        return redirect("main")


def logout_view(request):
    """Log out the user by clearing session."""
    try:
        if "auth_token" in request.session:
            del request.session["auth_token"]
        request.session.flush()
    except Exception as e:
        logger.error(f"Error during logout: {e}")
    
    return render(request, "index.html")


def verify_account(request):
    """Verify user account via email link."""
    uid = request.GET.get('uid')
    date = request.GET.get('date', '')
    
    if not uid or not date:
        messages.error(request, 'Enlace de verificación inválido.')
        return redirect('main')
    
    try:
        date = date.replace("T", " ")
        full_url = URL + "verify/"
        
        response = requests.put(
            full_url,
            json={"date": date, "uid": uid},
            timeout=10
        )
        
        if response.status_code == 200:
            messages.success(request, '¡Tu cuenta ha sido verificada exitosamente!')
            return redirect('login')
        else:
            messages.error(request, 'Error al verificar la cuenta.')
            return redirect('main')
    
    except requests.exceptions.RequestException as e:
        logger.error(f"Error verifying account: {e}")
        messages.error(request, 'Error de conexión. Por favor, intenta más tarde.')
        return redirect('main')


def register_user(request):
    """Register a new user."""
    if request.method == "POST":
        try:
            full_url = URL + "user/"
            name = request.POST.get("name", "").strip()
            surname = request.POST.get("surname", "").strip()
            email = request.POST.get("email", "").strip()
            password = request.POST.get("password", "")
            
            # Basic validation
            if not all([name, surname, email, password]):
                messages.error(request, 'Todos los campos son obligatorios.')
                return render(request, "registration/register.html")
            
            response = requests.post(
                full_url,
                json={
                    "name": name,
                    "surname": surname,
                    "email": email,
                    "password": password
                },
                timeout=10
            )
            
            if response.status_code == 200:
                response_data = response.json()
                uid = response_data.get("message", {}).get("user", {}).get("uid")
                
                if uid:
                    try:
                        parsed_data = json.loads(
                            api_get_calls_simple(request=request, query_params="/users/").content
                        )
                        
                        for user in parsed_data:
                            if user.get("uid") == uid:
                                send_email(email, "verification", {
                                    "uid": uid,
                                    "date": user.get("registration_time")
                                })
                                messages.warning(
                                    request,
                                    'Para completar el registro, revisa tu email y confirma la cuenta.'
                                )
                                return redirect('login')
                    except Exception as e:
                        logger.error(f"Error sending verification email: {e}")
                        messages.warning(
                            request,
                            'Cuenta creada pero hubo un error al enviar el email de verificación.'
                        )
                        return redirect('login')
            else:
                error_msg = response.json().get('message', {}).get('message', 'Error al registrar.')
                messages.error(request, error_msg)
        
        except requests.exceptions.RequestException as e:
            logger.error(f"Error registering user: {e}")
            messages.error(request, 'Error de conexión. Por favor, intenta más tarde.')
        except Exception as e:
            logger.error(f"Unexpected error during registration: {e}")
            messages.error(request, 'Error inesperado. Por favor, intenta más tarde.')
    
    return render(request, "registration/register.html")


def login_manual(request):
    """Handle user login."""
    if request.method == "POST":
        try:
            email = request.POST.get("email", "").strip()
            password = request.POST.get("password", "")
            
            if not email or not password:
                messages.error(request, 'Email y contraseña son obligatorios.')
                return render(request, "registration/login.html")
            
            data = {"email": email, "password": password}
            url = URL + "login"
            
            response = requests.post(url, json=data, timeout=10)
            
            if response.status_code == 200:
                response_data = response.json()
                token = response_data.get("token")
                
                if token:
                    request.session["auth_token"] = token
                    request.session.set_expiry(3600)
                    return redirect("profile")
                else:
                    messages.error(request, 'Error al obtener el token de autenticación.')
            else:
                error_msg = response.json().get('message', 'Credenciales inválidas.')
                messages.error(request, error_msg)
        
        except requests.exceptions.RequestException as e:
            logger.error(f"Error during login: {e}")
            messages.error(request, 'Error de conexión. Por favor, intenta más tarde.')
        except Exception as e:
            logger.error(f"Unexpected error during login: {e}")
            messages.error(request, 'Error inesperado. Por favor, intenta más tarde.')
    
    return render(request, "registration/login.html")

