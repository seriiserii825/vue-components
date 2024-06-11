<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>
<template>
  <div class="form">
    <h2 class="form__title">{{ title }}</h2>
    <slot/>
  </div>
</template>
<style lang="scss">
.form {
  &__title {
    margin-bottom: 3.2rem;
    padding: 3.2rem;
    color: var(--text-color-light);
    border-bottom: 1px solid #D1F4EE;
  }
  &__group {
    margin-bottom: 1.6rem;
  }
}
</style>