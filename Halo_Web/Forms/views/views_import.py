import json
import requests
import os
import ast
import re

from django.contrib.auth.decorators import login_required
from django.contrib.staticfiles import finders
from django.urls import re_path
from django.template import loader
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse,JsonResponse,Http404
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib import messages
from django.conf import settings
from django.core.mail import send_mail
from urllib.parse import unquote
from dotenv import load_dotenv
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(os.path.join(BASE_DIR, '.env'))

URL=os.getenv('DB_PATH')


def build_backend_url(endpoint, ensure_trailing_slash=True):
    """
    Build a backend URL from DB_PATH and an endpoint path.
    Django path converters drop the trailing slash from captured parameters,
    so we can restore it when needed.
    """
    base = (URL or "").rstrip("/")
    target = unquote((endpoint or "")).lstrip("/")

    if ensure_trailing_slash and target:
        if "?" in target:
            path, query = target.split("?", 1)
            if path and not path.endswith("/"):
                path = f"{path}/"
            target = f"{path}?{query}"
        elif not target.endswith("/"):
            target = f"{target}/"

    if not target:
        return f"{base}/"

    return f"{base}/{target}"
