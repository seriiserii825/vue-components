<script setup>
import {computed} from "@vue/runtime-core";

const props = defineProps({
  background_image: {
    type: String,
    required: true
  },
});

const backgroundStyle = computed(() => {
  return {
    background: `url(${props.background_image})`,
    backgroundSize: 'cover',
  }
});
</script>
<template>
  <div class='background' :style="backgroundStyle">
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped>
.background {
  min-height: 100vh;
}
</style>