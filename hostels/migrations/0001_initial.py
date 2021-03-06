# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-09-06 21:32
from __future__ import unicode_literals

import django.contrib.gis.db.models.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Hostel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('type', models.CharField(blank=True, choices=[('bedsitter', 'Bedsitter'), ('single', 'Single')], max_length=100, null=True)),
                ('location', django.contrib.gis.db.models.fields.PointField(srid=4326)),
                ('price', models.IntegerField(blank=True, null=True)),
                ('is_available', models.BooleanField(default=True)),
                ('image', models.ImageField(upload_to=b'')),
            ],
        ),
        migrations.CreateModel(
            name='Owner',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(blank=True, max_length=100, null=True)),
                ('contact', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254)),
            ],
        ),
        migrations.AlterUniqueTogether(
            name='owner',
            unique_together=set([('first_name', 'last_name')]),
        ),
        migrations.AddField(
            model_name='hostel',
            name='owner',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='hostels.Owner'),
        ),
    ]
