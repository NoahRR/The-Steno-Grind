from django.urls import include, path
from rest_framework import routers

from api.views import WordViewSet, UserViewSet, GroupViewSet, LevelsViewSet, WordGroupViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
#  router.register(r'groups', GroupViewSet)
router.register(r'word', WordViewSet)
router.register(r'wordgroup', WordGroupViewSet)
router.register(r'level', LevelsViewSet)

urlpatterns = [
    path('', include(router.urls))
]
