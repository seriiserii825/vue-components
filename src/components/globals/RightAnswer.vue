<script setup>

</script>
<template>
<div class='right-answer'>
  <slot></slot>
</div>
</template>
<style lang="scss">
.right-answer {
  padding: 3.2rem;
  background: var(--accent-light);
  border-radius: 16px;
  &__text {
    margin-top: 3.2rem;
    font-size: 2rem;
  }
}
</style>