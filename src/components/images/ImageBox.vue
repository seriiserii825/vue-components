<script setup>
import RangeText from "../rangers/RangeText.vue";
import {usePopupStore} from "../../stores/popup-store";
const popup_store = usePopupStore();
const props = defineProps({
  title: {
    type: String,
    required: false
  },
  image: {
    type: String,
    required: true
  },
  percentage: {
    type: Number,
    required: false
  },
  received: {
    type: Number,
    required: false
  },
  right_answer: {
    type: [Boolean, Number],
    required: false
  },
  range: {
    type: Boolean,
    default: false
  }
});
function showImagePopup(img) {
  popup_store.showImagePopup(img);
}
</script>
<template>
  <div
      class='image-box'
      :class="{'image-box--active': right_answer}"
  >
    <div class="image-box__img">
      <img
          @click="showImagePopup(image)"
          :src="image" alt="">
    </div>
    <RangeText
        v-if="range"
        :title="title"
        :percentage="percentage"
        :received="received"
        :right_answer="right_answer"
        :full_width="true"
    />
  </div>
</template>
<style lang="scss" scoped>
.image-box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1.6rem;
  height: 100%;
  background: #D1F4EE;
  border-radius: 1.6rem;
  border: 5px solid transparent;
  &.image-box--active {
    border-color: var(--accent);
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
}
</style>