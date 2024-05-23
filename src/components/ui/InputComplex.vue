<script setup>
import { computed, onMounted, ref, watch } from "vue";

const emits = defineEmits(["emit_click"]);
import InputComplexItem from "./InputComplexItem.vue";

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
});

const current_input = ref("");

const show_btn = ref(false);

watch(
  () => current_input.value,
  (value) => {
    const input_without_spaces = current_input.value.replace(/\s/g, "");
    if (input_without_spaces.length === props.count) {
      show_btn.value = true;
    } else {
      show_btn.value = false;
    }
  }
);

function emitInput({ index, value, backspace }) {
  if (value === "" && backspace === true) {
    current_input.value =
      current_input.value.slice(0, index) +
      " " +
      current_input.value.slice(index + 1);
    const input_complex_all = document.querySelectorAll(
      ".input-complex__item input"
    );
    if (index > 1 && index < input_complex_all.length) {
      input_complex_all[index - 2].focus();
    } else if (index > 1 && index === input_complex_all.length) {
      input_complex_all[index - 2].focus();
    }
  } else if (backspace === true) {
    if (index === 1) {
      current_input.value =
        " ".repeat(props.count) +
        current_input.value.slice(index + 1, current_input.value.length);
    } else {
      current_input.value =
        current_input.value.slice(0, index) +
        " " +
        current_input.value.slice(index + 1);
    }
    const input_complex_all = document.querySelectorAll(
      ".input-complex__item input"
    );
    if (index > 1 && index < input_complex_all.length) {
      input_complex_all[index - 1].focus();
    }
  } else if (value !== "") {
    current_input.value =
      current_input.value.slice(0, index) +
      value +
      current_input.value.slice(index + 1);
    current_input.value.trim();
    const input_complex_all = document.querySelectorAll(
      ".input-complex__item input"
    );
    if (index < input_complex_all.length) {
      input_complex_all[index].focus();
    }
  }
}
const button_is_disabled = computed(() => {
  return current_input.value.includes(" ");
});
function emitClick() {
  emits("emit_click", current_input.value);
}
onMounted(() => {
  current_input.value = " ".repeat(props.count);
});
</script>
<template>
  <div class="input-complex">
    <label v-if="label" :for="id">{{ label }}</label>
    <div class="input-complex__wrap">
      <div v-for="item in count" :key="item" class="input-complex__item">
        <InputComplexItem
          :disabled="is_valid"
          :index="item"
          @emit_input="emitInput"
          :name="`item-${item}`"
        />
      </div>
    </div>
    <div
      v-if="errors && errors.length"
      class="input__message input__message--error"
    >
      <p v-for="error in errors" :key="error.$uid">{{ error.$message }}</p>
    </div>
    <button
      :disabled="button_is_disabled"
      v-if="button_text"
      @click="emitClick"
      class="input-complex__btn"
      :class="{ active: show_btn }"
    >
      <svg
        v-if="is_valid"
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="17"
        viewBox="0 0 17 17"
        fill="none"
      >
        <g clip-path="url(#clip0_1640_72)">
          <path
            d="M13.8125 5.3125H11.6875V3.71875C11.6875 2.87337 11.3517 2.06262 10.7539 1.46485C10.1561 0.867075 9.34538 0.53125 8.5 0.53125C7.65462 0.53125 6.84387 0.867075 6.2461 1.46485C5.64832 2.06262 5.3125 2.87337 5.3125 3.71875V5.3125H3.1875C2.90571 5.3125 2.63546 5.42444 2.4362 5.6237C2.23694 5.82296 2.125 6.09321 2.125 6.375V13.8125C2.125 14.0943 2.23694 14.3645 2.4362 14.5638C2.63546 14.7631 2.90571 14.875 3.1875 14.875H13.8125C14.0943 14.875 14.3645 14.7631 14.5638 14.5638C14.7631 14.3645 14.875 14.0943 14.875 13.8125V6.375C14.875 6.09321 14.7631 5.82296 14.5638 5.6237C14.3645 5.42444 14.0943 5.3125 13.8125 5.3125ZM6.375 3.71875C6.375 3.15516 6.59888 2.61466 6.9974 2.21615C7.39591 1.81763 7.93641 1.59375 8.5 1.59375C9.06359 1.59375 9.60409 1.81763 10.0026 2.21615C10.4011 2.61466 10.625 3.15516 10.625 3.71875V5.3125H6.375V3.71875Z"
            fill="white"
          />
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
.input-complex {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 3.2rem;
  padding-right: 0.8rem;
  height: 6.3rem;
  border-radius: 5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: #037597;

  &__wrap {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  &__item {
    flex: 0 0 2rem;
    margin-right: 0.8rem;

    input {
      width: 100%;
      font-size: 1.6rem;
      font-weight: 600;
      letter-spacing: 0.128rem;
      color: white;
      background: transparent;
      border: none;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      outline: none;

      &.filled,
      &:focus {
        border-bottom-color: transparent;
      }
      &::-webkit-inner-spin-button,
      &::-webkit-outer-spin-button {
        -webkit-appearance: none;
      }

      & {
        -moz-appearance: textfield;
      }
    }
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 1.6rem;
    font-weight: bold;
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
    letter-spacing: 0.016rem;
    color: rgba(255, 255, 255, 0.7);
    border-radius: 5rem;
    border: 1px solid rgba(255, 255, 255, 0.3);
    background: rgba(10, 77, 87, 0.18);
    cursor: pointer;
    transition: all 0.4s;

    &:hover {
      background: rgba(10, 77, 87, 0.3);
    }

    &.active {
      background: #0a4d57;
      border-color: #0a4d57;
    }
  }
}
</style>
