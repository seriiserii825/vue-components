<script setup>
const emits = defineEmits(["emit_close"]);
const props = defineProps({
  image: {
    type: String,
    required: true,
  },
});
function closeHandler() {
  emits("emit_close");
}
</script>
<template>
  <div class='image-popup'>
    <div class="image-popup__body">
      <img :src="image" alt="">

      <svg
          @click="closeHandler"
          class="image-popup__close"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="32" height="32" rx="16" fill="#FF5A5A"/>
        <path
            d="M11.0811 21L20.9191 11.162"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
        />
        <path
            d="M11.0811 11L20.9191 20.838"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
        />
      </svg>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.image-popup {
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
  z-index: 10000;
  &__body {
    position: relative;
    width: 90%;
    height: 90%;
    background: white;
    border: 8px solid #d1f4ee;
    border-radius: 1.6rem;
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 90%;
      height: 90%;
      object-fit: contain;
      border-radius: 1rem;
      z-index: 1;
    }
  }
  &__close {
    position: absolute;
    top: 1.6rem;
    right: 1.6rem;
    cursor: pointer;
    z-index: 2;
  }
}
</style>