<script setup>
import Text from "../globals/Text.vue";
import {usePopupStore} from "../../stores/popup-store";
const popup_store = usePopupStore();
function showImagePopup(img) {
  popup_store.showImagePopup(img);
}
const props = defineProps({
  text_1: {
    type: String,
    required: false,
  },
  text_2: {
    type: String,
    required: false,
  },
  caption_1: {
    type: String,
    required: false,
  },
  caption_2: {
    type: String,
    required: false,
  },
  image_1: {
    type: String,
    required: false,
  },
  image_2: {
    type: String,
    required: false,
  },
});
</script>
<template>
  <div class="two-columns">
    <div class="two-columns__left">
      <div v-if="text_1" class="two-columns__text">
        <Text :text="text_1"/>
      </div>
      <div v-if="image_1" class="two-columns__img">
        <img
            @click="showImagePopup(image_1)"
            :src="image_1" alt=""/>
        <div v-if="caption_1" class="two-columns__caption">{{ caption_1 }}</div>
      </div>
    </div>
    <div class="two-columns__right">
      <div v-if="text_2" class="two-columns__text">
        <Text :text="text_2"/>
      </div>
      <div v-if="image_2" class="two-columns__img">
        <img
            @click="showImagePopup(image_2)"
            :src="image_2" alt=""/>
        <div v-if="caption_2" class="two-columns__caption">{{ caption_2 }}</div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.two-columns {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 3.2rem;
  @media screen and (max-width: 992px) {
    display: block;
  }
  &__left,
  &__right {
    padding: 6.4rem;
    width: 50%;
    @media screen and (max-width: 1200px) {
      padding: 3.2rem;
    }
    @media screen and (max-width: 992px) {
      width: 100%;
    }
  }
  &__caption {
    margin-top: 3.2rem;
    font-size: 2rem;
    font-weight: 400;
    text-align: center;
  }
  &__img {
    img {
      max-width: initial;
      width: 100%;
      border-radius: 1.6rem;
      overflow: hidden;
      cursor: pointer;
    }
  }
}
</style>