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

				print('true')
				
				rack_selection= rack_selection_form.cleaned_data['rack_options']

				accession_search= False

				accession_rack_position_none= "empty"

				request.session['rack_selection']= rack_selection

				request.session['accession_search']= accession_search

				request.session['accession_rack_position']= accession_rack_position_none

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

		


		if 'removeSinglePatientHidden' in request.POST:

			location_to_remove= request.POST.get("removeSinglePatientHidden")
			print("hi")

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


		
		if 'positionId' in request.POST:

			
			
			accession_and_tubetype= request.POST.getlist('accessionPlusTubeType[]')
			position= request.POST['positionId']
			lock_on_off= request.POST['lockSwitch']
			# Using request.POST.get('lockedTubeType', False) to provide a default value if a value is not passed in from AJAX
			locked_tubetype=  request.POST.get('lockedTubeType', False)
			
			print(lock_on_off)
			print(accession_and_tubetype)
		
			#If the user has entered an accession number and tubetype a list will be passed to accession_and_tubetype
			if len(accession_and_tubetype) == 2 and lock_on_off == "false":


				#Setting accession and tubetype to two seperate variables
				accession_number_from_user= accession_and_tubetype[0]
				tube_type_from_user= accession_and_tubetype[1]


				#Getting queryset of the accession number the user chose
				accession_num= accession_numbers.objects.get(accession_number=accession_number_from_user)

				#Getting a queryset of the position the user chose
				rack= hematology_first_rack_one.objects.get(position=position)

				#Setting the rack link to the accession from user
				rack.accession_link= accession_num

				
				tube_type_dicts= {"31" : "box edta-large", "21" : "box serum-large", "16" : "box pst-large"}

				#Setting CSS based on the user selected tubetype
				css_from_user= tube_type_dicts[tube_type_from_user]

				rack.css_of_position= css_from_user
			
				rack.tube_type= tube_type_from_user

				rack.save()



				if request.is_ajax():


					return JsonResponse({'tube_type_from_user' : tube_type_from_user}, status=200)


			elif len(accession_and_tubetype) == 2 and lock_on_off == "true":


				#Setting accession and tubetype to two seperate variables
				accession_number_from_user= accession_and_tubetype[0]
				tube_type_from_user= accession_and_tubetype[1]

				

				#Getting queryset of the accession number the user chose
				accession_num= accession_numbers.objects.get(accession_number=accession_number_from_user)

				#Getting a queryset of the position the user chose
				rack= hematology_first_rack_one.objects.get(position=position)

				#Setting the rack link to the accession from user
				rack.accession_link= accession_num

				
				tube_type_dicts= {"31" : "box edta-large", "21" : "box serum-large", "16" : "box pst-large"}

				#Setting CSS based on the user selected tubetype
				css_from_user= tube_type_dicts[tube_type_from_user]

				rack.css_of_position= css_from_user
			
				rack.tube_type= tube_type_from_user

				rack.save()



				if request.is_ajax():


					return JsonResponse({'tube_type_from_user' : tube_type_from_user}, status=200)
				


	hematology_first_rack_one_objects= hematology_first_rack_one.objects.all().order_by("position")



	#Next step is to plug the accession number rack position and accession search into templates.

	#Then use template logic to add pulse to the position the usere selects when the page is loaded


	if accession_search == True:

		user_selected_accession= accession_rack_position 

	elif accession_search == False:

		user_selected_accession= None


	try:

		from_search= hematology_first_rack_one.objects.get(position=accession_rack_position)
	
	except hematology_first_rack_one.DoesNotExist:
		pass


	try:
		if from_search.css_of_position == "box blank":

			user_selected_accession= None

	except UnboundLocalError:
		pass


	# try:

	# 	from_search= hematology_first_rack_one.objects.get(position=accession_rack_position)
	
	# except hematology_first_rack_one.DoesNotExist:
	# 	print("nope")


	# try:
	# 	if from_search.css_of_position == "box blank":

	# 		user_selected_accession= None

	# except UnboundLocalError:
	# 	print("nope")


	return render(request,'home/hematology_first_rack_one.html', {'hematology_first_rack_one_objects' : hematology_first_rack_one_objects, 
		"user_selected_accession" : user_selected_accession, "remove_patient_form" : remove_patient_form})