# Generated by Django 3.2.6 on 2022-05-16 22:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0013_auto_20220516_1819'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='hematology_first_rack_one',
            name='accession_number_link',
        ),
        migrations.AddField(
            model_name='accession_numbers',
            name='rack_link',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='home.hematology_first_rack_one'),
        ),
    ]
