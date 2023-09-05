<template>
  <div :class="['map-container', isMinimized ? '' : 'expanded']">
    <div 
      id="map"
      :class="aminationOn ? 'hidden' : ''"
    ></div>
  </div>
  <button :class="['toggle-button', isMinimized ? '' : 'active']" @click="toggleMinimized">
    <span>+</span>
  </button>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import turf from 'turf';
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
      center: [30.45, 59.87],
      pitch: 35,
      bearing: -15,
      zoom: 10,
    });

    const polylineOptions = {
      color: '#BDD9BF',
      weight: 3,
      opacity: 0.5,
    };

    setTimeout(() => {
      this.data.forEach((encodedPolyline, index) => {
        const coordinates = decoder.decode(encodedPolyline).map(coord => [coord[1], coord[0]]);
        const sourceId = `polyline-source-${index}`;

        const geojson = {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'LineString',
                coordinates: coordinates,
              },
              properties: null,
            },
          ],
        };

        const simplified = turf.simplify(geojson, 0.0001, true);

        this.map.addSource(sourceId, {
          type: 'geojson',
          data: simplified,
        });

        this.map.addLayer({
          id: `polyline-layer-${index}`,
          type: 'line',
          source: sourceId,
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
  transition-duration: 450ms;
  overflow: hidden;
  border-radius: 16px;
  z-index: 3;
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
  font-size: 2em;
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

.hidden {
  opacity: 0;
}
</style>
