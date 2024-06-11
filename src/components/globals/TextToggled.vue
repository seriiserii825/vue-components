<script setup>
import {ref} from "@vue/reactivity";
import ShowMore from "./ShowMore.vue";

const text_is_visible = ref(false);
const toggleText = (value) => {
  text_is_visible.value = value;
};
</script>
<template>
  <div
      class='text-toggled'
      :class="['text', {'text--visible': text_is_visible}]">
    <slot></slot>
  </div>
  <ShowMore @clicked_emit="toggleText"/>
</template>
<style lang="scss" scoped>
.text-toggled {
  position: relative;
  margin-bottom: 2rem;
  height: 7.6rem;
  color: #464F69;
  transition: all .4s;
  overflow: hidden;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%);
  }
  &.text--visible {
    height: auto;
    &::after {
      display: none;
    }
  }
}
</style>