from django.urls import path, include
from .views import api_customer_list, api_salesperson_list, api_sales_record_list, api_automobile_list

# , api_sales_record

urlpatterns = [
  path('customers/', api_customer_list, name="api_customer_list"),
  path('salespeople/', api_salesperson_list, name="api_salesperson_list"),
  path('salesrecords/', api_sales_record_list, name="api_sales_record_list"),
  path('automobilelist/', api_automobile_list, name="api_automobile_list"),
  # path('salesrecords/record/<str:automobile_vo_id>/', api_sales_record_list, name="api_sales_record_list"),
  # path('salesrecords/int:id>/', api_sales_record, name="api_sales_record")
]
