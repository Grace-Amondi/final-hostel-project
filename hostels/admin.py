# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from leaflet.admin import LeafletGeoAdmin
from .models import Hostel, Owner

admin.site.register(Hostel, LeafletGeoAdmin)
admin.site.register(Owner)
