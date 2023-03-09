from django.db import models

# Create your models here.


class Customer(models.Model):
    name = models.CharField(max_length=250)
    address = models.CharField(max_length=250)
    phone = models.CharField(max_length=16, unique=True)

    def __str__(self):
        return f"{self.name}"


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    availability = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.vin}"


class Salesperson(models.Model):
    name = models.CharField(max_length=250)
    employee_number = models.PositiveIntegerField(unique=True)

    def __str__(self):
        return f"{self.name}"


class SalesRecord(models.Model):
    customer = models.ForeignKey(
        Customer,
        related_name="salesrecords",
        on_delete=models.CASCADE,
    )
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="salesrecords",
        on_delete=models.CASCADE,
    )
    salesperson = models.ForeignKey(
        Salesperson,
        related_name="salesrecords",
        on_delete=models.CASCADE,
    )
    sales_price = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.automobile}"
