# Generated by Django 3.2.6 on 2022-05-12 16:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='hematology_first_rack_one',
            options={'verbose_name': 'Hematology First Rack One', 'verbose_name_plural': 'Hematology First Rack One'},
        ),
        migrations.AlterField(
            model_name='hematology_first_rack_one',
            name='accession_number',
            field=models.CharField(blank=True, max_length=10),
        ),
        migrations.AlterField(
            model_name='hematology_first_rack_one',
            name='css_of_position',
            field=models.CharField(blank=True, max_length=500),
        ),
        migrations.AlterField(
            model_name='hematology_first_rack_one',
            name='position',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AlterField(
            model_name='hematology_first_rack_one',
            name='tube_type',
            field=models.CharField(blank=True, max_length=500),
        ),
    ]
