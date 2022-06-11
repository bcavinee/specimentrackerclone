from django import forms
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Fieldset, ButtonHolder, Submit


rack_choices= [

	('Hematology First Rack One','Hematology First Rack One'),
	('Chemistry First Rack One', 'Chemistry First Rack One')

]





#Form with choice of departments
class rack_options(forms.Form):

	rack_options= forms.CharField(widget=forms.Select(choices=rack_choices),label=False)

class search_accession(forms.Form):



	accession_search= forms.CharField(widget=forms.TextInput(attrs={'class' : 'form-control rounded', 'aria-label' : "accession-number-search",
	 "aria-describedby" : "basic-addon2",
	 'placeholder' : 'Patient Accession'}), label=False)






class remove_patient(forms.Form):

	 patient_rack_location= forms.CharField(widget=forms.HiddenInput())



