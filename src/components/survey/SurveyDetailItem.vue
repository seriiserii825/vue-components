<script setup>
import {computed} from "vue";
import RatingSmall from "../globals/RatingSmall.vue";
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: false,
  },
  show_rating: {
    type: Boolean,
    required: false,
  },
  receives: {
    type: Number,
    required: false,
  }
});

const rounded = computed(() => Math.round(props.rating));
</script>
<template>
  <div class="survey-detail-item">
    <div class="survey-detail-item__content">
      <div class="survey-detail-item__received">
        <div class="survey-detail-item__number">{{ receives }}</div>
        <div class="survey-detail-item__label">Risposta</div>
      </div>
      <h2 class="survey-detail-item__title">{{ title }}</h2>
    </div>
    <div v-if="show_rating" class="survey-detail-item__rating">
      <RatingSmall :filled="rounded" />
      <div class="survey-detail-item__count">{{ rating }}/5</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.survey-detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  &__received {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 1.6rem;
  }
  &__label {
    font-weight: 500;
  }
  &__number {
    margin-right: 0.8rem;
    font-weight: bold;
    color: var(--accent);
  }
  &__rating {
    display: flex;
    align-items: center;
  }
  &__count {
    font-weight: 600;
  }
}
</style>