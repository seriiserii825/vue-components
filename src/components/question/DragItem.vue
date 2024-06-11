<script setup>
import {computed, ref} from "vue";
const emits = defineEmits("[emit_remove]");
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  dark: {
    type: Boolean,
    required: false,
    default: false,
  },
  no_remove: {
    type: Boolean,
    required: false,
    default: false,
  },
});
const is_visible_long_title = ref(false);
const title_is_long = computed(() => {
  return props.title.length > 30;
});
const changed_title = computed(() => {
  return title_is_long ? props.title.slice(0, 30) : props.title;
});
function removeItem() {
  emits("emit_remove");
}
</script>
<template>
  <div
      @click="is_visible_long_title = !is_visible_long_title"
      class="drag-item"
      :class="{ 'drag-item--dark': dark }">
    <div class="drag-item__icon">
      <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
      >
        <path
            d="M7.1875 5.625C7.70527 5.625 8.125 5.20527 8.125 4.6875C8.125 4.16973 7.70527 3.75 7.1875 3.75C6.66973 3.75 6.25 4.16973 6.25 4.6875C6.25 5.20527 6.66973 5.625 7.1875 5.625Z"
        />
        <path
            d="M12.8125 5.625C13.3303 5.625 13.75 5.20527 13.75 4.6875C13.75 4.16973 13.3303 3.75 12.8125 3.75C12.2947 3.75 11.875 4.16973 11.875 4.6875C11.875 5.20527 12.2947 5.625 12.8125 5.625Z"
        />
        <path
            d="M7.1875 10.9375C7.70527 10.9375 8.125 10.5178 8.125 10C8.125 9.48223 7.70527 9.0625 7.1875 9.0625C6.66973 9.0625 6.25 9.48223 6.25 10C6.25 10.5178 6.66973 10.9375 7.1875 10.9375Z"
        />
        <path
            d="M12.8125 10.9375C13.3303 10.9375 13.75 10.5178 13.75 10C13.75 9.48223 13.3303 9.0625 12.8125 9.0625C12.2947 9.0625 11.875 9.48223 11.875 10C11.875 10.5178 12.2947 10.9375 12.8125 10.9375Z"
        />
        <path
            d="M7.1875 16.25C7.70527 16.25 8.125 15.8303 8.125 15.3125C8.125 14.7947 7.70527 14.375 7.1875 14.375C6.66973 14.375 6.25 14.7947 6.25 15.3125C6.25 15.8303 6.66973 16.25 7.1875 16.25Z"
        />
        <path
            d="M12.8125 16.25C13.3303 16.25 13.75 15.8303 13.75 15.3125C13.75 14.7947 13.3303 14.375 12.8125 14.375C12.2947 14.375 11.875 14.7947 11.875 15.3125C11.875 15.8303 12.2947 16.25 12.8125 16.25Z"
        />
      </svg>
    </div>
    <div v-if="title_is_long" class="drag-item__title">
      <span v-if="is_visible_long_title">{{ title }}</span>
      <span v-else>{{ changed_title }}...</span>
    </div>
    <div v-else class="drag-item__title">{{ title }}</div>
    <div
        v-if="dark && !no_remove"
        class="drag-item__remove"
        @click="removeItem(id)"
    >
      <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="20" height="20" rx="10" fill="#FF5A5A"/>
        <path d="M6 14.0664L14 6.06641" stroke="white" stroke-linecap="round"/>
        <path d="M6 5.93457L14 13.9346" stroke="white" stroke-linecap="round"/>
      </svg>
    </div>
  </div>
</template>
<style lang="scss">
.drag-item {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 1.6rem;
  padding: 1.6rem;
  color: black;
  background: #d1f4ee;
  border-radius: 16px;
  overflow: hidden;
  cursor: grabbing;
  &--dark {
    color: white;
    background: var(--accent);
    .drag-item__icon {
      svg {
        fill: white;
      }
    }
  }
  &.chosen,
  &.sortable-chosen {
    //border-radius: 0;
  }
  &.ghost {
    background: blue;
    border-radius: 1.6rem;
    overflow: hidden;
    background: darken(#65B244, 10);
  }
  &__icon {
    margin-right: 2.2rem;
    svg {
      fill: black;
    }
  }
  &__title {
    margin-right: auto;
    font-size: 1.6rem;
    font-weight: 600;
    span {
      cursor: pointer;
    }
  }
  &__remove {
    cursor: pointer;
  }
}
</style>
