from django.shortcuts import render
from .models import Customer, Salesperson, AutomobileVO, SalesRecord
from django.http import JsonResponse
from common.json import ModelEncoder
import json
from django.views.decorators.http import require_http_methods
# Create your views here.


class CustomerEncoder(ModelEncoder):
  model = Customer
  properties = [
    "name",
    "address",
    "phone",
    "id",
    ]

@require_http_methods(["GET", "POST"])
def api_customer_list(request):
  if request.method == "GET":
    customers = Customer.objects.all()
    return JsonResponse(
      {"customers": customers},
      encoder=CustomerEncoder,
      safe=False
    )
  else:
    try:
      content = json.loads(request.body)
      customer = Customer.objects.create(**content)
      return JsonResponse(
        {"customers": customer},
        encoder=CustomerEncoder,
        safe=False)
    except:
      response = JsonResponse(
        {"message": "Invalid Customer Info"}
      )
      response.status_code = 400
      return response

class SalespersonEncoder(ModelEncoder):
  model = Salesperson
  properties = [
    "name",
    "employee_number",
    "id",
    ]

@require_http_methods(["GET", "POST"])
def api_salesperson_list(request):
  if request.method == "GET":
    salespeople = Salesperson.objects.all()
    return JsonResponse(
      {"salespeople": salespeople},
      encoder=SalespersonEncoder,
      safe=False
    )
  else:
    try:
      content = json.loads(request.body)
      salespeople = Salesperson.objects.create(**content)
      return JsonResponse(
        {"salespeople": salespeople},
        encoder=SalespersonEncoder,
        safe=False)
    except:
      response = JsonResponse(
        {"message": "Invalid Salesperson Info"}
      )
      response.status_code = 400
      return response

class AutomobileVOEncoder(ModelEncoder):
  model = AutomobileVO
  properties = [
    "vin",
    "id",
    "availability",
  ]

@require_http_methods(["GET"])
def api_automobile_list(request):
  if request.method == "GET":
    automobiles = AutomobileVO.objects.all()
    return JsonResponse(
      {"automobiles": automobiles},
      encoder = AutomobileVOEncoder,
      safe=False,
    )

class SalesRecordEncoder(ModelEncoder):
  model = SalesRecord
  properties = [
    "automobile",
    "salesperson",
    "customer",
    "sales_price",
  ]

@require_http_methods(["GET", "POST"])
def api_sales_record_list(request,):
  if request.method == "GET":
    sales_records = SalesRecord.objects.all()
    return JsonResponse(
      {"sales_records": sales_records},
      encoder=SalesRecordEncoder,
      safe=False,
    )
  # else:
  #   try:
  #     content = json.loads(request.body)
  #     content = {
  #       **content,
  #       "salesperson": Salesperson.objects.get(pk=content["salesperson"]),
  #       "automobile": AutomobileVO.objects.get(vin=content["automobile"]),
  #       "customer": Customer.objects.get(pk=content["customer"]),
  #       "sales_price": salesprice,
  #     }
  #     sales_record = SalesRecord.objects.create(**content)
  #     return JsonResponse(
  #       {"sales_record": sales_record},
  #       encoder=SalesRecordEncoder,
  #       safe=False
  #     )
  #   except:
  #     response = JsonResponse(
  #       {"message": "Invalid Sales Record Info"}
  #     )
  #     response.status_code = 400
  #     return response


#
