from django.urls import path, include
from .views import api_customer_list, api_salesperson_list, api_sales_record_list, api_automobile_list

urlpatterns = [
  path('customers/', api_customer_list, name="api_customer_list"),
  path('salespeople/', api_salesperson_list, name="api_salesperson_list"),
  path('salesrecords/', api_sales_record_list, name="api_sales_record_list"),
  path('automobilelist/', api_automobile_list, name="api_automobile_list"),
]
