from django.urls import path

from post_app.views import HomeView
from django.contrib.auth.views import LogoutView


urlpatterns = [
    path('home/', HomeView.as_view(), name='home'),
    path('logout/', LogoutView.as_view(), name = 'logout'),
]