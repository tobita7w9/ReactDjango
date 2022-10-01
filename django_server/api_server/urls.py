from django.urls import path,include
from . import apis
from rest_framework import routers

router=routers.DefaultRouter()
router.register(r'samples',apis.HelloApi,'test-get')


urlpatterns = [
    path("hello/",include(router.urls)),
]