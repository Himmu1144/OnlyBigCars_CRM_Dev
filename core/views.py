from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.contrib.auth import login, logout
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework import status



@api_view(['GET'])
def home_view(request):
    return Response({"message": "Lorem Ipsumic"})

