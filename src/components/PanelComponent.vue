<template>
    <div class="panel">
        <!-- <div class="distance-container">
            <p class="distance">1200km</p>    
        </div> -->
        <div class="cell distance">
            <span class="value">1200</span>
            <span class="regular">km</span>
        </div>
        <div class="cell speed">
            <div>
                <span class="value">31.1</span>
                <span class="regular">km/h</span>
            </div>
            <div>
                <span>avg speed</span>
            </div>
        </div>
        <div class="cell sportsSelector">
            <SportsSelectorComponent></SportsSelectorComponent>            
        </div>
        <div class="cell time">
            <span class="value">44</span>
            <span class="regular">hours</span>
        </div>
        <div class="cell sessionCount">
            <span class="value">45</span>
            <span class="regular">sessions</span>
        </div>
        <div class="cell charts">charts</div>
        <div class="cell map">map</div>
    </div>
</template>

<script lang="ts">
    // import GeneralStatsComponent from './GeneralStatsComponent.vue'
    import SportsSelectorComponent from './SportsSelectorComponent.vue'

    export default {
    name: 'PanelComponent',
    components: {
        // GeneralStatsComponent,
        SportsSelectorComponent
    }
    }
</script>

<style>

.panel {
    padding: 20px;
    height: calc(100vh - 120px);
    gap: 20px;
}

.panel {  
    display: grid;
    grid-template-columns: 1fr 1.1fr 1.1fr 0.6fr 1.2fr 1.7fr;
    grid-template-rows: 80px 80px 1fr 1fr 1fr 1fr;
    grid-auto-columns: 1fr;
    grid-auto-flow: row;
    grid-template-areas:
    "distance distance speed speed speed sportsSelector"
    "time time speed speed speed sportsSelector"
    "sessionCount sessionCount sessionCount charts charts charts"
    "map map map charts charts charts"
    "map map map charts charts charts"
    "map map map charts charts charts";
}

.distance { 
    grid-area: distance;
    background: #D34E24 !important;
}

.sportsSelector { 
    grid-area: sportsSelector;
    background: #3D348B  !important;
}

.time { 
    grid-area: time;
    background: #31AFD4 !important;
}

.sessionCount { 
    grid-area: sessionCount;
    background: #EF476F !important;
}

.charts { 
    grid-area: charts;
    background: #3B1F2B !important;
}

.map { grid-area: map; }

.speed { 
    grid-area: speed;
    background: #E6AF2E !important;
}


.cell {
    background-color: darkslategrey;
    border-radius: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.25em;
}

.speed {
    flex-direction: column;
}

.value {
    position: relative;
    z-index: 2;
    font-size: 1.25em;
    font-weight: bold;
}

.unit {
    /* display: inline-block;
    padding-top: 5px;
    margin-left: 2px;
    font-size: 0.75em; */
}

.regular {
    display: inline-block;
    /* padding-top: 5px; */
    margin-left: 6px;
}
</style>