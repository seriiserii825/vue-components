<script setup>
import {computed} from "@vue/runtime-core";

const props = defineProps({
  type: {
    type: String,
    required: false,
  },
});

const iconColor = computed(() => {
  switch (props.type) {
    case 'success':
      return '#65B244';
    case 'warning':
      return '#FFC107';
    case 'error':
      return '#FF5722';
    case 'white':
      return '#fff';
    case '':
      return '#464F69';
    default:
      return '#464F69';
  }
});
</script>
<template>
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
        d="M26 5H6C5.44772 5 5 5.44772 5 6V26C5 26.5523 5.44772 27 6 27H26C26.5523 27 27 26.5523 27 26V6C27 5.44772 26.5523 5 26 5Z"
        :stroke="iconColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M22 3V7" :stroke="iconColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10 3V7" :stroke="iconColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M5 11H27" :stroke="iconColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M20.5 16L14.6625 21.5L11.5 18.5" :stroke="iconColor" stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round"/>
  </svg>
</template>