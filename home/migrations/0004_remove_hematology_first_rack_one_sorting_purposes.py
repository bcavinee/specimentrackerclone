# Generated by Django 3.2.6 on 2022-05-12 21:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0003_hematology_first_rack_one_sorting_purposes'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='hematology_first_rack_one',
            name='sorting_purposes',
        ),
    ]
