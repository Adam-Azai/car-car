from django.shortcuts import render
from django.http import JsonResponse
from common.json import ModelEncoder
import json
from django.views.decorators.http import require_http_methods
from .encoders import CustomerEncoder, SalespersonEncoder, AutomobileVOEncoder, SalesRecordEncoder
from .models import Customer, AutomobileVO, Salesperson, SalesRecord
# Create your views here.


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



@require_http_methods(["GET"])
def api_automobile_list(request, ):
  if request.method == "GET":
    automobiles = AutomobileVO.objects.all()
    return JsonResponse(
      {"automobiles": automobiles},
      encoder = AutomobileVOEncoder,
      safe=False,
    )

@require_http_methods(["GET", "POST"])
def api_sales_record_list(request, automobile_vo_id=None):
  if request.method == "GET":
    if automobile_vo_id is not None:
      salerecords = SalesRecord.objects.filter(automobile=automobile_vo_id)
      #Automobile in SalesRecordEncoder in Sales Record Model is AutomobileVO... which is VIN because ForeignKey
      return JsonResponse(
        salesrecords,
        encoder=SalesRecordEncoder,
            # "automobile",
            # "salesperson",
            # "customer",
            # "sales_price",
        safe=False
      )
    else: #"else" POST
      salesrecords = SalesRecord.objects.all()
    return JsonResponse(
      {"salesrecords": salesrecords},
      encoder=SalesRecordEncoder,
      safe=False
    )
  else:
    content = json.loads(request.body)
    try:
      salesperson = Salesperson.objects.get(name=content["name"])
      content["name"] = name
    except Salesperson.DoesNotExist:
      return JsonResponse(
        {"message": "Salesperson does not exist"},
        status=400,
      )
    try:
      vin = AutomobileVO.objects.get(vin=content['vin'])
      if vin is not None:
        content['availability'] = False # set to false when record is created to change availablity to falsy
        sales = SalesRecord.objects.create(**content)
        return JsonResponse(
          salesrecord,
          encoder=SalesRecordEncoder,
          safe=False,
        )
    except AutomobileVO.DoesNotExist: #maybe convert this to something else, possibly a failure if car is already sold????
      salesrecord = SalesRecord.objects.create(**content)
      return JsonResponse(
        salesrecord,
        encoder=SalesRecordEncoder,
        safe=False
      )

@require_http_methods(["GET", "DELETE"])
def api_sales_record(request,id):
  if request.method == "GET":
    salesrecord = SalesRecord.objects.filter(id=name)
    return JsonResponse(
      salesrecord,
      encoder=SalesRecordEncoder,
      safe=False
    )
  else:
    count, _=SalesRecord.objects.filter(id=id).delete()
    return JsonResponse({"deleted": count > 0})
