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
            self.excluded_paths = ['/' + PROD_BASE_URL + path for path in base_paths]
        else:
            self.excluded_paths = base_paths

    def __call__(self, request):
        path = request.path
        
        # Allow access to excluded paths without authentication
        if any(path.startswith(p) for p in self.excluded_paths):
            return self.get_response(request)
        
        # Check for authentication token
        token = request.session.get('auth_token')

        if not token:
            logger.warning(f"[TokenMiddleware] Unauthorized access attempt to: {path}")
            return redirect(reverse('login'))

        return self.get_response(request)
