from django.urls import path
from . import views




urlpatterns = [
   
    path('', views.home_page, name='home_page'),
    path('hematology_first_rack_one', views.hematology_first_rack_one_view, name='hematology_first_rack_one')
    
]