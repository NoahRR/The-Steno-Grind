from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User


class RegisterForm(UserCreationForm):
    username = forms.CharField(max_length=100, label="Username")
    password1 = forms.CharField(max_length=100, label="Password1")
    password2 = forms.CharField(max_length=100, label="Password2")

    class Meta:
        model = User
        fields = ["username", "password1", "password2"]
