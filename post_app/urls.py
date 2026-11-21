from django.urls import path

from post_app.views import HomeView , LogoutView



urlpatterns = [
    path('posts/', HomeView.as_view(), name='post'),
    path('logout/', LogoutView.as_view(), name = 'logout'),
]