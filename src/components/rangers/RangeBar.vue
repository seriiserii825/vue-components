<script setup>
import {computed} from "@vue/runtime-core";
const props = defineProps({
  success: {
    type: Boolean,
    required: true
  },
  percentage: {
    type: Number,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: false
  },
  value: {
    type: Number,
    required: true
  },
  filled: {
    type: Boolean,
    required: false
  },
});
const bar_width = computed(() => {
  if (props.filled) {
    return "100%";
  } else {
    return props.percentage + "%";
  }
});
</script>
<template>
  <div
      class='range-bar'
      :class="{'range-bar--error': !success}"
  >
    <header class="range-bar__header">
      <div class="range-bar__left">
        <strong>{{ value }}</strong>
        <span>{{ label }}</span>
      </div>
      <div class="range-bar__right">
        <strong>{{ percentage.toFixed(1) }}</strong>
        <span>%</span>
      </div>
    </header>
    <div class="range-bar__body">
      <div
          :style="`width: ${bar_width};`"
          class="range-bar__bar"
          :class="{'range-bar__bar--left': filled}"
      >
        <span v-if="title">{{ title }}</span>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.range-bar {
  &--error {
    .range-bar__left,
    .range-bar__right {
      strong {
        color: var(--error-light);
      }
    }
    .range-bar__bar {
      background: var(--error-light);
    }
  }
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.6rem;
  }
  &__left {
    font-size: 1.6rem;
    font-weight: 500;
    strong {
      margin-right: 0.8rem;
      font-size: 1.6rem;
      color: var(--accent);
    }
  }
  &__right {
    font-size: 1.6rem;
    font-weight: 500;
    strong {
      margin-right: 0.8rem;
      color: var(--accent);
    }
  }
  &__body {
    width: 100%;
    height: 5.6rem;
    background: #D1F4EE;
    border-radius: 16px;
    overflow: hidden;
  }
  &__bar {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 3.2rem;
    height: 100%;
    font-size: 2rem;
    font-weight: 600;
    color: white;
    background: var(--accent);
    border-radius: 16px;
    &.range-bar__bar--left {
      justify-content: flex-start;
    }
  }
}
</style>