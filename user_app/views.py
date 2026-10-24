from django.shortcuts import render , redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse_lazy
from django.views.generic import *
from django.contrib.auth.views import LoginView
from .forms import UserForm

class RegView(CreateView):
    form_class = UserCreationForm
    template_name = 'user_app/reg.html'
    success_url = reverse_lazy('login')

class CustomLoginView(LoginView):
    template_name = "user_app/login.html"

class AuthView(TemplateView):
    template_name = "user_app/auth.html"

    def get_context_data(self, **kwargs):
        context = {
            "form":UserForm
        }
        return context
# Create your views here.
