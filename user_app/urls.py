from django.urls import path
from  .views import CustomLoginView, RegView, AuthView


urlpatterns = [
    path('login/', CustomLoginView.as_view(), name='login'),
    path('reg/', RegView.as_view(), name='reg'),
    path('auth/', AuthView.as_view(), name='auth')
]