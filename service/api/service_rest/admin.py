from django.contrib import admin
from .models import ServiceAppointment, Technician, VinVO

admin.site.register(ServiceAppointment)
admin.site.register(Technician)
admin.site.register(VinVO)
