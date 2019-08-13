
//create initial map layer
var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 50,
    id: "mapbox.streets",
    accessToken: API_KEY
})

var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
});

//read in USGS data
d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson').then(function (data) {

    //Create some arrays for storage
    var quakes1 = []
    var quakes2 = []
    var quakes3 = []
    var quakes4 = []
    var quakes5 = []
    var quakes6 = []

    var XYCoords = []

    var quakeMarkers1 = []
    var quakeMarkers2 = []
    var quakeMarkers3 = []
    var quakeMarkers4 = []
    var quakeMarkers5 = []
    var quakeMarkers6 = []

    //iterate through the data and record necessary values
    for (i = 0; i < data.features.length; i++) {

        //rearrange lat/long from x/y
        XYCoords.push(data.features[i].geometry.coordinates)
        lng = XYCoords[i].splice(0, 1)
        lat = XYCoords[i].splice(0, 1)

        //create variables to build objects for each quake
        var coords = lat.concat(lng)
        var id = data.features[i].id;
        var mag = data.features[i].properties.mag;

        //create new quake objects
        var quake = { id: id, coords: coords, mag: mag }

        if (quake.mag > 5) {
            quakes6.push(quake)
        }
        else if (quake.mag > 4) {
            quakes5.push(quake)
        }
        else if (quake.mag > 3) {
            quakes4.push(quake)
        }

        else if (quake.mag > 2) {
            quakes3.push(quake)
        }

        else if (quake.mag > 1) {
            quakes2.push(quake)
        }

        else if (quake.mag > 0) {
            quakes1.push(quake)
        }
    }

    //create and set variables for plotting
    var Opacity = .7;
    var radMultiplier = 40000;
    var weight = .5;


    //iterate through list of quakes and create group for each level of intensity
    for (i = 0; i < quakes1.length; i++) {
        quakeMarkers1.push(

            L.circle(quakes1[i].coords, {
                color: 'grey',
                fillColor: 'green',
                fillOpacity: Opacity,
                radius: (quakes1[i].mag * radMultiplier),
                weight: weight
            }).bindPopup(`ID: ${quakes1[i].id} </br> Magnitude: ${quakes1[i].mag} </br> Location: ${quakes1[i].coords}`)
        )
    };
    for (i = 0; i < quakes2.length; i++) {
        quakeMarkers2.push(

            L.circle(quakes2[i].coords, {
                color: 'grey',
                fillColor: 'greenyellow',
                fillOpacity: Opacity,
                radius: (quakes2[i].mag * radMultiplier),
                weight: weight
            }).bindPopup(`ID: ${quakes2[i].id} </br> Magnitude: ${quakes2[i].mag} </br> Location: ${quakes2[i].coords}`)
        )
    };
    for (i = 0; i < quakes3.length; i++) {
        quakeMarkers3.push(

            L.circle(quakes3[i].coords, {
                color: 'grey',
                fillColor: 'gold',
                fillOpacity: Opacity,
                radius: (quakes3[i].mag * radMultiplier),
                weight: weight
            }).bindPopup(`ID: ${quakes3[i].id} </br> Magnitude: ${quakes3[i].mag} </br> Location: ${quakes3[i].coords}`)
        )
    };
    for (i = 0; i < quakes4.length; i++) {
        quakeMarkers4.push(

            L.circle(quakes4[i].coords, {
                color: 'grey',
                fillColor: 'goldenrod',
                fillOpacity: Opacity,
                radius: (quakes4[i].mag * radMultiplier),
                weight: weight
            }).bindPopup(`ID: ${quakes4[i].id} </br> Magnitude: ${quakes4[i].mag} </br> Location: ${quakes4[i].coords}`)
        )
    };
    for (i = 0; i < quakes5.length; i++) {
        quakeMarkers5.push(

            L.circle(quakes5[i].coords, {
                color: 'grey',
                fillColor: 'orange',
                fillOpacity: Opacity,
                radius: (quakes5[i].mag * radMultiplier),
                weight: weight
            }).bindPopup(`ID: ${quakes5[i].id} </br> Magnitude: ${quakes5[i].mag} </br> Location: ${quakes5[i].coords}`)
        )
    };
    for (i = 0; i < quakes6.length; i++) {
        quakeMarkers6.push(

            L.circle(quakes6[i].coords, {
                color: 'grey',
                fillColor: 'red',
                fillOpacity: Opacity,
                radius: (quakes6[i].mag * radMultiplier),
                weight: weight
            }).bindPopup(`ID: ${quakes6[i].id} </br> Magnitude: ${quakes6[i].mag} </br> Location: ${quakes6[i].coords}`)
        )
    };


    // Create a baseMaps object
    var baseMaps = {
        "Street Map": streetmap,
        "Light Map": lightmap
    };

    var quakeLayer1 = L.layerGroup(quakeMarkers1);
    var quakeLayer2 = L.layerGroup(quakeMarkers2);
    var quakeLayer3 = L.layerGroup(quakeMarkers3);
    var quakeLayer4 = L.layerGroup(quakeMarkers4);
    var quakeLayer5 = L.layerGroup(quakeMarkers5);
    var quakeLayer6 = L.layerGroup(quakeMarkers6);
    
    // Create an overlay object
    var overlayMaps = {
        "Quakes < Magnitued 1": quakeLayer1,
        "Quakes < Magnitued 2": quakeLayer2,
        "Quakes < Magnitued 3": quakeLayer3,
        "Quakes < Magnitued 4": quakeLayer4,
        "Quakes < Magnitued 5": quakeLayer5,
        "Quakes Magnitued 5+": quakeLayer6
    };


    var myMap = L.map("map", {
        center: [37.09, -95.71],
        zoom: 3,
        layers: [streetmap, quakeLayer1, quakeLayer2,quakeLayer3,quakeLayer4,quakeLayer5,quakeLayer6]
      });

    //add legend
    var legend = L.control({ position: 'bottomright' });

    legend.onAdd = function (myMap) {

        var div = L.DomUtil.create('div', 'info legend'),
            quakeKey = [0, 1, 2, 3, 4, 5],
            quakeColors = ['green', 'greenyellow', 'gold', 'goldenrod', 'orange', 'red'];

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < quakeKey.length; i++) {
            div.innerHTML +=
                '<i style="background:' + quakeColors[i] + '"></i> ' +
                quakeKey[i] + (quakeKey[i + 1] ? '&ndash;' + quakeKey[i + 1] + '<br>' : '+');
        }

        return div;

    };
    L.control.layers(baseMaps, overlayMaps, {collapsed: false}).addTo(myMap)
    legend.addTo(myMap);

 
    quakeLayer1.bindPopup(quakeMarkers1.id + "<br> Capacity: " + quakeMarkers1.mag + "<br>" + quakeMarkers1.coords + " Bikes Available");


    for (i=0;i>quakeMarkers1.length;i++) {
        quakeMarkers1[i].bindPopup(quakeMarkers1.id)
    }
})