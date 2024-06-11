<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  dark: {
    type: Boolean,
    required: false,
  },
  back: {
    type: Boolean,
    required: false,
  },
  full: {
    type: Boolean,
    required: false,
  },
  accent: {
    type: Boolean,
    required: false,
  },
  outline: {
    type: Boolean,
    required: false,
  },
  disabled: {
    type: Boolean,
    required: false,
  },
});
</script>
<template>
  <div
    class="button-icon"
    :class="{
      'button-icon--dark': dark,
      'button-icon--accent': accent,
      'button-icon--back': back,
      'button-icon--full': full,
      'button-icon--outline': outline,
      'button-icon--disabled': disabled,
    }"
  >
    <svg
      v-if="dark"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.5625 6.5625L4.6875 13.4375L1.25 10"
        stroke="white"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M18.75 6.5625L11.875 13.4375L10.0469 11.6094"
        stroke="white"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <svg
      v-else-if="back"
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="17.143"
    >
      <path
        d="M.316 7.816a1.066 1.066 0 0 0 0 1.516l5.356 5.355a1.073 1.073 0 0 0 1.516-1.515L3.655 9.645H13.93a1.073 1.073 0 0 0 0-2.145H3.66l3.524-3.527a1.073 1.073 0 1 0-1.516-1.52L.312 7.813Zm0 0"
        style="stroke: none; fill-rule: nonzero; fill: #fff; fill-opacity: 1"
      />
    </svg>
    <svg
      v-else-if="accent"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.5625 6.5625L4.6875 13.4375L1.25 10"
        stroke="white"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M18.75 6.5625L11.875 13.4375L10.0469 11.6094"
        stroke="white"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <svg
      v-else-if="outline"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.5625 6.5625L4.6875 13.4375L1.25 10"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M18.75 6.5625L11.875 13.4375L10.0469 11.6094"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <svg
      v-else
      width="16"
      height="12"
      viewBox="0 0 16 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.875 1.625L6.125 10.375L1.75 6"
        stroke="#464F69"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <span>{{ title }}</span>
  </div>
</template>
<style lang="scss" scoped>
.button-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 49%;
  height: 52px;
  font-size: 1.6rem;
  font-weight: 600;
  color: #464f69;
  background: #d1f4ee;
  border-radius: 16px;
  transition: all 0.4s;
  cursor: pointer;
  &--full {
    width: 100%;
  }
  &:hover {
    background: #8fe1d2;
  }
  &--back {
    color: white;
    background: var(--accent);
  }
  &--dark {
    color: white;
    background: #464f69;
    &:hover {
      background: #2b303a;
    }
  }
  &--outline {
    background: transparent;
    border: 1px solid #8fe1d2;
    &:hover {
      color: white;
      background: var(--accent);
      border-color: var(--accent);
      svg {
        stroke: white;
      }
    }
    svg {
      stroke: #464f69;
      transition: all 0.4s;
    }
  }
  &--accent {
    color: white;
    background: var(--accent);
    &:hover {
      background: var(--accent-hover);
    }
  }
  &--disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  svg {
    position: relative;
    top: 0.2rem;
    margin-right: 1rem;
  }
}
</style>