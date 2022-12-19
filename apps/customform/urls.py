from django.urls import path

from apps.customform.views import FormListView, AddElementView

urlpatterns = [
    path("forms/", FormListView.as_view()),
    path("create/", AddElementView.as_view())
]
