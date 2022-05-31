from django.db import models

# Create your models here.


class patient_information(models.Model):

	patient_name= models.CharField(max_length=200, blank=True, unique=True)
	medical_record_number= models.CharField(max_length=200, blank=True)
	


	class Meta:
		verbose_name= "Patient Information"
		verbose_name_plural= "Patient Information"


	def __str__(self):
		return self.patient_name 

class accession_numbers(models.Model):

	patient_link= models.ForeignKey(patient_information, on_delete=models.CASCADE)
	accession_number= models.CharField(max_length=200, blank=True)
	#rack_link= models.OneToOneField(hematology_first_rack_one, on_delete=models.CASCADE, null=True, blank=True)


	# def save(self, *args, **kwargs):
		
	# 	if self.rack_link.css_of_position == "box blank":
	# 		self.rack_link= None
	# 	super(hematology_first_rack_one,self).save(*args,**kwargs)


	class Meta:
		verbose_name= "Accession Number"
		verbose_name_plural= "Accession Number"


	def __str__(self):
		return self.accession_number 


class hematology_first_rack_one(models.Model):

	
	position= models.CharField(max_length=200, blank=True)
	css_of_position= models.CharField(max_length=500, blank=True)
	tube_type= models.CharField(max_length=500, blank=True)
	accession_link= models.ForeignKey(accession_numbers, on_delete=models.CASCADE, null=True, blank=True)
	

	def save(self, *args, **kwargs):
		
		if self.accession_link == None:
			self.css_of_position= "box blank"
			self.tube_type= ""
		super(hematology_first_rack_one,self).save(*args,**kwargs)
	
	class Meta:
		verbose_name= "Hematology First Rack One"
		verbose_name_plural= "Hematology First Rack One"


	def __str__(self):
		return self.position 		





class chemistry_first_rack_one(models.Model):

	
	position= models.CharField(max_length=200, blank=True)
	css_of_position= models.CharField(max_length=500, blank=True)
	tube_type= models.CharField(max_length=500, blank=True)
	accession_number= models.CharField(max_length=10, blank=True)
	#sorting_purposes= models.IntegerField(default=0)

	def save(self, *args, **kwargs):
		
		if self.accession_number == "":
			self.css_of_position= "box blank"
		super(hematology_first_rack_one,self).save(*args,**kwargs)
	
	class Meta:
		verbose_name= "Hematology First Rack One"
		verbose_name_plural= "Hematology First Rack One"


	def __str__(self):
		return self.position 		



