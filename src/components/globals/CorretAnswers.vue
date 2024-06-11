<script setup>
const props = defineProps({
  multiple_answer_options: {
    type: Array,
    required: false
  },
  answer_reason: {
    type: String,
    required: false
  },
});
</script>
<template>
  <div class='correct-answers'>
    <div class="correct-answers__body">
      <div class="correct-answers__title">La Risposta corretta è</div>
      <div class="correct-answers__wrap">
        <div class="correct-answers__item"
             :class="{'active': item.right_answer}"
             v-for="item in multiple_answer_options"
             :key="item.id"
        >
          <span>{{ item.option_text }}</span>
        </div>
      </div>
    </div>
    <div class="correct-answers__text">{{ answer_reason }}</div>
  </div>
</template>
<style lang="scss" scoped>
.correct-answers {
  padding: 3.2rem;
  background: #E6FFFA;
  border-radius: 16px;
  &__body {
    margin-bottom: 3.2rem;
    padding: 1rem;
    border: 1px solid #8FE1D2;
    border-radius: 18px;
  }
  &__title {
    margin-bottom: 1.6rem;
    font-size: 1.6rem;
    font-weight: bold;
    text-align: center;
  }
  &__wrap {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -0.8rem;
  }
  &__item {
    margin: 0 0.8rem 1.6rem;
    flex: 0 0 calc(50% - 1.6rem);
    padding: 1.6rem;
    border: 2px solid #D1F4EE;
    border-radius: 16px;
    &.active {
      color: #65B244;
      border-color: #65b244;
    }
  }
  &__text {
    font-size: 2rem;
  }
}
</style>