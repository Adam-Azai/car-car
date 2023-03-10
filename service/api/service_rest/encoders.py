from common.json import ModelEncoder

from .models import Technician, ServiceAppointment, VinVO


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = ["id", "technician_name", "employee_number"]


class VinVOEncoder(ModelEncoder):
    model = VinVO
    properties = ["id", "vin", "import_href"]


class ServiceAppointmentEncoder(ModelEncoder):
    model = ServiceAppointment
    properties = [
        "id",
        "owner_name",
        "date",
        "time",
        "reason",
        "vin",
        "technician",
        "vip",
        "status",
    ]
    encoders = {"technician": TechnicianEncoder()}
