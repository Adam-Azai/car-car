from django.shortcuts import render
from .models import Customer, Salesperson
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
def customer_list(request):
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
def salesperson_list(request):
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
