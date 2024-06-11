<script setup>
import {useRoute} from 'vue-router';
import MiniPopup from "../components/popups/MiniPopup.vue";
import {storeToRefs} from "pinia";
import {usePopupStore} from "../stores/popup-store";
import ImagePopup from "../components/popups/ImagePopup.vue";
const popup_store = usePopupStore();
const {
  mini_popup, mini_popup_title,
  image_popup,
} = storeToRefs(popup_store);
const route = useRoute();
function closeImagePopup() {
  popup_store.showImagePopup('');
}
</script>

<template>
  <Transition name="bounce">
    <MiniPopup
        v-if="mini_popup"
        :text="mini_popup_title"
    />
  </Transition>
  <Transition>
    <ImagePopup
        v-if="image_popup" :image="image_popup"
        @emit_close="closeImagePopup"
    />
  </Transition>
  <component :is="route.meta.layoutComponent">
    <slot/>
  </component>
  <!--  <Alert :item="messages"/>-->
</template>

<style scoped></style>
