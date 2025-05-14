from .views_import import *

def load_experiment_form(request):
    """
    Render the experiment form page.

    Args:
        request (HttpRequest): The incoming HTTP request.

    Returns:
        HttpResponse: Rendered 'Formulario.html' page.
    """
    return render(request, "Formulario.html")

def summary(request):
    """
    Render the summary page only if the user navigated from a 'Forms' page.

    Args:
        request (HttpRequest): The incoming HTTP request.

    Returns:
        HttpResponse: Rendered 'Summary.html' page or redirect to home if invalid referer.
    """
    referer = request.META.get('HTTP_REFERER')
    if not referer or 'Forms' not in referer:
        return redirect('/')
    template = loader.get_template('Summary.html')
    return HttpResponse(template.render())

def sample_insert(request):
    """
    Render the sample insert page.

    Args:
        request (HttpRequest): The incoming HTTP request.

    Returns:
        HttpResponse: Rendered 'Sample.html' page.
    """
    return render(request, "Sample.html")

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

    body_unicode = request.body.decode('utf-8')
    body_unicode = json.loads(body_unicode)

    full_url = f"{URL}{table.upper()}"
    print(full_url)
    print(body_unicode)
    headers = {"Authorization": f"Bearer {token}"}

    try:
        response = requests.post(full_url, headers=headers, json=body_unicode)

        if response.status_code == 200:
            return JsonResponse(response.json())
        else:
            err = response.json()
            print(err)
            print(response)
            return JsonResponse(
                {"error": err, "status_code": response.status_code},
                status=response.status_code
            )

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
        print(full_url)
        response = requests.get(full_url, headers=headers)

        if response.status_code == 200:
            return JsonResponse(response.json(), safe=False)
        else:
            return JsonResponse(
                {"error": "External API error", "status_code": response.status_code},
                status=response.status_code
            )

    except requests.exceptions.RequestException as e:
        return JsonResponse({"error": "Connection error to external API", "details": str(e)}, status=500)
