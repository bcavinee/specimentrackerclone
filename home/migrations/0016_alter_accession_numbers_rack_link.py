# Generated by Django 3.2.6 on 2022-05-24 22:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0015_alter_accession_numbers_rack_link'),
    ]

    operations = [
        migrations.AlterField(
            model_name='accession_numbers',
            name='rack_link',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='home.hematology_first_rack_one'),
        ),
    ]
