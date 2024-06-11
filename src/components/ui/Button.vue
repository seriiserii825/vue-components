<script setup>
const emits = defineEmits(['click_emit']);
const props = defineProps({
  outline: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    required: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  hidden: {
    type: Boolean,
    default: false
  },
  small: {
    type: Boolean,
    default: false
  },
  router_link: {
    type: String,
    required: false
  },
  external_link: {
    type: String,
    required: false
  },
  red_color: {
    type: Boolean,
    required: false
  }
});
const color_class = props.color ? `btn--${props.color}` : null;
const text_class = props.red_color ? 'text--red' : null;
const classes = ['btn', text_class, color_class, {'btn--outline': props.outline}, {'btn--small': props.small},
  {'btn--hidden': props.hidden}];
</script>
<template>
  <router-link
      v-if="router_link"
      :class="classes"
      :to="router_link">
    <slot></slot>
  </router-link>
  <a
      v-else-if="external_link"
      :class="classes"
      :href="external_link"
      target="_blank">
    <slot></slot>
  </a>
  <button
      v-else
      :class="classes"
      :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>
<style lang="scss">
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 2rem;
  width: 100%;
  height: 5.2rem;
  font-size: 1.6rem;
  font-weight: 600;
  color: white;
  background: var(--accent);
  border-radius: 1.6rem;
  border: 1px solid var(--accent);
  transition: all 0.4s;
  &.text--red {
    color: var(--error) !important;
  }
  svg {
    margin-right: 1rem;
  }
  &:hover {
    cursor: pointer;
    background: var(--accent-hover);
  }
  &.btn--small {
    display: inline-flex;
    width: auto;
  }
  &__link {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    svg {
      margin-right: 1rem;
    }
  }
  &.btn--contrast {
    color: #464F69;
    background: var(--contrast);
    border: 1px solid var(--contrast);
    &:hover {
      background: var(--contrast-hover);
      border: 1px solid var(--contrast);
    }
    &.btn--outline {
      background: transparent;
      color: black;
      border: 1px solid var(--contrast);
      &:hover {
        color: white;
        background: var(--contrast-hover);
        border-color: var(--contrast);
      }
    }
  }
  &.btn--pink {
    color: #fff;
    background: var(--pink);
    border: 1px solid var(--pink);
    &:hover {
      background: var(--pink-hover);
      border: 1px solid var(--pink);
    }
    &.btn--outline {
      background: transparent;
      color: black;
      border: 1px solid var(--pink);
      &:hover {
        color: white;
        background: var(--pink-hover);
        border-color: var(--pink);
      }
    }
  }
  &.btn--primary {
    color: white;
    background: var(--primary);
    border: 1px solid var(--primary);
    &:hover {
      background: var(--primary-hover);
      border: 1px solid var(--primary);
    }
    &.btn--outline {
      background: transparent;
      color: black;
      border: 1px solid var(--primary);
      &:hover {
        color: white;
        background: var(--primary-hover);
        border-color: var(--primary);
      }
    }
  }
  &.btn--success {
    color: white;
    background: var(--success);
    border: 1px solid var(--success);
    &:hover {
      background: var(--success-hover);
      border: 1px solid var(--primary);
    }
    &.btn--outline {
      background: transparent;
      color: black;
      border: 1px solid var(--success);
      &:hover {
        color: white;
        background: var(--success-hover);
        border-color: var(--success);
      }
    }
  }
  &.btn--wet-asphalt {
    color: white;
    background: var(--wet-asphalt);
    border: 1px solid var(--wet-asphalt);
    &:hover {
      background: var(--wet-asphalt-hover);
      border: 1px solid var(--wet-asphalt-hover);
    }
  }
  &.btn--error {
    color: white;
    background: var(--error);
    border: 1px solid var(--error);
    &:hover {
      background: var(--error-hover);
      border: 1px solid var(--primary);
    }
    &.btn--outline {
      background: transparent;
      color: black;
      border: 1px solid var(--error);
      &:hover {
        color: white;
        background: var(--error-hover);
        border-color: var(--error);
      }
    }
  }
  &.btn--outline {
    background: transparent;
    color: black;
    border: 1px solid black;
    &:hover {
      color: white;
      background: var(--accent);
      border-color: var(--accent);
    }
  }
  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &.btn--hidden {
    opacity: 0;
    pointer-events: none;
  }
}
</style>
