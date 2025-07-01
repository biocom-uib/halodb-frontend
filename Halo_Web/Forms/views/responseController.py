# Import everything from the views_import module
from .views_import import *

def responseController(response, error_msg):
    '''
    Handles the HTTP response from an external API.

    Parameters:
    response (requests.Response): The response object returned from the external API request.
    error_msg (str): A custom error message to include if the response is not successful.

    Returns:
    JsonResponse: A Django JsonResponse containing the parsed data or an error message.
    '''
    # Check if the response was successful (status code 200)
    if response.status_code == 200:
        parsed_response = response.json()
        # If the response contains a 'data' key, return that data
        if "data" in parsed_response:
            return JsonResponse(parsed_response["data"],safe=False)
        # Otherwise, return the entire parsed response
        return JsonResponse(parsed_response,safe=False)
    else:
        # If the response failed, return an error JSON with the status code
        return JsonResponse(
            {"error": error_msg, "status_code": response.status_code},
            status=response.status_code
        )

def middelWare(request):
    '''
    Middleware-like function to check if the user is authenticated.

    Parameters:
    request (HttpRequest): The incoming HTTP request object.

    Returns:
    HttpResponse or None: If no token is found in the session, renders the 'profile' page.
                          Otherwise, does nothing (implicitly returns None).
    '''
    # Get the authentication token from the session
    token = request.session.get("auth_token")
    
    # If no token is found, redirect the user to the 'profile' view
    if not token:
        return render(request,"profile")  # This may need a request argument: render(request, "profile.html")
