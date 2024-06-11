<script setup>
import {onMounted} from "vue";
import {usePopupStore} from "../../stores/popup-store";
const popup_store = usePopupStore();
const props = defineProps({
  text: {
    type: String,
    required: true
  },
})
onMounted(() => {
  setTimeout(() => {
    popup_store.hideMiniPopup();
  }, 3000);
});
</script>
<template>
  <div class='mini-popup'>
    <div class="mini-popup__text">{{ text }}</div>
  </div>
</template>
<style lang="scss">
.mini-popup {
  position: fixed;
  top: 3.2rem;
  left: 3.2rem;
  padding: 1.6rem;
  width: 30rem;
  font-weight: 600;
  text-align: center;
  color: var(--error);
  background: #fff;
  box-shadow: 0 1rem 1.6rem rgba(0, 0, 0, 0.1);
  border-radius: 1.6rem;
  border: 1px solid var(--error);
  z-index: 10000000;
}
</style>