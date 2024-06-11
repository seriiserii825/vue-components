<script setup>
const emits = defineEmits(['clicked_emit']);
import {ref} from "@vue/reactivity";

const clicked = ref(false);
const toggleClicked = () => {
  clicked.value = !clicked.value;
  emits("clicked_emit", clicked.value);
};
</script>
<template>
  <div class='show-more' @click="toggleClicked">
    <span>Leggi tutto</span>
    <svg :class="{reverse: clicked}" width="16" height="16" viewBox="0 0 16 16" fill="none"
         xmlns="http://www.w3.org/2000/svg">
      <path d="M13 6L8 11L3 6" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
</template>
<style lang="scss" scoped>
.show-more {
  display: flex;
  align-items: center;
  cursor: pointer;
  span {
    display: inline-block;
    margin-right: 0.6rem;
    font-size: 1.6rem;
    font-weight: 600;
    color: black;
  }
  svg {
    position: relative;
    transform: rotate(0);
    transition: all .4s;
    &.reverse {
      transform: rotate(-180deg);
    }
  }
}
</style>