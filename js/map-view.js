mapboxgl.accessToken = 'pk.eyJ1Ijoic2x1c2Fyc2tpZGRldHJvaXRtaSIsImEiOiJjaXZsNXlwcXQwYnY5MnlsYml4NTJ2Mno4In0.8wKUnlMPIlxq-eWH0d10-Q';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/slusarskiddetroitmi/cjenih7pg7acz2sp92y78jyuy', // stylesheet location
    center: [-83.050,42.336], // starting position [lng, lat]
    zoom: 14.6 // starting zoom
});

var markerSource = {
  type: "geojson",
  data: {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [-83.0485, 42.341]
    },
    properties: {}
  }
};

map.on('style.load', function(){
  map.addSource("markers", markerSource);
  map.addLayer({
    id: "markers",
    type: "symbol",
    source: "markers",
    layout: {
      "icon-image": "car-15"
    }
});



let photos = "https://a.mapillary.com/v3/sequences?client_id=WGl5Z2dkVHEydGMwWlNMOHUzVHR4QToyMmQ4OTRjYzczZWFiYWVi&start_time=2018-03-01&end_time=2018-03-11&bbox=-83.06530952453613,42.323048176081876,-83.03157806396484,42.343320316410804"
let mapillaryphotos = null




fetch(photos).then(response => {return response.json()}).then(data => {console.log(data); mapillaryphotos=data})




    map.addSource('parcels', {
       type: 'vector',
       url: 'mapbox://slusarskiddetroitmi.cwobdjn0'
     });

     map.addSource('walls', {
        type: 'vector',
        url: 'mapbox://slusarskiddetroitmi.3cbahynf'
      });

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
        'source': 'photos-mapillary',minzoom: 17.5,
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'circle-radius': 10,
            'circle-color': '#E80C7A'
        }
    });

    map.on('style.load', function(){
  map.addSource("markers", markerSource);
  map.addLayer({
    id: "markers",
    type: "symbol",
    source: "markers",
    layout: {
      "icon-image": "car-15"
    }
  });
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












            var lat = 42.335205503079514;
       var lon =  -83.041872382164;






       // Viewer size is dynamic so resize should be called every time the window size changes
       window.addEventListener("resize", function() { mly.resize(); });
});
var mly = new Mapillary.Viewer(
            'side-bar',
            // Replace this with your own client ID from mapillary.com
            'WGl5Z2dkVHEydGMwWlNMOHUzVHR4QToyMmQ4OTRjYzczZWFiYWVi',
            null,
          );
map.on('click', function(e) {
    console.log(e);
    var closeto ="https://a.mapillary.com/v3/images?closeto="+e.lngLat.lng+","+e.lngLat.lat+"&client_id=WGl5Z2dkVHEydGMwWlNMOHUzVHR4QToyMmQ4OTRjYzczZWFiYWVi&start_time=2018-03-01&end_time=2018-03-11&usernames=dexterslu";
    console.log(closeto);
    fetch(closeto)
 .then(response => {return response.json()})
 .then(data => {
   console.log(data);
   let mapillaryphotos = data;
   let mapillary_keys = mapillaryphotos.features[0].properties.key;
   console.log(mapillary_keys);




   mly = new Mapillary.Viewer(
              'side-bar',
              // Replace this with your own client ID from mapillary.com
              'WGl5Z2dkVHEydGMwWlNMOHUzVHR4QToyMmQ4OTRjYzczZWFiYWVi',
              null,
            );

            mly.moveToKey(mapillary_keys)
                .then(
                    function(node) { console.log(node.key); },
                    function(error) { console.error(error); });
 });




});
