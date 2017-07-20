var map = L.map('map', {
    center: [-1.09713135, 37.014170107681],
    zoom: 15,
    maxZoom: 17,
    minZoom: 15
});


var layer = L.esri.basemapLayer('Imagery').addTo(map);
var layerLabels;

function setBasemap(basemap) {
    if (layer) {
        map.removeLayer(layer);
    }

    layer = L.esri.basemapLayer(basemap);

    map.addLayer(layer);

    if (layerLabels) {
        map.removeLayer(layerLabels);
    }

    if (basemap === 'ShadedRelief'
        || basemap === 'Gray'
        || basemap === 'DarkGray'
        || basemap === 'Imagery'
        || basemap === 'Terrain'
    ) {
        layerLabels = L.esri.basemapLayer(basemap + 'Labels');
        map.addLayer(layerLabels);
    }
}

function changeBasemap(basemaps) {
    var basemap = basemaps.value;
    setBasemap(basemap);
}

// var esriStreets = L.esri.basemapLayer('Imagery').addTo(map);
//home button

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(["leaflet"], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('leaflet'));
    } else {
        root.L.Control.DefaultExtent = factory(root.L);
    }
}(this, function (L) {

    return (function () {
        /* global L */
        'use strict';
        L.Control.DefaultExtent = L.Control.extend({
            options: {
                position: 'topleft',
                text: 'Default Extent',
                title: 'Zoom to default extent',
                className: 'leaflet-control-defaultextent'
            },
            onAdd: function (map) {
                this._map = map;
                return this._initLayout();
            },
            setCenter: function (center) {
                this._center = center;
                return this;
            },
            setZoom: function (zoom) {
                this._zoom = zoom;
                return this;
            },
            _initLayout: function () {
                var container = L.DomUtil.create('div', 'leaflet-bar ' +
                    this.options.className);
                this._container = container;
                this._fullExtentButton = this._createExtentButton(container);

                L.DomEvent.disableClickPropagation(container);

                this._map.whenReady(this._whenReady, this);

                return this._container;
            },
            _createExtentButton: function () {
                var link = L.DomUtil.create('a', this.options.className + '-toggle',
                    this._container);
                link.href = '#';
                link.innerHTML = this.options.text;
                link.title = this.options.title;

                L.DomEvent
                    .on(link, 'mousedown dblclick', L.DomEvent.stopPropagation)
                    .on(link, 'click', L.DomEvent.stop)
                    .on(link, 'click', this._zoomToDefault, this);
                return link;
            },
            _whenReady: function () {
                if (!this._center) {
                    this._center = this._map.getCenter();
                }
                if (!this._zoom) {
                    this._zoom = this._map.getZoom();
                }
                return this;
            },
            _zoomToDefault: function () {
                this._map.setView(this._center, this._zoom);
            }
        });

        L.Map.addInitHook(function () {
            if (this.options.defaultExtentControl) {
                this.addControl(new L.Control.DefaultExtent());
            }
        });

        L.control.defaultExtent = function (options) {
            return new L.Control.DefaultExtent(options);
        };

        return L.Control.DefaultExtent;

    }());
    ;

}));

//adding hostel layer to map
var hostel_layer = L.geoJson(null, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: L.icon({
                iconUrl: "/static/img/youthhostel (5).png",
                iconSize: [24, 28],
                iconAnchor: [12, 28],
                popupAnchor: [0, -25]
            }),
            title: feature.properties.NAME,
            riseOnHover: true,
        });
    },
    onEachFeature: function (feature, layer) {
        if (feature.properties) {
            var owner = feature.properties.owner[0] + " " + feature.properties.owner[1];
            var contacts = feature.properties.owner[2];
            var email = feature.properties.owner[3];
            var imgsrc = "/media/" + feature.properties.image;
            var image = "<img style='width:auto;height:auto;right: 50px' class='img-responsive' src='" + imgsrc + "'>";
            console.log(image);

            var content = "<table class='table table-striped table-bordered table-condensed' >" + "<tr><th>Hostel Name</th><td>" + feature.properties.name + "</td></tr>" + "<tr><th>Owner</th><td>" + owner + "</td></tr>" + "<tr><th>CONTACTS</th><td>" + contacts + "<tr><th>EMAIL</th><td>" + email + "<tr><th>Price</th><td>" + feature.properties.price + "</td></tr>" + "<tr><th>AVAILABILTY</th><td>" + feature.properties.is_available + "</td></tr>" + "<tr><th>Type</th><td>" + feature.properties.type + "</td></tr></table>" + image;
            layer.on({
                click: function (e) {
                    $("#feature-title").html(feature.properties.name);
                    $("#feature-info").html(content);
                    $("#featureModal").modal("show");
                }
            });
        }
    }
});


$.getJSON('/hostel_data', function (data) {
    console.log(data);
    hostel_layer.addData(data);
    map.addLayer(hostel_layer);
    map.fitBounds(hostel_layer.getBounds());
});

//fullscreen
map.isFullscreen() // Is the map fullscreen?
map.toggleFullscreen() // Either go fullscreen, or cancel the existing fullscreen.

// `fullscreenchange` Event that's fired when entering or exiting fullscreen.
map.on('fullscreenchange', function () {
    if (map.isFullscreen()) {
        console.log('entered fullscreen');
    } else {
        console.log('exited fullscreen');
    }
});
map.addControl(new L.Control.Fullscreen());


lc = L.control.locate({
    strings: {
        title: "Show me where I am, yo!"
    }
}).addTo(map);// slider2 = L.control.slider(function(value) {alert(value);}, {id:slider2, orientation: 'horizontal'});

L.control.defaultExtent([-1.09713135, 37.014170107681])
    .addTo(map);
//
// marker.bindPopup('<p>hello</p>');
// marker.addTo(map);

