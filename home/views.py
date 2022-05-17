from django.shortcuts import render, redirect
from django.http import JsonResponse
from .models import hematology_first_rack_one, patient_information, accession_numbers
from .forms import rack_options
from django.core.exceptions import ObjectDoesNotExist

def home_page(request):



	rack_selection_form= rack_options()

	if request.method == "POST":

		rack_selection_form= rack_options(request.POST)

		if rack_selection_form.is_valid():

			rack_selection= rack_selection_form.cleaned_data['rack_options']

			request.session['rack_selection']= rack_selection

			return redirect("hematology_first_rack_one")




	return render(request,'home/home_page.html', {'rack_selection_form' : rack_selection_form})



def hematology_first_rack_one_view(request):

	rack_selection= request.session['rack_selection']
	

	if request.method == "POST":

		accession_number= request.POST['accessionNumber']
		position= request.POST['positionId']

		
		
		get_position= hematology_first_rack_one.objects.get(position=position)


		if len(accession_number) == 6:

			link_rack= accession_numbers.objects.get(accession_number=accession_number)

			link_rack.rack_link= hematology_first_rack_one.objects.get(position=position)

			link_rack.save()


		elif len(accession_number) == 2:


			#*** This is where you need to save the accesison and link it to the accession table 

			tube_type_dicts= {"31" : "box edta-large", "21" : "box serum-large", "16" : "box pst-large"}

			css_from_user= tube_type_dicts[accession_number]

			get_position.css_of_position= css_from_user
		
			get_position.tube_type= accession_number

			get_position.save()


	

		





	# patient= accession_numbers.objects.get(accession_number="X23482")
	# print(patient.patient_link.patient_name)
	# print(patient.patient_linkmedical_record_number
	# print(patient.accession_number)
	
	# print(patient.rack_link.position)



		if request.is_ajax():


			if len(accession_number) == 6:

				#*********
				
				patient= accession_numbers.objects.get(accession_number= accession_number)
				patient_name_from_model= patient.patient_link.patient_name

			else:
			
				patient_name_from_model= ""	

			return JsonResponse({"accession_number" : accession_number, "patient_name_from_model" : patient_name_from_model}, status=200)

	hematology_first_rack_one_objects= hematology_first_rack_one.objects.all().order_by("position")

	return render(request,'home/hematology_first_rack_one.html', {'hematology_first_rack_one_objects' : hematology_first_rack_one_objects})