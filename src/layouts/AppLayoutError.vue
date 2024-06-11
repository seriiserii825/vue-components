<script setup>
</script>

<template>
  <main class="app-layout-default-main p-2 bg-amber-50">
    <div class="error-layout">
      <slot/>
    </div>
  </main>
</template>
<style lang="scss" scoped>
.error-layout {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: rgba(red, 0.2);
}
</style>
