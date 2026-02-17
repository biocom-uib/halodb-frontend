from .views_import import *
import logging

logger = logging.getLogger(__name__)

@csrf_exempt
def api_put_file(request, src):
    """

    """
    token = request.session.get("auth_token")
    if not token:
        return JsonResponse({"status": "error", "message": "User not authenticated"}, status=401)

    file= request.FILES.get('file')
    sequence=request.POST.get('sequence')
    fName=request.POST.get('fName')
    logger.debug("Uploading file with sequence=%s and fName=%s", sequence, fName)

    files = {
        'file': (fName, file.file, file.content_type)
    }
    sequence = {
        'sequence': sequence
    }   

    full_url = f"{URL}{src}"

    headers = {"Authorization": f"Bearer {token}"}

    try:
        response = requests.put(full_url, headers=headers, files=files, data=sequence)
        if response.status_code == 200:
            return JsonResponse({'status': 'enviado', 'api_response': response.text})
    except requests.exceptions.RequestException as e:
        return JsonResponse({'error': str(e)}, status=500)
    

@csrf_exempt
def api_get_file(request, src):
    """
    
    """
    token = request.session.get("auth_token")
    if not token:
        return JsonResponse({"status": "error", "message": "User not authenticated"}, status=401)

    full_url = f"{URL}{src}"

    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(full_url, headers=headers)

        
    if response.status_code == 200:
        content_type = response.headers.get('Content-Type', 'application/octet-stream')
        
        # Extraer nombre del archivo desde Content-Disposition
        disposition = response.headers.get('Content-Disposition', '')
        filename = "archivo_descargado.ext"  # valor por defecto

        if 'filename=' in disposition:
            match = re.search(r'filename="?([^\";]+)"?', disposition)
            if match:
                filename = match.group(1)

        django_response = HttpResponse(response.content, content_type=content_type)
        django_response['Content-Disposition'] = f'attachment; filename="{filename}"'
        return django_response

    return HttpResponse("Error al descargar archivo", status=response.status_code)
