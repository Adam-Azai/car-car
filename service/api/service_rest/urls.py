from django.urls import path

from .views import (
    api_technician,
    api_list_service_appointment,
    api_service_appointment,
)

urlpatterns = [
    path("technicians/",
         api_technician,
         name="api_technicians",
        ),

    path('appointments/',
         api_list_service_appointment,
         name="api_list_service_appointment",
         ),

    path('appointments/records/<str:vin_vo_id>/',
         api_list_service_appointment,
         name="api_service_appointment"),

     path('appointments/<int:id>/',
         api_service_appointment,
          name="api_service_appointment"),

]
