<script setup>
const props = defineProps({
  src: {
    type: String,
    default: "/images/logo.svg"
  },
});
</script>
<template>
  <div class="logo">
    <img :src="src" alt="logo">
  </div>
</template>
<style lang="scss" scoped>
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 18rem;
  background: #FFFFFF;
  border-bottom: 1px solid #D1F4EE;
  box-shadow: 0 0.4rem 12.8rem rgba(#101D1A, 0.2);
  border-radius: 1.6rem;
  padding: 2rem;
}
</style>