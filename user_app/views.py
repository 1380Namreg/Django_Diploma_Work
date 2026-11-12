from django.shortcuts import render , redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse_lazy
from django.views.generic import *
from django.contrib.auth.views import LoginView
from .forms import RegisterForm, LoginForm, VerifyCodeForm
from django.http import JsonResponse
from .models import VerifyCode

SESSION_KEY = 'pending_user_id'
class RegView(CreateView):
    form_class = RegisterForm

    def form_valid(self, form): 
        user = form.save(commit=False)
        user.is_active = False
        user.save()

        verify_code = VerifyCode.objects.create(code = 0, user = user)
        verify_code.generate_code()

        self.request.session["email"] = user.email
        return JsonResponse({"success": True, "email": user.email})

    def form_invalid(self, form):
        return JsonResponse({"success": False, "errors": form.errors})


class CustomLoginView(LoginView):
    form_class = LoginForm

    def form_valid(self, form):
        user = form.get_user()
        if not user.is_active:
            form.add_error("general", "Користувач не активний, пiдтвердiть пошту")
            return self.form_invalid(form)
        login(request = self.request, user=user)
        return JsonResponse({"success": True})
    
    def form_invalid(self, form):
        return JsonResponse({"success": False, "errors": form.errors})

class VerifyCodeFormView(FormView):
    form_class = VerifyCodeForm

    def form_valid(self, form: VerifyCodeForm):

        
        code1 = form.cleaned_data.get("code1")
        code2 = form.cleaned_data.get("code2")
        code3 = form.cleaned_data.get("code3")
        code4 = form.cleaned_data.get("code4")
        code5 = form.cleaned_data.get("code5")
        code6 = form.cleaned_data.get("code6")
        print(code1, code2, code3, code4, code5, code6)
        code = f'{code1}{code2}{code3}{code4}{code5}{code6}'
        print(code)
        verify_code =VerifyCode.objects.filter(code = code).first()

        
        if verify_code and verify_code.is_valid():
            verify_code.user.is_active = True
            verify_code.user.save()
            self.request.session.pop("email")
            verify_code.delete()
            return JsonResponse({"success": True})
        else:
            form.add_error("code", "Такого коду не існує, або його час вичерапно.")
            return self.form_invalid(form)
        
    def form_invalid(self, form):
        print("AAAAAAAAAAAAAAAAA")
        return JsonResponse({"success": False, "errors": form.errors})

class AuthView(TemplateView):
    template_name = "user_app/auth.html"

    def get_context_data(self, **kwargs):
        context = {
            "register_form": RegisterForm(),
            "login_form": LoginForm(),
            "verify_code_form": VerifyCodeForm(),
        }
        return context
# Create your views here.
#