<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
})
</script>
<template>
  <div class='title-with-bg'>
    <h2 class="title-with-bg__title">{{ title }}</h2>
  </div>
</template>
<style lang="scss" scoped>
.title-with-bg {
  padding: 3.2rem;
  background: var(--accent-light);
  border-radius: 1.6rem;
  &__title {
    font-size: 3.2rem;
    font-weight: 600;
  }
}
</style>