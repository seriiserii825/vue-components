<script setup>
</script>
<template>
  <div class='main-popup'>
    <div class="main-popup__body">
      <slot></slot>
    </div>
  </div>
</template>
<style lang="scss">
.main-popup {
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(8px);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 1000;
  &__body {
    padding: 3.2rem;
    width: 48rem;
    background: #fff;
    border-bottom: 1px solid #D1F4EE;
    box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, .2);
    border-radius: 16px;
    @media screen and (max-width: 576px) {
      width: 90%;
      padding: 2.4rem;
    }
  }
}
</style>