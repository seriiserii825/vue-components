<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    required: true
  },
  width: {
    type: String,
    required: false
  }
});
</script>
<template>
  <div
      class='info-box'
      :style="`width: ${width};`"
  >
    <span>{{ label }}</span>
    <div class="info-box__count">{{ value }}</div>
  </div>
</template>
<style lang="scss" scoped>
.info-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  height: 7.2rem;
  border: 1px solid #8FE1D2;
  border-radius: 1.8rem;
  span {
    padding-left: 2.2rem;
    font-size: 1.6rem;
    font-weight: 700;
  }
  &__count {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0 0 7.9rem;
    height: 100%;
    font-size: 1.6rem;
    font-weight: bold;
    color: var(--accent);
    border: 2px solid #65B244;
    border-radius: 16px;
  }
}
</style>