from django.urls import path
from . import apis

urlpatterns = [
    path("hello/",apis.HelloApi.as_view(),name="test-get"),
]