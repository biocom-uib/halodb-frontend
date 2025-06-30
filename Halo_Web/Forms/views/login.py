# Import everything from the views_import module
from .views_import import *  

# Define the base directory of the project
BASE_DIR = Path(__file__).resolve().parent.parent

# Load environment variables from the .env file located at the project root
load_dotenv(os.path.join(BASE_DIR, '.env'))

# Retrieve the base URL (e.g., for the API or database) from environment variables
URL = os.getenv('DB_PATH')


def login_logic(data):
    """
    Authenticate a user by sending credentials to the login API endpoint.

    Args:
        data (dict): User credentials, e.g., {'username': '...', 'password': '...'}

    Returns:
        dict: On success, returns {'token': <auth_token>}.
              On failure, returns the JSON response from the server containing error details.
    """
    url = URL + "login"
    response = requests.post(url, json=data)

    if response.status_code == 200:
        response_data = response.json()
        return {"token": response_data.get("token")}

    # Print the error response for debugging
    print(response.json())
    return response.json()
