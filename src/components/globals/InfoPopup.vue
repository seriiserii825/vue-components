<script setup>
const props = defineProps({
  title: {
    type: String,
    required: false
  },
  success: {
    type: Boolean,
    default: true
  },
  message: {
    type: String,
    required: false
  },
});
</script>
<template>
  <div class='info-popup'>
    <div class="info-popup__content">
      <h2 v-if="title" class="info-popup__title">{{ title }}</h2>
      <div v-if="message" :class="{'error': !success}" class="info-popup__text">{{ message }}</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.info-popup {
  position: fixed;
  top: 4rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 3.2rem;
  width: 30rem;
  border-radius: 1.6rem;
  box-shadow: 0 0.4rem 1.6rem rgba(0, 0, 0, 0.1);
  &__message {
    font-size: 1.6rem;
    color: var(--text-color);
    &.error {
      color: var(--error);
    }
  }
}
</style>