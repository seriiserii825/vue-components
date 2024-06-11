<script setup>
</script>
<template>
  <div class='header-navigation'>
    <div class="header-navigation__left">
      <slot name="left"></slot>
    </div>
    <div class="header-navigation__center">
      <slot name="center"></slot>
    </div>
    <div class="header-navigation__right">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.header-navigation {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3.2rem;
  z-index: 2;
  @media screen and (max-width: 576px) {
    display: block;
  }
  &__left,
  &__center,
  &__right {
    flex: 1;
  }
  &__left {
    @media screen and (max-width: 576px) {
      margin-bottom: 3.2rem;
      width: 100%;
    }
  }
  &__center {
    @media screen and (max-width: 576px) {
      flex: initial;
      width: 100%;
    }
  }
  &__right {
    display: flex;
    justify-content: flex-end;
    @media screen and (max-width: 576px) {
      flex: initial;
    }
  }
}
</style>