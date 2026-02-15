"""
Utility functions for the Forms application.
"""
import logging
from typing import Optional, Dict, Any
import requests
from django.conf import settings

logger = logging.getLogger(__name__)


def safe_api_request(
    method: str,
    url: str,
    headers: Optional[Dict[str, str]] = None,
    json_data: Optional[Dict[str, Any]] = None,
    timeout: int = 10
) -> Optional[requests.Response]:
    """
    Make a safe API request with error handling.
    
    Args:
        method: HTTP method (GET, POST, PUT, DELETE)
        url: API endpoint URL
        headers: Optional request headers
        json_data: Optional JSON data for POST/PUT requests
        timeout: Request timeout in seconds
        
    Returns:
        Response object if successful, None otherwise
    """
    try:
        response = requests.request(
            method=method.upper(),
            url=url,
            headers=headers,
            json=json_data,
            timeout=timeout
        )
        response.raise_for_status()
        return response
    except requests.exceptions.Timeout:
        logger.error(f"Request timeout for {method} {url}")
    except requests.exceptions.ConnectionError:
        logger.error(f"Connection error for {method} {url}")
    except requests.exceptions.HTTPError as e:
        logger.error(f"HTTP error {e.response.status_code} for {method} {url}")
    except Exception as e:
        logger.error(f"Unexpected error in API request: {e}")
    
    return None


def validate_email(email: str) -> bool:
    """
    Basic email validation.
    
    Args:
        email: Email address to validate
        
    Returns:
        True if valid, False otherwise
    """
    import re
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))


def get_user_from_token(token: str) -> Optional[Dict[str, Any]]:
    """
    Retrieve user information from authentication token.
    
    Args:
        token: Authentication token
        
    Returns:
        User data dict if successful, None otherwise
    """
    from .views.views_import import URL
    
    if not token:
        return None
    
    headers = {"Authorization": f"Bearer {token}"}
    url = URL + "user/"
    
    response = safe_api_request("GET", url, headers=headers)
    
    if response:
        try:
            data = response.json()
            return data.get("data", {}).get("message", {})
        except ValueError:
            logger.error("Invalid JSON response from user endpoint")
    
    return None


def format_datetime(dt_string: str, format_str: str = "%Y-%m-%d %H:%M:%S") -> str:
    """
    Format datetime string.
    
    Args:
        dt_string: Datetime string to format
        format_str: Target format string
        
    Returns:
        Formatted datetime string
    """
    from datetime import datetime
    
    try:
        # Try parsing ISO format first
        dt = datetime.fromisoformat(dt_string.replace('Z', '+00:00'))
        return dt.strftime(format_str)
    except ValueError:
        return dt_string


def sanitize_filename(filename: str) -> str:
    """
    Sanitize filename to remove dangerous characters.
    
    Args:
        filename: Original filename
        
    Returns:
        Sanitized filename
    """
    import re
    # Remove any non-alphanumeric characters except dots, dashes, and underscores
    return re.sub(r'[^\w\.-]', '_', filename)
