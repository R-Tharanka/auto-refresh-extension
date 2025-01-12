# feedback/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('', views.feedback_view, name='feedback_form'),
    path('thank-you/', views.thank_you_view, name='feedback_thank_you'),
]
