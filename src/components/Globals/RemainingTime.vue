<script setup>
import { computed } from "@vue/runtime-core";

const props = defineProps({
  time: {
    type: Number,
    required: false,
  },
});

const minutes = computed(() => {
  const local_minutes = Math.floor(props.time / 60);
  return local_minutes < 10 ? `0${local_minutes}` : local_minutes;
});
const seconds = computed(() => {
  const local_seconds = props.time % 60;
  return local_seconds < 10 ? `0${local_seconds}` : local_seconds;
});
</script>
<template>
  <div class="remaining-time">
    <span class="remaining-time__minutes"
      ><span>{{ minutes }}</span> min</span
    >
    <span class="remaining-time__seconds"
      ><span>{{ seconds }}</span> sec</span
    >
  </div>
</template>
<style lang="scss" scoped>
.remaining-time {
  font-size: 3.2rem;
  font-weight: 600;
  color: var(--wet-asphalt);
  &__minutes {
    display: inline-block;
    margin-right: 3.2rem;
  }
  &__minutes,
  &__seconds {
    span {
      display: inline-block;
      width: 32px;
    }
  }
  &__minutes {
    color: var(--accent);
  }
}
</style>