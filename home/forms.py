from django import forms


rack_choices= [

	('Hematology First Rack One','Hematology First Rack One'),
	('Chemistry First Rack One', 'Chemistry First Rack One')

]





#Form with choice of departments
class rack_options(forms.Form):

	rack_options= forms.CharField(widget=forms.Select(choices=rack_choices),label=False)

class search_accession(forms.Form):

	accession_search= forms.CharField()

class remove_patient(forms.Form):

	 patient_rack_location= forms.CharField(widget=forms.HiddenInput())