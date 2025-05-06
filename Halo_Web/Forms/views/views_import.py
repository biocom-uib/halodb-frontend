import json
import requests
import os
import ast

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



URL="https://biocom.uib.es/halodb/"