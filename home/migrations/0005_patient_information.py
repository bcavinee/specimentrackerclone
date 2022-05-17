# Generated by Django 3.2.6 on 2022-05-12 21:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0004_remove_hematology_first_rack_one_sorting_purposes'),
    ]

    operations = [
        migrations.CreateModel(
            name='patient_information',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('patient_name', models.CharField(blank=True, max_length=200)),
                ('medical_record_number', models.CharField(blank=True, max_length=200)),
                ('patient_accession_number', models.CharField(blank=True, max_length=200)),
            ],
        ),
    ]