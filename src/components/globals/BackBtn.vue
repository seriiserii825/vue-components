<script setup>
</script>
<template>
  <div class='back-btn'>
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M27 16H5" stroke="#464F69" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round"/>
      <path d="M14 7L5 16L14 25" stroke="#464F69" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round"/>
    </svg>
  </div>
</template>
<style lang="scss" scoped>
.back-btn {
  width: 5rem;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #D1F4EE;
  border-radius: 50%;
  cursor: pointer;
  transition: all .4s;
  &:hover {
    background: #c0ded4;
  }
}
</style>