<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})
</script>
<template>
  <TransitionGroup name="list" tag="div">
    <div
        v-for="item in props.item"
        :key="item.id"
        class='alert'>
      <div class='alert__content'>
        <p>{{ item.text }}</p>
      </div>
    </div>
  </TransitionGroup>
</template>
<style lang="scss" scoped>
.alert {
  position: absolute;
  top: 3rem;
  right: 3rem;
  padding: 1.6rem;
  color: var(--error);
  background: #fff;
  border: 1px solid var(--error);
  border-radius: 1.6rem;
  box-shadow: 0 4px 1rem rgba(0, 0, 0, 0.2);
  z-index: 100000;
}
</style>