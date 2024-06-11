<script setup>
const emits = defineEmits(["emit_click"]);
const props = defineProps({
  id: {
    type: [Number, String],
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  checked: {
    type: Boolean,
    required: true,
  },
  preview: {
    type: Boolean,
    required: false,
    default: true,
  },
});
function clickHandler() {
  if (!props.preview) {
    emits("emit_click", props.id);
  }
}
</script>
<template>
  <div
      class="checkbox-item"
      :class="{
      'checkbox-item--checked': checked,
      'checkbox-item--hover': !preview,
    }"
      @click="clickHandler"
  >
    <div class="checkbox-item__square"></div>
    <div class="checkbox-item__title">{{ title }}</div>
  </div>
</template>
<style lang="scss" scoped>
.checkbox-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 1.6rem;
  font-size: 16px;
  font-weight: 600;
  color: #464f69;
  background: #d1f4ee;
  border-radius: 16px;
  transition: all .4s ease-out;
  &--checked {
    color: white;
    background: var(--accent);
    .checkbox-item__square {
      color: white;
      border-color: white;
      &::after {
        opacity: 1;
      }
    }
  }
  &--hover {
    cursor: pointer;
  }
  &__square {
    position: relative;
    margin-right: 1.6rem;
    flex: 0 0 2rem;
    height: 2rem;
    border: 1px solid #464f69;
    border-radius: 4px;
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: block;
      width: 1.2rem;
      height: 1.2rem;
      background: #ffffff;
      border-radius: 2px;
      opacity: 0;
    }
  }
}
</style>