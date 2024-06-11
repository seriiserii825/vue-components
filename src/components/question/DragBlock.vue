<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  double: {
    type: Boolean,
    required: false
  },
});

function log() {
  console.log('log');
}
</script>
<template>
  <div
      class='drag-block'
      :class="{'drag-block--double': double}"
  >
    <h3 class="draggable-box__title">{{ title }}</h3>
    <slot></slot>
  </div>
</template>
<style lang="scss">
.drag-block {
  padding: 3.2rem;
  background: var(--contrast);
  border-radius: 1.6rem;
  &.drag-block--double {
    .list-group {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -1.6rem;
      @media screen and (max-width: 768px) {
        display: block;
        margin: 0;
      }
      .drag-item {
        margin: 0 1.6rem 1.6rem;
        flex: 0 0 calc(50% - 3.2rem);
        @media screen and (max-width: 768px) {
          margin: 0 0 1.6rem;
        }
      }
    }
  }
}
</style>