from django.urls import path, include

urlpatterns = [
    path('', include("apps.customform.urls"), name='home'),
]
