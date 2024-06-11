<script setup>
const emits = defineEmits(['emit_timer_click']);

function clickHandler() {
  emits('emit_timer_click');
}
</script>
<template>
  <div class='timer' @click="clickHandler">
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 5.625V10H14.375" stroke="#464F69" stroke-width="1.8" stroke-linecap="round"
            stroke-linejoin="round"/>
      <path
          d="M10 16.875C13.797 16.875 16.875 13.797 16.875 10C16.875 6.20304 13.797 3.125 10 3.125C6.20304 3.125 3.125 6.20304 3.125 10C3.125 13.797 6.20304 16.875 10 16.875Z"
          stroke="#464F69" stroke-width="1.8" stroke-miterlimit="10"/>
      <path d="M15.3047 2.04688L17.9531 4.69531" stroke="#464F69" stroke-width="1.8" stroke-linecap="round"
            stroke-linejoin="round"/>
      <path d="M2.04688 4.69531L4.69531 2.04688" stroke="#464F69" stroke-width="1.8" stroke-linecap="round"
            stroke-linejoin="round"/>
    </svg>
    <span>Impostare il timer</span>
  </div>
</template>
<style lang="scss" scoped>
.timer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 18.7rem;
  height: 5.2rem;
  font-size: 1.6rem;
  font-weight: 600;
  border: 1px solid #D1F4EE;
  border-radius: 1.6rem;
  transition: all .4s;
  cursor: pointer;
  &:hover {
    background-color: #D1F4EE;
  }
  svg {
    position: relative;
    top: 0.2rem;
    margin-right: 1rem;
  }
}
</style>