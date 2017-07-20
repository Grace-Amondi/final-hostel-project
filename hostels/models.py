# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.gis.db import models


class OwnerManager(models.Manager):
    def get_by_natural_key(self, first_name, last_name,contact,email):
        return self.get(first_name=first_name, last_name=last_name,contact=contact,email=email)


class Owner(models.Model):
    objects = OwnerManager()
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100,null=True,blank=True)
    contact = models.CharField(max_length=100)
    email = models.EmailField()

    def natural_key(self):
        return (self.first_name, self.last_name,self.contact,self.email)

    class Meta:
        unique_together = (('first_name', 'last_name'),)

    def __unicode__(self):
        return self.first_name


class Hostel(models.Model):
    TYPE_CHOICES = (
        ('bedsitter', 'Bedsitter'),
        ('single', 'Single'),
    )
    name = models.CharField(max_length=200)
    type = models.CharField(max_length=100, choices=TYPE_CHOICES, blank=True, null=True)
    location = models.PointField(srid=4326)
    owner = models.ForeignKey(Owner, blank=True, null=True)
    price = models.IntegerField(blank=True, null=True)
    is_available = models.BooleanField(default=True)
    image = models.ImageField()

    def __unicode__(self):
        return self.name
