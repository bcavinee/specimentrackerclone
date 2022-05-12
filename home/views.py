from django.shortcuts import render
from django.http import JsonResponse


def home_page(request):


	if request.method == "POST":

		accession_number= request.POST['accessionNumber']

		tube_type_dicts= {31 : "box edta-large", 21 : "box serum-large", 16 : "box pst-large"}
		
		if request.is_ajax():

			return JsonResponse({"accession_number" : accession_number}, status=200)

	return render(request,'home/home_page.html')