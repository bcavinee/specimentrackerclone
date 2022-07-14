from django.contrib import admin
from .models import hematology_first_rack_one, patient_information, accession_numbers, chemistry_first_rack_one


admin.site.register(hematology_first_rack_one)
admin.site.register(patient_information)
admin.site.register(accession_numbers)
admin.site.register(chemistry_first_rack_one)
# Register your models here.
