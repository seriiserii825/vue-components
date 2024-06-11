<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  footer_text: {
    type: String,
    required: true,
  },
  success: {
    type: Boolean,
    default: false,
  },
  logo_src: {
    type: String,
    required: false,
  },
});
</script>
<template>
  <div class='event-info'>
    <header class="event-info__header">
      <h2 class="event-info__title">{{ title }}</h2>
      <h3
          :class="{success: success}"
          class="event-info__subtitle"
      >{{ subtitle }}</h3>
    </header>
    <div class="event-info__body">
      <div v-if="logo_src" class="event-info__logo">
        <img :src="logo_src" :width="150" alt="">
      </div>
      <div class="event-info__text">{{ text }}</div>
      <footer class="event-info__footer">{{ footer_text }}</footer>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.event-info {
  width: 64rem;
  background: #fff;
  border-radius: 1.6rem;
  &__header {
    padding: 6.4rem;
    text-align: center;
    border-bottom: 1px solid #D1F4EE;
  }
  &__title {
    margin-bottom: 0.8rem;
    font-size: 2rem;
    color: #464F69;
  }
  &__subtitle {
    font-size: 3.2rem;
    font-weight: 600;
    color: var(--error);
    &.success {
      color: var(--success);
    }
  }
  &__body {
    padding: 6.4rem;
  }
  &__logo {
    margin-bottom: 3.2rem;
  }
  &__text {
    margin-bottom: 1.6rem;
    font-size: 3.2rem;
    font-weight: 600;
  }
  &__footer-text {
    font-size: 1.6rem;
  }
}
</style>