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
