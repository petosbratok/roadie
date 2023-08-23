<template>
    <div class="stats">
        <div class="row">
            <p><span class="big-text">1200</span><span class="small-text">km</span> covered</p>
        </div>
        <div class="row">
            <p>AVG speed: <span class="big-text">32.9</span><span class="small-text">km/h</span></p>
        </div>
        <div class="row">
            <p>45 sessions</p>
            <!-- <div class="separator"></div> -->
        </div>
        <div class="row">
            <p>44 hours</p>
            <!-- <div class="separator"></div> -->
        </div>
    </div>
</template>

<script lang="ts">
    export default {
    name: 'GeneralStatsComponent'
    }
</script>

<style>
    .stats {
        display: flex;
        width: 100%;
        height: 100%;
        flex-direction: column;
        justify-content: center;
        padding: 16px;
    }

    p {
        font-size: 1.25em;
    }

    .stats .row {
        margin-bottom: 8px !important;
    }

    .big-text{ 
        font-size: 1.5em;
    }
    
    .small-text {
        display: inline-block;
        margin-left: 2px;
        font-size: 0.75em;
    }
</style>