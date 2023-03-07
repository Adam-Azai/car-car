from django.urls import path, include
from .views import customer_list, salesperson_list

urlpatterns = [
  path('customers/', customer_list, name="customer_list"),
  path('salespeople/', salesperson_list, name="salesperson_list"),
]
