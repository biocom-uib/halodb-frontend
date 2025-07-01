from .views_import import *


def load_filter(request,id=None):

  return render(request,"filter.html")