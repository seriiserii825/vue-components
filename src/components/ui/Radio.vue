<script setup>
import { computed } from "vue";
const emits = defineEmits(["update:radio"]);

const props = defineProps({
  label: String,
  name: String,
  id: [String, Number],
  radio: [String, Number],
});

const isActive = computed(() => props.radio === props.id);
</script>

<template>
  <div :class="{ 'active': isActive }" class="radio prevent-select">
    <input
      :name="name"
      type="radio"
      :id="id"
      :checked="isActive"
      :value="id"
      @change="() => emits('update:radio', id)" />
    <label :for="id">{{ label }}</label>
  </div>
</template>
<style lang="scss">
.radio {
  input[type="radio"] {
    display: none;
    &:checked + label {
      border-color: var(--accent);
      &::after {
        opacity: 1;
      }
    }
  }
  label {
    position: relative;
    display: inline-block;
    padding: 1.6rem 1.6rem 1.6rem 6rem;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    cursor: pointer;
    &::before {
      content: "";
      position: absolute;
      top: 1.3rem;
      left: 1.6rem;
      display: block;
      width: 2.6rem;
      height: 2.6rem;
      border-radius: 50%;
      border: 1px solid var(--accent);
    }
    &::after {
      content: "";
      position: absolute;
      top: 2rem;
      left: 2.3rem;
      display: block;
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 50%;
      background: var(--accent);
      transition: all 0.4s;
      opacity: 0;
    }
  }
}
</style>
