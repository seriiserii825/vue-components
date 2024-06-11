<script setup>
import {ref} from "@vue/reactivity";

const props = defineProps({
  className: {
    type: String,
    default: '',
  },
})

const code = `<font-awesome-icon icon="${props.className}"/>`;
const copied = ref(false);
function copyToBuffer(){
  navigator.clipboard.writeText(code);
  copied.value = true;
}
</script>
<template>
<div @click="copyToBuffer" class='icons-view-item'>
  <div class="icons-view__wrap">
    <div class="icons-view__icon">
      <font-awesome-icon v-if="!copied" :icon="className"/>
      <span v-else>copied</span>
    </div>
  </div>
</div>
</template>
<style lang="scss" scoped>
.icons-view-item {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
  border: 1px solid #333;
  cursor: pointer;
  transition: all .4s;
  &:hover {
    color: white;
    background: #000;
  }
}
.icons-view__code {
  cursor: pointer;
}
</style>