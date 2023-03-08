from django.db import models
from django.urls import reverse


class VinVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    import_href = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return f'{self.vin}'


class Technician(models.Model):
    technician_name = models.CharField(max_length=200)
    employee_number = models.CharField(max_length=12)

    def __str__(self):
        return self.technician_name
    def get_api_url(self):
        return reverse('api_technician', kwargs={'pk': self.id})



class ServiceAppointment(models.Model):
    owner_name = models.CharField(max_length=200)
    date = models.DateField(auto_now=False, auto_now_add=False)
    time = models.TimeField(auto_now=False, auto_now_add=False)
    reason = models.TextField()
    vip = models.BooleanField(default=False)
    status = models.BooleanField(default=False)
    technician = models.ForeignKey(
        Technician,
        related_name='appointments',
        on_delete=models.CASCADE
    )
    vin = models.CharField(max_length=17)

    def __str__(self):
        return f'{self.owner_name}{self.reason}{self.vin}{self.technician}{self.time}'
    def get_api_url(self):
        return reverse("api_appointment", kwargs={"pk":self.id})
