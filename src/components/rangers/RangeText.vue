<script setup>
const props = defineProps({
  title: {
    type: String,
    required: false
  },
  received: {
    type: Number,
    required: true
  },
  percentage: {
    type: Number,
    required: true
  },
  right_answer: {
    type: Boolean,
    required: false
  },
  full_width: {
    type: Boolean,
    default: false
  }
});
</script>
<template>
  <div
      class='range-text'
      :class="{
        'range-text--success': right_answer,
        'range-text--full': full_width
      }"
  >
    <div class="range-text__title">{{ title }}</div>
    <header class="range-text__header">
      <div class="range-text__left">
        <div class="range-text__value">{{ received }}</div>
        <div class="range-text__label">Risposte ricevute</div>
      </div>
      <div class="range-text__right">
        <div class="range-text__value">{{ percentage.toFixed(1) }}</div>
        <div class="range-text__label">%</div>
      </div>
    </header>
    <div class="range-text__bar">
      <div
          :style="{width: `${percentage}%`}"
          class="range-text__line"
          :class="{'success': right_answer}"
      ></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.range-text {
  padding: 3.2rem;
  background: #E6FFFA;
  border-radius: 16px;
  &.range-text--success {
    .range-text__value {
      color: #65B244;
    }
    .range-text__line {
      background: #65B244;
    }
  }
  &.range-text--full {
    width: 100%;
    background: transparent;
    .range-text__bar {
      background: #fff;
    }
  }
  &__title {
    margin-bottom: 1.6rem;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    color: #464F69;
  }
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.6rem;
  }
  &__left {
    display: flex;
  }
  &__right {
    display: flex;
  }
  &__value {
    margin-right: 0.8rem;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    color: #FF5A5A;
  }
  &__label {
    font-size: 1.6rem;
    font-weight: 500;
  }
  &__bar {
    position: relative;
    width: 100%;
    height: 8px;
    background: #D1F4EE;
    border-radius: 16px;
  }
  &__line {
    position: absolute;
    top: 0;
    left: 0;
    height: 8px;
    background: #FF5A5A;
    border-radius: 16px;
  }
}
</style>