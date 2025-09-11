<script setup lang="ts">
defineProps({
  type: {
    type: String,
    default: "text",
  },
  label: {
    type: String,
    required: false,
    default: null,
  },
  placeholder: {
    type: String,
    required: false,
    default: null,
  },
  id: {
    type: String,
    required: true,
  },
  errors: {
    type: Array,
    required: false,
    default: () => [],
  },
});

const value = defineModel<string>("");
</script>
<template>
  <div class="input">
    <label v-if="label" :for="id">{{ label }}</label>
    <input :id="id" v-model="value" :name="id" :type="type" :placeholder="placeholder" />
    <div v-if="errors && errors.length" class="input__message input__message--error">
      <p v-for="(error, index) in errors" :key="index">{{ error }}</p>
    </div>
  </div>
</template>
<style lang="scss">
.input {
  position: relative;
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 1.6rem;
    font-weight: bold;
  }
  input {
    display: block;
    width: 100%;
    height: 3.1rem;
    font-size: 1.4rem;
    font-weight: 400;
    text-indent: 3.2rem;
    color: #495057;
    background: transparent;
    border: 1px solid #ccc;
    &.input--success {
      border-color: var(--success);
    }
    &.input--error {
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
