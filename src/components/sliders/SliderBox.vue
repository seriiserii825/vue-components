<script setup>
import Text from "../globals/Text.vue";
import {usePopupStore} from "../../stores/popup-store";

const popup_store = usePopupStore();
const props = defineProps({
  text_1: {
    type: String,
    required: false
  },
  text_2: {
    type: String,
    required: false
  },
  text_3: {
    type: String,
    required: false
  },
  text_4: {
    type: String,
    required: false
  },
  caption_1: {
    type: String,
    required: false
  },
  caption_2: {
    type: String,
    required: false
  },
  caption_3: {
    type: String,
    required: false
  },
  caption_4: {
    type: String,
    required: false
  },
  image_1: {
    type: String,
    required: false
  },
  image_2: {
    type: String,
    required: false
  },
  image_3: {
    type: String,
    required: false
  },
  image_4: {
    type: String,
    required: false
  },
});

function showImagePopup(img) {
  popup_store.showImagePopup(img);
}
</script>
<template>
  <div class='slider-box'>
    <div class="slider-box__item">
      <div v-if="text_1" class="slider-box__text">
        <Text :text="text_1"/>
      </div>
      <div v-if="image_1" class="slider-box__img">
        <img
            @click="showImagePopup(image_1)"
            :src="image_1" alt="">
      </div>
      <div v-if="caption_1" class="slider-box__caption">{{ caption_1 }}</div>
    </div>
    <div class="slider-box__item">
      <div v-if="text_2" class="slider-box__text">
        <Text :text="text_2"/>
      </div>
      <div v-if="image_2" class="slider-box__img">
        <img
            @click="showImagePopup(image_2)"
            :src="image_2" alt="">
      </div>
      <div v-if="caption_2" class="slider-box__caption">{{ caption_2 }}</div>
    </div>
    <div class="slider-box__item">
      <div v-if="text_3" class="slider-box__text">
        <Text :text="text_3"/>
      </div>
      <div v-if="image_3" class="slider-box__img">
        <img
            @click="showImagePopup(image_3)"
            :src="image_3" alt="">
      </div>
      <div v-if="caption_3" class="slider-box__caption">{{ caption_3 }}</div>
    </div>
    <div class="slider-box__item">
      <div v-if="text_4" class="slider-box__text">
        <Text :text="text_4"/>
      </div>
      <div v-if="image_4" class="slider-box__img">
        <img
            @click="showImagePopup(image_4)"
            :src="image_4" alt="">
      </div>
      <div v-if="caption_4" class="slider-box__caption">{{ caption_4 }}</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.slider-box {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  flex-wrap: wrap;
  @media screen and (max-width: 768px) {
    display: block;
  }
  &__item {
    padding: 6.4rem;
    width: 50%;
    @media screen and (max-width: 1200px) {
      padding: 3.2rem;
    }
    @media screen and (max-width: 768px) {
      width: 100%;
    }
    &:nth-of-type(1),
    &:nth-of-type(2) {
      border-bottom: 2px solid #D1F4EE;
    }
    &:nth-of-type(1),
    &:nth-of-type(3) {
      border-right: 2px solid #D1F4EE;
    }
  }
  &__img {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__caption {
    margin-top: 3.2rem;
    font-size: 2rem;
    text-align: center;
  }
}
</style>