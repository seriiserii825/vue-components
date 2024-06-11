<script setup>
import Button from "../../components/ui/Button.vue";
const emits = defineEmits(["emit_close"]);
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
function onClose() {
  emits("emit_close");
}
</script>
<template>
  <div class="prompt-popup">
    <div class="prompt-popup__container">
      <header class="prompt-popup__header">
        <h2 class="prompt-popup__title">{{ title }}</h2>
      </header>
      <footer class="prompt-popup__footer">
        <div class="prompt-popup__btn">
          <Button @click="onClose" color="pink">Chiudi</Button>
        </div>
      </footer>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.prompt-popup {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(8px);
  z-index: 1000;
  &__container {
    width: 48rem;
    background: #fff;
    border-bottom: 1px solid #d1f4ee;
    box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.2);
    border-radius: 16px;
  }
  &__header {
    padding: 3.2rem;
    text-align: center;
    svg {
      margin: 1rem;
    }
  }
  &__title {
    font-weight: 600;
    font-size: 20px;
    text-align: center;
    color: #464f69;
  }
  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 3.2rem;
    border-top: 1px solid #d1f4ee;
  }
  &__btn {
    flex: 1;
    &:first-of-type {
      margin-right: 1.6rem;
    }
  }
}
</style>