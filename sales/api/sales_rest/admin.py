from django.contrib import admin
from sales_rest.models import Customer, AutomobileVO, Salesperson, SalesRecord

# Register your models here.


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    pass


@admin.register(AutomobileVO)
class AutomobileVOAdmin(admin.ModelAdmin):
    pass


@admin.register(Salesperson)
class SalespersonAdmin(admin.ModelAdmin):
    pass


@admin.register(SalesRecord)
class SalesRecord(admin.ModelAdmin):
    pass
