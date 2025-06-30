from .views_import import *
from .responseController import responseController

@csrf_exempt
def api_post_calls(request, table):
    """
    Send a POST request to an external API with the provided JSON data.

    Users must be authenticated via session token.

    Args:
        request (HttpRequest): The incoming HTTP request containing JSON data.
        table (str): Dynamic table name to determine API endpoint.

    Returns:
        JsonResponse: Response from the external API, or an error message if something goes wrong.
    """
    token = request.session.get("auth_token")
    if not token:
        return JsonResponse({"status": "error", "message": "User not authenticated"}, status=401)

    body_unicode = json.loads(request.body.decode('utf-8'))

    full_url = f"{URL}{table.upper()}"
    headers = {"Authorization": f"Bearer {token}"}

    try:
        response = requests.post(full_url, headers=headers, json=body_unicode)

        responseController(response,"Failed in API POST!!")
    except requests.exceptions.RequestException as e:
        return JsonResponse({"error": "Connection error to external API", "details": str(e)}, status=500)

@csrf_exempt
def api_put_calls(request, src):
    """

    """
    token = request.session.get("auth_token")
    if not token:
        return JsonResponse({"status": "error", "message": "User not authenticated"}, status=401)

    body_unicode = request.body.decode('utf-8')
    body_unicode = json.loads(body_unicode)

    full_url = f"{URL}{src}"
    headers = {"Authorization": f"Bearer {token}"}

    try:
        response = requests.put(full_url, headers=headers, json=body_unicode)
        responseController(response,"Failed in API POST!!")

    except requests.exceptions.RequestException as e:
        return JsonResponse({"error": "Connection error to external API", "details": str(e)}, status=500)


def get_static_file(request, filename):
    """
    Retrieve static HTML content from the 'HTML' folder for authenticated users.

    Args:
        request (HttpRequest): The incoming HTTP request.
        filename (str): Name of the static HTML file to retrieve.

    Returns:
        JsonResponse: File content if found, or 404 if not found.
    """
    if not request.session.get("auth_token"):
        return JsonResponse({"status": "error", "message": "User not authenticated"}, status=401)

    static_path = f"HTML/{filename}"
    file_path = finders.find(static_path)

    if file_path and os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8") as file:
            content = file.read()
        return JsonResponse({"message": content})
    else:
        print(f"File not found: {static_path}")
        raise Http404("File not found.")

def api_get_calls(request, query_params):
    """
    Send a GET request to an external API and return the response as JSON.

    Users must be authenticated via session token.

    Args:
        request (HttpRequest): The incoming HTTP request.
        query_params (str): Encoded query path to append to the base URL.

    Returns:
        JsonResponse: Response from the external API, or error if the request fails.
    """
    token = request.session.get("auth_token")
    if not token:
        return JsonResponse({"status": "error", "message": "User not authenticated"}, status=401)

    full_url = f"{URL}{unquote(query_params)}"
    headers = {"Authorization": f"Bearer {token}"}

    try:
        response = requests.get(full_url, headers=headers)
        responseController(response,"Failed in API POST!!")

    except requests.exceptions.RequestException as e:
        return JsonResponse({"error": "Connection error to external API", "details": str(e)}, status=500)

@csrf_exempt    
def api_get_calls_simple(request, query_params):
    """
    Send a GET request to an external API and return the response as JSON.

    Args:
        request (HttpRequest): The incoming HTTP request.
        query_params (str): Encoded query path to append to the base URL.

    Returns:
        JsonResponse: Response from the external API, or error if the request fails.
    """

    full_url = f"{URL}{unquote(query_params)}"


    try:
        response = requests.get(full_url)
        responseController(response,"Failed in API POST!!")

    except requests.exceptions.RequestException as e:
        return JsonResponse({"error": "Connection error to external API", "details": str(e)}, status=500)
