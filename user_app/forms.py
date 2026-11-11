# from django.contrib.auth.models import User
# from django.forms import ModelForm

# class UserForm(ModelForm):
#     class Meta:
#         model = User
#         fields = ["email", "password"]

from django import forms
from django.contrib.auth.forms import UserCreationForm, SetPasswordMixin, AuthenticationForm
from .models import User

class RegisterForm(UserCreationForm):
    email = forms.EmailField(
        label="Електронна пошта",
        widget=forms.EmailInput(attrs={"placeholder": "you@example.com"})
    )
    password1, password2 = SetPasswordMixin.create_password_fields("Пароль", "Підтверди пароль")

    class Meta:
        model = User
        fields = ['email']

class LoginForm(AuthenticationForm):
    username = forms.EmailField(
        label="Електронна пошта",
        widget=forms.EmailInput(attrs={"placeholder": "you@example.com"})
    )  


class VerifyCodeForm(forms.Form):
    code1 = forms.CharField(
        max_length=1,
        required=True,
        widget=forms.TextInput(),
        label="Код підтвердження"
    )
    code2 = forms.CharField(
        max_length=1,
        required=True,
        widget=forms.TextInput(),

    )
    code3 = forms.CharField(
        max_length=1,
        required=True,
        widget=forms.TextInput(),

    )
    code4 = forms.CharField(
        max_length=1,
        required=True,
        widget=forms.TextInput(),

    )
    code5 = forms.CharField(
        max_length=1,
        required=True,
        widget=forms.TextInput(),

    )
    code6 = forms.CharField(
        max_length=1,
        required=True,
        widget=forms.TextInput(),

    )