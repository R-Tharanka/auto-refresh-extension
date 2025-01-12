# backend/urls.py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('feedback/', include('feedback.urls')),  # Add this line to include feedback URLs
    path('', include('feedback.urls')),  # Add this line to map root URL ('/') to the feedback form
]
