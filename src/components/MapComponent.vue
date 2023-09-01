<template>
    <div class="map-container">
      <div id="map"></div>
    </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import PolylineEncoded from '../Polyline.encoded.js';
import L from 'leaflet';
import mapboxgl from 'mapbox-gl';

export default {
    name: 'MapComponent',
    components: {
    },
    mounted() {
        const mapbox_token = 'pk.eyJ1IjoicGV0b3NicmF0b2siLCJhIjoiY2wxdWtnNjM5MDB2ZzNkbDNzNzV2MThnbCJ9.--UWf-pthCKugxhxF4kmbQ';

        let mapboxScript = document.createElement('script')
        mapboxScript.setAttribute(
            'src', 
            'https://api.mapbox.com/mapbox.js/v3.3.1/mapbox.js'
        )
        document.head.appendChild(mapboxScript)

        let jqueryScript = document.createElement('script')
        jqueryScript.setAttribute(
            'src', 
            'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js'
        )
        document.head.appendChild(jqueryScript)

        // L.mapbox.accessToken = mapbox_token;
        // const map = L.mapbox.map('map')
        //     .setView([59.97, 30.25], 12)
        //     .addLayer(L.mapbox.styleLayer('mapbox://styles/petosbratok/cl1ukjde8000514ltcfj80eto'));

        mapboxgl.accessToken = mapbox_token;

        // Create a map instance
        const map = new mapboxgl.Map({
        container: 'map', // Specify the ID of the HTML element where the map will be placed
        // style: 'mapbox://styles/mapbox/streets-v11', // Specify the map style URL
        style: 'mapbox://styles/petosbratok/cl1ukjde8000514ltcfj80eto',
        center: [-74.006, 40.7128], // Specify the initial center of the map [longitude, latitude]
        zoom: 10, // Specify the initial zoom level
        });

    },
};
</script>

<style>
@import url('https://api.mapbox.com/mapbox.js/v3.3.1/mapbox.css');

.mapboxgl-control-container {
    display: none !important;
}

.map-container {
    width: 100%;
    height: 100%;
}

#map {
    width: 100%;
    height: 100%;
}
</style>