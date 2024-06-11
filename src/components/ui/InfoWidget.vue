<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  }
})
</script>
<template>
  <div class='info-widget' :style="{background: color}">
    <div class="info-widget__content">
      <h3 class="info-widget__title">{{ title }}</h3>
      <p>{{ subtitle }}</p>
      <router-link :to="url" class="info-widget__url">More info</router-link>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.info-widget {
  position: relative;
  padding: 2rem 2rem 6rem;
  color: white;
  border-radius: 0.4rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, .3);
  transition: all .4s;
  &__title {
    margin-bottom: 1rem;
  }
  &__url {
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 0.8rem;
    width: 100%;
    text-align: center;
    color: white;
    background: rgba(0, 0, 0, .5);
    transition: all .4s;
  }
}
</style>