<script setup>
</script>
<template>
  <div class='base-layout'>
    <div class="base-layout__item">
      <slot name="left"></slot>
    </div>
    <div class="base-layout__item">
      <slot name="middle"></slot>
    </div>
    <div class="base-layout__item">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.base-layout {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 6.4rem;
  @media screen and (max-width: 1800px) {
    padding: 3.2rem;
  }
  @media screen and (max-width: 1200px) {
    display: block;
    padding: 3.2rem 0;
  }
  &__item {
    &:first-of-type {
      flex: 0 0 18rem;
      @media screen and (max-width: 1200px) {
        width: 18rem;
      }
      @media screen and (max-width: 1200px) {
        margin: 0 0 3.2rem;
      }
    }
    &:nth-of-type(2) {
      margin: 0 6.4rem;
      flex: 1;
      @media screen and (max-width: 1800px) {
        margin: 0 3.2rem;
      }
      @media screen and (max-width: 1200px) {
        margin: 0 0 3.2rem;
      }
    }
    &:last-of-type {
      flex: 0 0 48rem;
    }
  }
}
</style>