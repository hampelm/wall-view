mapboxgl.accessToken = 'pk.eyJ1Ijoic2x1c2Fyc2tpZGRldHJvaXRtaSIsImEiOiJjaXZsNXlwcXQwYnY5MnlsYml4NTJ2Mno4In0.8wKUnlMPIlxq-eWH0d10-Q';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/slusarskiddetroitmi/cjenih7pg7acz2sp92y78jyuy', // stylesheet location
    center: [-83.050,42.336], // starting position [lng, lat]
    zoom: 14.6 // starting zoom
});

let photos = "https://a.mapillary.com/v3/sequences?client_id=WGl5Z2dkVHEydGMwWlNMOHUzVHR4QToyMmQ4OTRjYzczZWFiYWVi&start_time=2018-03-01&end_time=2018-03-11&bbox=-83.06530952453613,42.323048176081876,-83.03157806396484,42.343320316410804"


map.on('load', function () {
    map.addSource('photos-mapillary', {
        type: 'geojson',
        data:photos,


    });

    map.addSource('parcels', {
       type: 'vector',
       url: 'mapbox://slusarskiddetroitmi.cwobdjn0'
     });

     map.addSource('walls', {
        type: 'vector',
        url: 'mapbox://slusarskiddetroitmi.3cbahynf'
      });


    map.addLayer({
        'id': 'photos-mapillary',
        'type': 'line',
        'source': 'photos-mapillary',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'line-width': 3,
            "line-color": "#39ff14"
        }
    });

    map.addLayer({
        'id': 'photos-mapillary-node',
        'type': 'circle',
        'source': 'photos-mapillary',minzoom: 17.5,
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'circle-radius': 5,
            'circle-color': '#E80C7A'
        }
    });

    map.addLayer({
   "id": "parcel-line",
   "type": "line",
   "source": "parcels", minzoom: 15.5,
   "layout": {
   },
   "paint": {
        "line-color":"#cbcbcb",
   },
   'source-layer': 'parcelsgeojson'
});

map.addLayer({
"id": "walls",
"type": "line",
"source": "walls", minzoom: 13,
"layout": {
},
"paint": {
  "line-width": 4,
    "line-color":"#FF530D",
},
'source-layer': 'walls-0u9rhx'



});

document.getElementById('side-bar').addEventListener('click', function() {

     // Geographic coordinates of the LineString
     var coordinates = photos-mapillary.features[0].geometry.coordinates;

     // Pass the first coordinates in the LineString to `lngLatBounds` &
     // wrap each coordinate pair in `extend` to include them in the bounds
     // result. A variation of this technique could be applied to zooming
     // to the bounds of multiple Points or Polygon geomteries - it just
     // requires wrapping all the coordinates with the extend method.
     var bounds = coordinates.reduce(function(bounds, coord) {
         return bounds.extend(coord);
     }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

     map.fitBounds(bounds, {
         padding: 20
     });
 });
});
