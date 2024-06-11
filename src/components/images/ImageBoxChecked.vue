<script setup>
import {usePopupStore} from "../../stores/popup-store";
const popup_store = usePopupStore();
const emits = defineEmits(["emit_right_answer"]);
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  right_answer: {
    type: [Boolean, Number],
    required: false,
  },
  image: {
    type: String,
    required: true,
  },
  preview: {
    type: Boolean,
    required: false,
  },
});
function showImagePopup(img) {
  popup_store.showImagePopup(img);
}
function updateItem() {
  if (!props.preview) {
    emits("emit_right_answer", {
      id: props.id,
      right_answer: !props.right_answer,
    });
  }
}
</script>
<template>
  <div
    class="image-box-checked"
    :class="{ 'image-box-checked--active': right_answer }"
    @click="updateItem"
  >
    <div class="image-box-checked__img">
      <img
          @click="showImagePopup(image)"
          :src="image" alt="" />
    </div>
    <div class="image-box-checked__check">
      <span class="image-box-checked__check--fill"></span>
    </div>
  </div>
</template>
<style lang="scss">
.image-box-checked {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1.6rem;
  height: 100%;
  background: #d1f4ee;
  border-radius: 1.6rem;
  border: 5px solid transparent;
  &.image-box-checked--active {
    border-color: var(--accent);
    .image-box-checked__check--fill {
      opacity: 1;
    }
  }
  &__img {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    img {
      border-radius: 1.6rem;
      overflow: hidden;
    }
  }
  &__check {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1.6rem;
    width: 20px;
    height: 20px;
    border: 1px solid #65b244;
    border-radius: 4px;
    &--fill {
      width: 12px;
      height: 12px;
      background: #65b244;
      border-radius: 2px;
      transition: all 0.4s;
      opacity: 0;
    }
  }
}
</style>