<script setup>
import { computed, onMounted, ref } from "vue";

const emits = defineEmits(["emit_click", "emit_input"]);

const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
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
    required: false,
  },
  count: {
    type: Number,
    required: true,
  },
  button_text: {
    type: String,
    required: true,
  },
  is_valid: {
    type: Boolean,
    required: true,
  },
  only_digits: {
    type: Boolean,
    default: true,
  },
});

const current_input = ref("");
const current_placeholder = ref("");

const show_btn = ref(false);
const button_is_disabled = computed(() => {
  if (current_input.value.length === props.count) {
    current_input.value = current_input.value.trim();
  }
  return current_input.value.includes(" ");
});

function onInput(e) {
  if (props.only_digits) {
    if (current_input.value !== " " && isNumberSymbol(current_input.value)) {
      current_input.value = e.target.value;
      if (current_input.value.length > props.count) {
        current_input.value = current_input.value.slice(0, props.count);
      }
      show_btn.value = current_input.value.length === props.count;
      emits("emit_input", current_input.value);
    } else {
      current_input.value = current_input.value.slice(0, -1);
      emits("emit_input", current_input.value);
    }
  } else {
    if (current_input.value !== " ") {
      console.log("is chars");
      current_input.value = e.target.value;
      if (current_input.value.length > props.count) {
        current_input.value = current_input.value.slice(0, props.count);
      }
      show_btn.value = current_input.value.length === props.count;
      emits("emit_input", current_input.value);
    } else {
      current_input.value = current_input.value.slice(0, -1);
      emits("emit_input", current_input.value);
    }
  }
}

function isNumberSymbol(s) {
  return /^[0-9]*$/.test(s);
}

function emitClick() {
  if (current_input.value.length === props.count) {
    emits("emit_click", current_input.value);
  }
}
onMounted(() => {
  current_placeholder.value = "_".repeat(props.count);
});
</script>
<template>
  <div class="input-vat">
    <label v-if="label" :for="id">{{ label }}</label>
    <input
      :placeholder="current_placeholder"
      v-model="current_input"
      :id="id"
      @input="onInput"
      :name="id"
      :disabled="is_valid"
      :max="count" />
    <div class="input-vat__count">({{ current_input.length }}/{{ count }})</div>
    <div v-if="errors && errors.length" class="input__message input__message--error">
      <p v-for="error in errors" :key="error.$uid">{{ error.$message }}</p>
    </div>
    <button
      :disabled="button_is_disabled"
      v-if="button_text"
      @click="emitClick"
      class="input-vat__btn"
      :class="{ active: show_btn }">
      <svg
        v-if="is_valid"
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="17"
        viewBox="0 0 17 17"
        fill="none">
        <g clip-path="url(#clip0_1640_72)">
          <path
            d="M13.8125 5.3125H11.6875V3.71875C11.6875 2.87337 11.3517 2.06262 10.7539 1.46485C10.1561 0.867075 9.34538 0.53125 8.5 0.53125C7.65462 0.53125 6.84387 0.867075 6.2461 1.46485C5.64832 2.06262 5.3125 2.87337 5.3125 3.71875V5.3125H3.1875C2.90571 5.3125 2.63546 5.42444 2.4362 5.6237C2.23694 5.82296 2.125 6.09321 2.125 6.375V13.8125C2.125 14.0943 2.23694 14.3645 2.4362 14.5638C2.63546 14.7631 2.90571 14.875 3.1875 14.875H13.8125C14.0943 14.875 14.3645 14.7631 14.5638 14.5638C14.7631 14.3645 14.875 14.0943 14.875 13.8125V6.375C14.875 6.09321 14.7631 5.82296 14.5638 5.6237C14.3645 5.42444 14.0943 5.3125 13.8125 5.3125ZM6.375 3.71875C6.375 3.15516 6.59888 2.61466 6.9974 2.21615C7.39591 1.81763 7.93641 1.59375 8.5 1.59375C9.06359 1.59375 9.60409 1.81763 10.0026 2.21615C10.4011 2.61466 10.625 3.15516 10.625 3.71875V5.3125H6.375V3.71875Z"
            fill="white" />
        </g>
        <defs>
          <clipPath id="clip0_1640_72">
            <rect width="17" height="17" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <span v-else>{{ button_text }}</span>
    </button>
  </div>
</template>
<style lang="scss">
.input-vat {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 3.2rem;
  padding-right: 0.8rem;
  width: 100%;
  height: 6.3rem;
  background: white;

  input {
    display: block;
    width: 100%;
    height: 100%;
    font-size: 1.6rem;
    font-weight: 600;
    letter-spacing: 14px;
    color: black;
    background: transparent;
    border: none;
    outline: none;
    @media screen and (max-width: 576px) {
      letter-spacing: 8px;
    }
    &::placeholder {
      color: rgba(0, 0, 0, 0.2);
    }
  }
  &__count {
    position: relative;
    right: 1rem;
    color: rgba(0, 0, 0, 0.4);
  }

  &__message {
    margin-top: 0.6rem;
    font-size: 1.2rem;
    color: var(--error);
  }

  &__btn {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 3.2rem;
    width: auto;
    height: calc(100% - 1.6rem);
    font-size: 1.6rem;
    font-weight: 600;
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
    background: rgba(219, 43, 54, 0.18);
    cursor: pointer;
    transition: all 0.4s;

    &:hover {
      background: var(--accent);
    }

    &.active {
      background: var(--accent);
      border-color: var(--accent);
    }
  }
}
</style>
