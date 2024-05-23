<script setup>
import { ref } from "vue";
const emits = defineEmits(["emit_input"]);
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  disabled: {
    type: Boolean,
    required: true,
  },
});
const current_value = ref("");
const result_value = ref("");
const filled = ref(false);

function onInput(e) {
  if (current_value.value.length == 1) {
    if (!isNumberSymbol(e.data)) {
      current_value.value = "";
      return;
    }
    current_value.value = current_value.value.slice(0, 1);
    result_value.value = current_value.value;
    emits("emit_input", {
      index: props.index,
      value: result_value.value,
      backspace: false,
    });
  } else {
    current_value.value = result_value.value;
  }
}
function onKeydown(e) {
  if (e.key === "Backspace") {
    current_value.value = "";
    emits("emit_input", { index: props.index, value: "", backspace: true });
  }
}
function isNumberSymbol(s) {
  return /^[0-9]*$/.test(s);
}
function onChange() {
  if (current_value.value == "") {
    filled.value = false;
  } else {
    filled.value = true;
  }
}
</script>
<template>
  <input
    @input="onInput"
    @change="onChange"
    @keydown="onKeydown"
    v-model="current_value"
    type="text"
    :class="{ filled: filled }"
    :disabled="disabled"
    :name="name"
  />
</template>
