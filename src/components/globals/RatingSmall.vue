<script setup>
import {computed} from "vue";
import RatingItemSmall from "./RatingItemSmall.vue";
const props = defineProps({
  filled: {
    type: Number,
    required: true,
  },
});
const rounded = computed(() => Math.round(props.filled));
</script>
<template>
  <div class='rating-small'>
    <div v-for="(item, index) in 5" :key="index" class="rating-small__item">
      <RatingItemSmall
          :filled="index + 1 <= rounded"
          :index="index + 1"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.rating-small {
  display: flex;
  justify-content: center;
  align-items: center;
  &__item {
    margin: 0 1rem;
    flex: 0 0 1.6rem;
  }
}
</style>