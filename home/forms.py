from django import forms


rack_choices= [

	('Hematology First Rack One','Hematology First Rack One'),
	('Chemistry First Rack One', 'Chemistry First Rack One')

]



#Form with choice of departments
class rack_options(forms.Form):

	rack_options= forms.CharField(widget=forms.Select(choices=rack_choices),label=False)