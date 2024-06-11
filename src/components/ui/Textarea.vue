<script setup>
import {computed} from "@vue/runtime-core";

const props = defineProps({
  label: {
    type: String,
    required: false,
  },
  placeholder: {
    type: String,
    required: false,
  },
  id: {
    type: String,
    required: false,
  },
  errors: {
    type: Array,
    required: false,
  },
  value: {
    type: [String, Number],
    required: false
  }
});

const propsValue = computed(() => {
  return props.value;
});

const emits = defineEmits(['update:value']);

function changeHandler(e) {
  let value = e.target.value;
  emits('update:value', value);
}
</script>
<template>
  <div class="textarea">
    <label v-if="label" :for="id">{{ label }}</label>
    <textarea
        :id="id"
        :placeholder="placeholder !== undefined ? placeholder : null"
        :value="propsValue"
        @input="changeHandler"
    ></textarea>
    <div v-if="errors && errors.length" class="textarea__message textarea__message--error">
      <p v-for="error in errors" :key="error.$uid">{{ error.$message }}</p>
    </div>
  </div>
</template>
<style lang="scss">
.textarea {
  position: relative;
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 1.6rem;
    font-weight: bold;
  }
  textarea {
    display: block;
    padding-top: 1.6rem;
    width: 100%;
    height: 10.2rem;
    font-size: 1.4rem;
    font-weight: 400;
    text-indent: 3.2rem;
    color: #495057;
    background: #E6FFFA;
    border: 1px solid #D1F4EE;
    border-radius: 1.6rem;
    &.textarea--success {
      border-color: var(--success);
    }
    &.textarea--error {
      border-color: var(--error);
    }
  }
  &__message {
    margin-top: 0.6rem;
    font-size: 1.2rem;
    color: var(--error);
  }
}
</style>
