from urllib import request
from django.shortcuts import render
from django.views.generic import TemplateView, View
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponseRedirect
from django.contrib.auth import logout
# Create your views here.
class HomeView(LoginRequiredMixin, TemplateView):
    template_name = 'home.html'



class LogoutView(View):
    def get(self, request):
        logout(request)
        return HttpResponseRedirect("/auth")