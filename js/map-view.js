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
        'source': 'photos-mapillary',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'circle-radius': 5,
            'circle-color': '#E80C7A'
        }
    });



    });

    var mly = new Mapillary.Viewer(
                'mly',
                // Replace this with your own client ID from mapillary.com
                '=WGl5Z2dkVHEydGMwWlNMOHUzVHR4QToyMmQ4OTRjYzczZWFiYWVi',
                'Eoh1EMfmCjIn1UlMcPSoFg');
