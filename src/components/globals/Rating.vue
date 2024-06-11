<script setup>
import RatingItem from "./RatingItem.vue";

const emits = defineEmits(['update:filled']);
const props = defineProps({
  filled: {
    type: Number,
    required: true,
  },
});

function clickHandler(index) {
  if (props.filled === 1 && index === 1) {
    emits('update:filled', 0);
  } else {
    emits('update:filled', index);
  }
}
</script>
<template>
  <div class='rating'>
    <div v-for="(item, index) in 5" :key="index" class="rating__item">
      <RatingItem
          :filled="index + 1 <= filled"
          :index="index + 1"
          @emit_click="clickHandler"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.rating {
  display: flex;
  justify-content: center;
  align-items: center;
  &__item {
    margin: 0 2rem;
    flex: 0 0 6rem;
    @media screen and (max-width: 576px) {
      margin: 0 0.5rem;
    }
  }
}
</style>