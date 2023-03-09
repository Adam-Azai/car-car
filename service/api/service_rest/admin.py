from django.contrib import admin
from .models import ServiceAppointment, Technician

admin.site.register(ServiceAppointment)
admin.site.register(Technician)
# Register your models here.
