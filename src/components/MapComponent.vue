<template>
  <div :class="['map-container', isMinimized ? '' : 'expanded']">
    <div 
      id="map"
    ></div>
  </div>
  <button 
    :class="['toggle-button', isMinimized ? '' : 'active']" 
    @click="toggleMinimized"
  >
    <span>
      <font-awesome-icon :icon="['fas', 'plus']" />
    </span>
  </button>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ref } from 'vue'

export default {
  name: 'MapComponent',
  props: ['data'],
  data() {
    return {
      isMinimized: true,
      map: null,
      animationOn: ref(false),
    };
  },
  methods: {
    toggleMinimized() {
      this.isMinimized = !this.isMinimized;
      this.resizeMap();
    },
    resizeMap() {
      if (this.map) {
        this.animationOn = true;
        setTimeout(() => {
          this.map.resize();  
          this.animationOn = false;        
        }, 450);
      }
    },
  },
  async mounted() {
  const decoder = require('@mapbox/polyline');
  const mapbox_token =
    'pk.eyJ1IjoicGV0b3NicmF0b2siLCJhIjoiY2wxdWtnNjM5MDB2ZzNkbDNzNzV2MThnbCJ9.--UWf-pthCKugxhxF4kmbQ';

  mapboxgl.accessToken = mapbox_token;

  const mapboxStyle = 'mapbox://styles/petosbratok/cl1ukjde8000514ltcfj80eto';

  this.map = new mapboxgl.Map({
    container: 'map',
    style: mapboxStyle,
    center: [30.41, 59.88],
    pitch: 35,
    bearing: -15,
    zoom: 10.5,
    antialias: true,
  });

  const polylineOptions = {
    color: '#BDD9BF',
    weight: 3,
    opacity: 0.35,
  };

  this.map.on('load', () => {
    let dataIndex = 0;

    const addNextGroupedSource = () => {
      const groupedFeatures = [];

      for (let i = 0; i < 50 && dataIndex < this.data.length; i++) {
        const encodedPolyline = this.data[dataIndex];
        const coordinates = decoder.decode(encodedPolyline).map(coord => [coord[1], coord[0]]);

        const feature = {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: coordinates,
          },
          properties: {
            id: dataIndex,
          },
        };

        groupedFeatures.push(feature);
        dataIndex++;
      }

      if (groupedFeatures.length > 0) {
        const sourceId = `polyline-source-${dataIndex}`;
        const layerId = `polyline-layer-${dataIndex}`;

        this.map.addSource(sourceId, {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: groupedFeatures,
          },
        });

        this.map.addLayer({
          id: layerId,
          type: 'line',
          source: sourceId,
          paint: {
            'line-color': polylineOptions.color,
            'line-width': polylineOptions.weight,
            'line-opacity': polylineOptions.opacity,
          },
        });

        // Continue adding sources until there is no more data
        if (dataIndex < this.data.length) {
          addNextGroupedSource();
        }
      }
    };

    // Start adding sources
    addNextGroupedSource();

    this.map.addLayer({
      'id': 'add-3d-buildings',
      'source': 'composite',
      'source-layer': 'building',
      'filter': ['==', 'extrude', 'true'],
      'type': 'fill-extrusion',
      'minzoom': 12,
      'paint': {
        'fill-extrusion-color': '#aaa',
        'fill-extrusion-height': [
          'interpolate',
          ['linear'],
          ['zoom'],
          12,
          0,
          12.05,
          ['get', 'height']
        ],
        'fill-extrusion-base': [
          'interpolate',
          ['linear'],
          ['zoom'],
          12,
          0,
          12.05,
          ['get', 'min_height']
        ],
        'fill-extrusion-opacity': 0.6
      }
      },
    );
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
  transition-duration: 450ms;
  overflow: hidden;
  border-radius: 16px;
  z-index: 3;
  background: var(--dark-blue);
}

.expanded {
  position: relative;
  margin-left: calc(-50vw + 5px);
  margin-top: calc(44px);
  height: calc(100vh - 140px);
  width: 100vw;
  transition-duration: 450ms;
}

#map {
  width: 100vw;
  height: 100vh;
}

.toggle-button {
  font-size: 1.25em;
  position: absolute;
  top: 204px;
  right: 20px; 
  background: none;
  background: var(--dark-blue);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  z-index: 4;
  transition-duration: 450ms;
  padding-top: 2px;
}

.toggle-button span {
  transition-duration: 450ms;
}

.active span  {
  transform: rotate(45deg);
}

.active {
  top: 20px;
}

#map {
  transition-duration: .1s;
}
</style>
