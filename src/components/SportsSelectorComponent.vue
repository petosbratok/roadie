<template>
    <div class="sports-selector">
        <div class="option active">
            <font-awesome-icon 
            class="icon" 
            icon="fa-solid fa-person-biking" 
            style="--fa-primary-color: limegreen;"
            />
        </div>
        <div class="separator">
            <span>both</span>
        </div>
        <div class="option">
            <font-awesome-icon class="icon" icon="fa-solid fa-person-running" />
        </div>

    </div>
</template>

<script>
    export default {
    name: 'SportsSelectorComponent'
    }
</script>

<style>
    .sports-selector {
        height: 100%;
        width: 100%;
        padding: 12px 0;
        border-radius: 16px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }

    .sports-selector .option {
        text-transform: uppercase;
    }

    .separator {
        text-transform: uppercase;
        font-size: 0.6em;
        letter-spacing: -.5px;
    }
    
    .icon {
        font-size: 1.25em;
    }

    .option .active {
        background-color: red;
    }
</style>