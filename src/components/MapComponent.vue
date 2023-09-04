<template>
    <div class="map-container">
      <div id="map"></div>
    </div>
  </template>
  
  <script>
  import mapboxgl from 'mapbox-gl';
  
  export default {
    name: 'MapComponent',
    props: ['data'],
    mounted() {
      const decoder = require('@mapbox/polyline');
      const mapbox_token = 'pk.eyJ1IjoicGV0b3NicmF0b2siLCJhIjoiY2wxdWtnNjM5MDB2ZzNkbDNzNzV2MThnbCJ9.--UWf-pthCKugxhxF4kmbQ';
  
      mapboxgl.accessToken = mapbox_token;
  
      const mapboxStyle = 'mapbox://styles/petosbratok/cl1ukjde8000514ltcfj80eto';
  
      const map = new mapboxgl.Map({
        container: 'map',
        style: mapboxStyle,
        // center: [59.97, 30.25],
        center: [30.25, 59.97],
        zoom: 10,
      });
  
      const polylineOptions = {
        color: '#BDD9BF',
        weight: 3,
        opacity: 0.7,
        smoothFactor: 2.5,
      };
  
      setTimeout(() => {
        this.data.forEach((encodedPolyline, index) => {
        //   const coordinates = decoder.decode(encodedPolyline);
          const coordinates = decoder.decode(encodedPolyline).map(coord => [coord[1], coord[0]]);
          const sourceId = `polyline-source-${index}`; // Generate a unique source ID
  
          const geojson = {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: coordinates,
            },
            properties: {}, // You can add properties here if needed
          };
  
          // Add the polyline to the map as a GeoJSON source
          map.addSource(sourceId, {
            type: 'geojson',
            data: geojson,
          });
  
          // Add a layer for the polyline
          map.addLayer({
            id: `polyline-layer-${index}`, // Generate a unique layer ID
            type: 'line',
            source: sourceId, // Use the generated source ID
            layout: {},
            paint: {
              'line-color': polylineOptions.color,
              'line-width': polylineOptions.weight,
              'line-opacity': polylineOptions.opacity,
            },
          });
        });
      }, 1000);
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
  