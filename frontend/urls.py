from django.urls import path
from . import views
from django.views.generic.base import RedirectView
from django.conf.urls import include

app_name = 'frontend'
urlpatterns = [
    path('train/', views.training, name='training'),
    path('', views.groups, name='groups'),
    path('info/', views.info, name='info'),
    path('modify/', views.modify, name='modify'),
]
