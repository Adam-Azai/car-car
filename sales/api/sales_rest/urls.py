from django.urls import path, include
from .views import customer_list

urlpatterns = [
  path('customers/', customer_list, name="customer_list")
]
