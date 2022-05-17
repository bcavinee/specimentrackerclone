from django.contrib import admin
from .models import hematology_first_rack_one, patient_information, accession_numbers


admin.site.register(hematology_first_rack_one)
admin.site.register(patient_information)
admin.site.register(accession_numbers)
# Register your models here.
