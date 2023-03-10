from .models import Customer, Salesperson, AutomobileVO, SalesRecord
from common.json import ModelEncoder


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "name",
        "address",
        "phone",
        "id",
    ]


class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "name",
        "employee_number",
        "id",
    ]


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "id",
        "availability",
    ]


class SalesRecordEncoder(ModelEncoder):
    model = SalesRecord
    properties = ["customer", "automobile", "salesperson", "sales_price", "id"]
    encoders = {
        "salesperson": SalespersonEncoder(),
        "customer": CustomerEncoder(),
        "automobile": AutomobileVOEncoder(),
    }
