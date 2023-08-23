<template>
    <div class="slider-container">
        <div 
            class="slider" 
            :style="{ left: offsetLeft }"
            :class="{ animationOn: animationOn }"
            @touchstart="onTouchStart"
            @touchmove="onTouchMove"
            @touchend="onTouchEnd"
        >
            <div
                class="slider-item"
                :class="{ active: index === middleIndex }"
                v-for="(year, index) in years"
                :key="year"
                @click="selectYear(index)"
            >
                {{ year }}
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
    import { ref } from 'vue';

    var animationOn = ref(false);
    const endYear = 2019;
    const offsetStep = -79.6;    
    const years = ref(["All"]);
    for (let year = new Date().getFullYear(); year >= endYear; year--) {
        years.value.push(year.toString());
    }

    const middleIndex = ref(0);
    const offsetLeft = ref("0");

    function selectYear(index) {
        console.log("HI");
        console.log(index);
        animationOn.value = true;
        middleIndex.value = index;
        offsetLeft.value = `calc(${(index) * offsetStep}px)`;
        console.log(offsetLeft.value)
        setTimeout(() => {
            animationOn.value = false;
            console.log(offsetLeft.value)            
        }, 300);
    }

    let isTouching = ref(false);
    let touchStartX = ref(0);
    let touchCurrentX = ref(0);
    let touchStartOffset = ref(0);

    function extractNumericValue(str) {
        const match = /([+-]?\d+(\.\d+)?)px/.exec(str);
        return match ? parseFloat(match[1]) : 0;
    }

    function onTouchStart(event) {
        if (animationOn.value) return;
        touchStartX.value = event.touches[0].clientX;
        touchCurrentX.value = touchStartX.value;
        touchStartOffset.value = extractNumericValue(offsetLeft.value);
    }

    function onTouchMove(event) {
        isTouching.value = true;

        touchCurrentX.value = event.touches[0].clientX;
        const deltaX = touchCurrentX.value - touchStartX.value;
        let newOffset = touchStartOffset.value + deltaX;
        newOffset = Math.max(
            offsetStep * (years.value.length - 1) - 16, 
            newOffset
        );
        newOffset = Math.min(16, newOffset);
        offsetLeft.value = `calc(${newOffset}px)`;

        const middlePos = window.innerWidth / 2;
        let minDistance = 9999;
        let closestYearIndex = 0;
        years.value.forEach((_, index) => {
            const sliderItemPos = index * offsetStep + middlePos - newOffset;
            const distance = Math.abs(sliderItemPos - middlePos);

            if (distance < minDistance) {
                minDistance = distance;
                closestYearIndex = index;
            }
        });

        middleIndex.value = closestYearIndex;
    }

    function onTouchEnd() {
        if (isTouching.value) {
            selectYear(middleIndex.value)
        }
        isTouching.value = false;
    }
</script>
  
<script lang="ts">
    export default {
    name: 'YearSelectorComponent'
    }
</script>

<style scoped>
.slider-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
}
.slider {
    position: fixed;
    height: 60px;
    bottom: 0px;
    padding: 8px 0;
    padding-left: calc(50% - 52.8px);
    padding-right: 2000px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
    background: var(--dark-blue);
}

.slider-item {
    min-width: 72px;
    border: 1px solid white;
    border-radius: 12px;
    flex: 0 0 auto;
    padding: 4px 12px;
    margin: 4px;
    font-size: 20px;
    cursor: pointer;
    transition: .3s;
}

.slider-item.active {
    background-color: rgb(0, 153, 255);
    border-color: rgb(0, 153, 255);
    font-size: 28px;
    width: 98px;
    padding: 4.8px 16px;
    border-radius: 16px;
}

.animationOn {
    transition-duration: 0.3s;
    pointer-events: none;
}
</style>