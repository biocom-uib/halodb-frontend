import os
import logging
from django.shortcuts import redirect
from django.urls import reverse
from dotenv import load_dotenv

from Halo_Web.settings import PROD_BASE_URL

# Configure logging
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

class TraceRequestsMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        print("TRACE", request.method, request.path, "SCRIPT_NAME=", request.META.get("SCRIPT_NAME"), "PATH_INFO=", request.META.get("PATH_INFO"))
        return self.get_response(request)

class TokenRequiredMiddleware:
    """
    Middleware to enforce token-based authentication for protected routes.
    Excludes public paths like login, registration, and static files.
    """
    
    def __init__(self, get_response):
        self.get_response = get_response

        env = os.getenv('ENV', 'DEV')
        self.is_dev = env == 'DEV'

        base_paths = [
            '/',
            '/index.php',
            '/registration/login/',
            '/registration/register/',
            '/registration/SignUp',
            '/account/verify',
            '/filter/',
            '/api/get/public/',
            '/load/public/',
            '/static/',
            '/public/',
        ]

        # Add PROD_BASE_URL prefix if not in DEV environment
        if not self.is_dev:
            self.excluded_paths = [PROD_BASE_URL + path for path in base_paths]
        else:
            self.excluded_paths = base_paths

    def __call__(self, request):
        path = request.path
        
        # Allow access to excluded paths without authentication
        for excluded_path in self.excluded_paths:
            if excluded_path == '/':
                if path == '/':
                    return self.get_response(request)
            elif path.startswith(excluded_path):
                return self.get_response(request)

        # In some deployments (proxy/script-name), static files can keep the
        # production prefix even in DEV.
        if path.startswith(f"{PROD_BASE_URL}/static/"):
            return self.get_response(request)
        
        # Check for authentication token
        session = getattr(request, "session", None)
        if session is None:
            logger.warning("[TokenMiddleware] Session not available for path: %s", path)
            return self.get_response(request)

        token = session.get('auth_token')

        if not token:
            logger.warning(f"[TokenMiddleware] Unauthorized access attempt to: {path}")
            return redirect(reverse('login'))

        return self.get_response(request)
