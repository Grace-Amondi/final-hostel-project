from django.contrib.gis.utils import LayerMapping

from.models import Hostel

hostel_mapping = {
    'name' : 'Name',
    'location' : 'POINT',
}

hostels_shp = '/home/geogirl/Desktop/data/hostels.shp'


def run(verbose=True):
    lm = LayerMapping(
        Hostel, hostels_shp, hostel_mapping,
        transform=False, encoding='iso-8859-1',
    )
    lm.save(strict=True, verbose=verbose)


