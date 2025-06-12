<script setup>
import { computed } from "vue";
const emits = defineEmits(["update:radio"]);

const props = defineProps({
  label: String,
  name: String,
  id: [String, Number],
  radio: [String, Number],
  checked: {
    type: Boolean,
    default: false
  }
});

const isActive = computed(() => props.radio === props.id);
</script>

<template>
  <div :class="{ 'active': isActive }" class="radio prevent-select">
    <input
      :name="name"
      type="radio"
      :id="id"
      :checked="checked"
      :value="id"
      @change="() => emits('update:radio', id)" />
    <label :for="id">{{ label }}</label>
  </div>
</template>
