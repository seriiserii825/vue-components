<script setup>
</script>
<template>
  <div class='body'>
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped>
.body {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 85vh;
  background: #fff;
  border-radius: 1.6rem;
  box-shadow: 0 0.4rem 1.6rem rgba(0, 0, 0, 0.1);
  z-index: 1;
}
</style>