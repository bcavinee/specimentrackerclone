# Generated by Django 3.2.6 on 2022-05-24 22:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0014_auto_20220516_1831'),
    ]

    operations = [
        migrations.AlterField(
            model_name='accession_numbers',
            name='rack_link',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='home.hematology_first_rack_one'),
        ),
    ]
