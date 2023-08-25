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
                :class="{ 
                    'active': index === middleIndex,
                    'active-search': index === middleIndex && !isTouching
                }"
                v-for="(year, index) in years"
                :key="year"
                @click="selectYear(index)"
            >
                <span>{{ year }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  emits: ['middle-index-changed'],
  name: 'YearSelectorComponent',
  data() {
    return {
      animationOn: false,
      offsetStep: -79.6,
      offsetLeft: '-79.6px',
      isTouching: false,
      touchStartX: 0,
      touchCurrentX: 0,
      touchStartOffset: 0,
      middleIndex: 1
    };
  },
  setup() {
    const endYear = 2019;
    const years = ref(['All']);
    onMounted(() => {
      const currentYear = new Date().getFullYear();
      for (let year = currentYear; year >= endYear; year--) {
        years.value.push(year.toString());
      }
    })

    return {
        years,
        endYear
    }
  },
  methods: {
    selectYear(index) {
        this.animationOn = true;
        this.middleIndex = index;
        this.offsetLeft = `calc(${index * this.offsetStep}px)`;
        this.$emit('middle-index-changed', this.years[index]);
        setTimeout(() => {
            this.animationOn = false;
        }, 300);
    },
    onTouchStart(event) {
      if (this.animationOn) return;
      this.touchStartX = event.touches[0].clientX;
      this.touchCurrentX = this.touchStartX;
      this.touchStartOffset = this.extractNumericValue(this.offsetLeft);
    },
    onTouchMove(event) {
      this.isTouching = true;

      this.touchCurrentX = event.touches[0].clientX;
      const deltaX = this.touchCurrentX - this.touchStartX;
      let newOffset = this.touchStartOffset + deltaX;
      newOffset = Math.max(
        this.offsetStep * (this.years.length - 1) - 16,
        newOffset
      );
      newOffset = Math.min(16, newOffset);
      this.offsetLeft = `calc(${newOffset}px)`;

      const middlePos = window.innerWidth / 2;
      let minDistance = 9999;
      let closestYearIndex = 0;
      this.years.forEach((_, index) => {
        const sliderItemPos = index * this.offsetStep + middlePos - newOffset;
        const distance = Math.abs(sliderItemPos - middlePos);

        if (distance < minDistance) {
          minDistance = distance;
          closestYearIndex = index;
        }
      });

      this.middleIndex = closestYearIndex;
    },
    onTouchEnd() {
      if (this.isTouching) {
        this.selectYear(this.middleIndex);
      }
      this.isTouching = false;
    },
    extractNumericValue(str) {
      const match = /([+-]?\d+(\.\d+)?)px/.exec(str);
      return match ? parseFloat(match[1]) : 0;
    }
  }
};
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
    padding-left: calc(50% - 55.8px);
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
    transition: 600ms;
    transition-property: all;
    user-select: none;
}

.slider-item.active {
    background-color: rgb(0, 153, 255);
    border-color: rgb(0, 153, 255);
}

.slider-item.active-search {
    font-size: 24px;
    min-width: 104px;
    padding: 4.8px 24px;
    border-radius: 16px;
}

.animationOn {
    transition-duration: 300ms;
}
</style>