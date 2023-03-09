from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from .encoders import (
    VinVOEncoder,
    TechnicianEncoder,
    ServiceAppointmentEncoder
)

from .models import VinVO, ServiceAppointment, Technician

@require_http_methods(["GET", "POST",])
def api_technician(request):
    if request.method == "GET":
        # lists all technicians
        techs = Technician.objects.all()
        return JsonResponse(
            {"technicians": techs},
            encoder=TechnicianEncoder
        )
    else:
        try:
            # creating a technician
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False
            )
        except:
            response = JsonResponse(
                {"message":"Could not create technician"}
            )
            response.status_code = 400
            return response


@require_http_methods(["GET","POST"])
def api_list_service_appointment(request, vin_vo_id=None):
    if request.method == "GET":
        if vin_vo_id is not None:
            appointments = ServiceAppointment.objects.filter(vin=vin_vo_id)
            return JsonResponse(
                {"appointments": appointments},
                encoder=ServiceAppointmentEncoder,
                safe=False
            )
        else:
            appointments = ServiceAppointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=ServiceAppointmentEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            # adding an existing technician to the appointment
            technician = Technician.objects.get(technician_name=content['technician'])
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "No such Technician"},
                status=400,
            )
        try:
            vin = VinVO.objects.get(vin=content['vin'])
            if vin is not None:
                content['vip'] = True
                appointment = ServiceAppointment.objects.create(**content)
                return JsonResponse(
                    appointment,
                    encoder=ServiceAppointmentEncoder,
                    safe=False,
                )
        # Despite Vin not Existing a person should be able to create a new appointment
        # the checking of the vin existing is for checking wheter a customer is a VIP
        except VinVO.DoesNotExist:
            appointment = ServiceAppointment.objects.create(**content)
            return JsonResponse(
                    appointment,
                    encoder=ServiceAppointmentEncoder,
                    safe=False
            )

@require_http_methods(["GET", "DELETE", "PUT"])
def api_service_appointment(request,id):
    # displays the appointments associated with the vin number
    if request.method == "GET":
        appointment = ServiceAppointment.objects.filter(id=id)
        return JsonResponse(
            appointment,
            encoder=ServiceAppointmentEncoder,
            safe=False
            )
    elif request.method =="DELETE":
        count, _ = ServiceAppointment.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        appointment = ServiceAppointment.objects.filter(pk=id)
        content['status'] = True
        ServiceAppointment.objects.filter(id=id).update(**content)
        return JsonResponse(
                appointment,
                encoder=ServiceAppointmentEncoder,
                safe=False
            )
