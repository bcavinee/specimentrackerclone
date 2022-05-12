from django.db import models

# Create your models here.


class hematology_first_rack_one(models.Model):

	position= models.CharField(max_length=200)
	css_of_position= models.CharField(max_length=500)
	tube_type= models.IntegerField()
	accession_number= models.CharField(max_length=10)
	
