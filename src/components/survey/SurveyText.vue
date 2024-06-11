<script setup>
import ButtonIcon from "../globals/ButtonIcon.vue";
import RatingSmall from "../globals/RatingSmall.vue";
import {computed} from "vue";
const emits = defineEmits(['emit_show_detail']);
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  receives: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: false,
  },
});

const score = computed(() => props.rating.toFixed(1));
function showDetail() {
  emits('emit_show_detail');
}
</script>
<template>
  <div class="survey-text">
    <div class="survey-text__wrap">
      <div class="survey-text__content">
        <h3 class="survey-text__title">{{ title }}</h3>
        <div class="survey-text__received">
          <span class="survey-text__number">{{ receives }}</span>
          <span class="survey-text__label">{{ subtitle }}</span>
        </div>
      </div>
      <div v-if="rating || rating === 0" class="survey-text__rating">
        <RatingSmall :filled="rating" />
        <div class="survey-text__count">{{ score }}/5</div>
      </div>
      <div class="survey-text__btn">
        <ButtonIcon
          @click="showDetail"
          :full="true"
          :outline="true"
          title="Mostra risultati"
        />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.survey-text {
  &__wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 768px) {
      display: block;
    }
  }
  &__content {
    margin-bottom: 3.2rem;
  }
  &__btn {
    flex: 0 0 20rem;
  }
  &__title {
    margin-bottom: 1.6rem;
    font-weight: 600;
  }
  &__received {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 1.6rem;
    font-weight: 500;
  }
  &__number {
    margin-right: 1rem;
    font-size: 1.6rem;
    font-weight: bold;
    color: var(--accent);
  }
  &__rating {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.6rem;
    font-weight: 600;
    @media screen and (max-width: 768px) {
      margin-bottom: 3.2rem;
    }
  }
}
</style>