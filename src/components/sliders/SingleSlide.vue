<script setup>
import {usePopupStore} from "../../stores/popup-store";
const popup_store = usePopupStore();
const props = defineProps({
  title: {
    type: String,
    required: false
  },
  image: {
    type: String,
    required: false
  },
  footer: {
    type: String,
    required: false
  },
});
function showImagePopup() {
  popup_store.showImagePopup(props.image);
}
</script>
<template>
  <div class='single-slide'>
    <h2 class="single-slide__title">{{ title }}</h2>
    <div class="single-slide__img">
      <img @click="showImagePopup" :src="image" alt="">
    </div>
    <footer class="single-slide__footer">{{ footer }}</footer>
  </div>
</template>
<style lang="scss" scoped>
.single-slide {
  padding: 3.2rem;
  &__title {
    margin-bottom: 1.6rem;
    font-size: 2.4rem;
    font-weight: 600;
    text-align: center;
  }
  &__img {
    text-align: center;
    cursor: pointer;
  }
  &__footer {
    padding: 1.6rem 0;
    font-size: 2rem;
    text-align: center;
  }
}
</style>