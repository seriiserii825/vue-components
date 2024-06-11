<script setup>
</script>
<template>
  <div class="default-layout">
    <slot/>
  </div>
</template>
<style lang="scss">
.default-layout {
  position: relative;
  min-height: 100vh;
  background: url("/images/default-bg.jpg") no-repeat center center;
  background-size: cover;
  z-index: 1;
}
</style>
