# Generated by Django 3.2.6 on 2022-05-13 23:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0007_auto_20220513_1955'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chemistry_first_rack_one',
            name='mrn',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='home.patient_information'),
        ),
        migrations.AlterField(
            model_name='hematology_first_rack_one',
            name='mrn',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='home.patient_information'),
        ),
        migrations.AlterField(
            model_name='patient_information',
            name='patient_name',
            field=models.CharField(blank=True, max_length=200, unique=True),
        ),
    ]
