from django.shortcuts import render, redirect
from django.http import JsonResponse
from .models import hematology_first_rack_one, patient_information, accession_numbers
from .forms import rack_options, search_accession, remove_patient
from django.core.exceptions import ObjectDoesNotExist
import random

def home_page(request):



	rack_selection_form= rack_options()
	search_accession_form= search_accession()

	if request.method == "POST":


		if 'rack_options' in request.POST:

			rack_selection_form= rack_options(request.POST)

			if rack_selection_form.is_valid():

				
				rack_selection= rack_selection_form.cleaned_data['rack_options']

				accession_search= False

				request.session['rack_selection']= rack_selection

				request.session['accession_search']= accession_search

				return redirect("hematology_first_rack_one")

		if 'accession_search' in request.POST:

			search_accession_form= search_accession(request.POST)

			if search_accession_form.is_valid():

				
				accession_search_results= search_accession_form.cleaned_data['accession_search']

				
				patient_accession= accession_numbers.objects.get(accession_number=accession_search_results)

				# patient_name= patient_accession.patient_link.patient_name

				# accession_rack_position= patient_accession.rack_link.position

				accession_rack= hematology_first_rack_one.objects.filter(accession_link= patient_accession).first()

				accession_rack_position= accession_rack.position

				accession_search= True

				request.session['accession_search']= accession_search				

				request.session['accession_rack_position']= accession_rack_position			

				return redirect("hematology_first_rack_one")



	return render(request,'home/home_page.html', {'rack_selection_form' : rack_selection_form, "search_accession_form" : search_accession_form})



def hematology_first_rack_one_view(request):

	rack_selection= request.session['rack_selection']
	accession_rack_position= request.session['accession_rack_position']
	accession_search= request.session['accession_search']
	 
	# y= accession_numbers.objects.get(accession_number="W11111")
	# x= hematology_first_rack_one.objects.filter(accession_link=y)
	# print(y.patient_link.medical_record_number)

	
	if request.method == "GET":

		if request.is_ajax():
		
			equation_x= random.randint(0,10)
			equation_y= random.randint(0,10)
			delete_answer= equation_x + equation_y


			return JsonResponse({'equation_x': equation_x, 'equation_y': equation_y, 'delete_answer' : delete_answer})



	
	remove_patient_form= remove_patient()


	if request.method == "POST":

		# try:
		# 	if 'patient_rack_location' in request.POST:

		# 		remove_patient_form= remove_patient(request.POST)


		# 		from_search= True

		# 		if request.POST['patient_rack_location'] == "" and (from_search == True and accession_search == True):


					
		# 			remove_location= hematology_first_rack_one.objects.get(position=accession_rack_position)

		# 			remove_location.css_of_position= "box blank"
		# 			remove_location.tube_type= ""

		# 			remove_location.accession_link = None



		# 			remove_location.save()

		# 			from_search= False
					

		# 		if remove_patient_form.is_valid():

		# 			location_to_remove= remove_patient_form.cleaned_data['patient_rack_location']

		# 			single_location_removal= hematology_first_rack_one.objects.get(position=location_to_remove)

		# 			single_location_removal.css_of_position= "box blank"
		# 			single_location_removal.tube_type= ""

		# 			single_location_removal.save()


		# 		position_with_accession= hematology_first_rack_one.objects.get(position=location_to_remove)


		# 		# if accession_numbers.objects.filter(rack_link=single_location_removal).exists():

		# 		# 	rack_position_accession_link= accession_numbers.objects.get(rack_link=single_location_removal)
					
		# 		# 	rack_position_accession_link.rack_link= None

		# 		# 	rack_position_accession_link.save()

		# 		if position_with_accession.accession_link != None:

		# 			position_with_accession.accession_link = None

		# 			position_with_accession.save()


		# except UnboundLocalError:
		# 	print("welp")	



		if 'removeSinglePatientHidden' in request.POST:

			location_to_remove= request.POST.get("removeSinglePatientHidden")


			try:

			
				single_location_removal= hematology_first_rack_one.objects.get(position=location_to_remove)

				single_location_removal.css_of_position= "box blank"
				single_location_removal.tube_type= ""

				single_location_removal.save()

				position_with_accession= hematology_first_rack_one.objects.get(position=location_to_remove)

				if position_with_accession.accession_link != None:

					position_with_accession.accession_link = None

					position_with_accession.save()


			except hematology_first_rack_one.DoesNotExist:
				
				print('eh')

			if request.is_ajax():

				
				if location_to_remove == "":

					location_to_remove= "empty"

					remove_location= hematology_first_rack_one.objects.get(position=accession_rack_position)

					remove_location.css_of_position= "box blank"
					remove_location.tube_type= ""

					remove_location.accession_link = None

					remove_location.save()

			

				return JsonResponse({"accession_rack_position" : accession_rack_position,'location_to_remove' : location_to_remove}, status=200)






		if 'delete_equation_answer' in request.POST:

			equation_answer= request.POST.get("delete_equation_answer")
			user_equation_answer= request.POST.get("user_answer")

			if equation_answer == user_equation_answer:

				for rack_position in hematology_first_rack_one.objects.all():

					rack_position.css_of_position = "box blank"
					rack_position.tube_type= ""

					rack_position.save()

				for accession in hematology_first_rack_one.objects.all():

					accession.accession_link= None

					accession.save()


		if 'accessionNumber' in request.POST:

			accession_number= request.POST['accessionNumber']
			position= request.POST['positionId']
			lock_switch= request.POST['lock_switch']
			locked_tubetype= request.POST['locked_tubetype']

			
			
			
			get_position= hematology_first_rack_one.objects.get(position=position)


			if len(accession_number) == 6:

				# link_rack= accession_numbers.objects.get(accession_number=accession_number)

				# link_rack.rack_link= hematology_first_rack_one.objects.get(position=position)

				# link_rack.save()

				accession_num= accession_numbers.objects.get(accession_number=accession_number)

				rack= hematology_first_rack_one.objects.get(position=position)

				rack.accession_link= accession_num

				rack.save()


			elif len(accession_number) == 2:


				#*** This is where you need to save the accesison and link it to the accession table 

				tube_type_dicts= {"31" : "box edta-large", "21" : "box serum-large", "16" : "box pst-large"}

				css_from_user= tube_type_dicts[accession_number]

				get_position.css_of_position= css_from_user
			
				get_position.tube_type= accession_number

				get_position.save()


		


			if request.is_ajax():


				if len(accession_number) == 6:


					#*********
					
					patient= accession_numbers.objects.get(accession_number= accession_number)
					patient_name_from_model= patient.patient_link.patient_name
					patient_mrn= patient.patient_link.medical_record_number

				else:
				
					patient_name_from_model= ""	
					patient_mrn= ""

				return JsonResponse({"accession_number" : accession_number, "patient_name_from_model" : patient_name_from_model, 'patient_mrn' : patient_mrn}, status=200)




				


	hematology_first_rack_one_objects= hematology_first_rack_one.objects.all().order_by("position")



	#Next step is to plug the accession number rack position and accession search into templates.

	#Then use template logic to add pulse to the position the usere selects when the page is loaded


	if accession_search == True:

		user_selected_accession= accession_rack_position 

	elif accession_search == False:

		user_selected_accession= None


	from_search= hematology_first_rack_one.objects.get(position=accession_rack_position)

	if from_search.css_of_position == "box blank":

		user_selected_accession= None



	return render(request,'home/hematology_first_rack_one.html', {'hematology_first_rack_one_objects' : hematology_first_rack_one_objects, 
		"user_selected_accession" : user_selected_accession, "remove_patient_form" : remove_patient_form})