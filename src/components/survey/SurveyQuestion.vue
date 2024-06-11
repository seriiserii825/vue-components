<script setup>
import {computed, onMounted, watch} from "vue";
import {ref} from "@vue/reactivity";
import Rating from "../globals/Rating.vue";
import {useSurveyStore} from "../../stores/survey-store";
import {storeToRefs} from "pinia";
const survey_store = useSurveyStore();
const local_storage_title = ref(null);
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  type: {
    type: Number,
    required: true,
  },
  current_question: {
    type: Number,
    required: true,
  },
  local_storage_title: {
    type: String,
    required: true,
  },
});
const title = ref(null);
const survey_questions = ref([]);
const current_question = ref(null);
const current_question_text = ref(null);
const filled_count = ref(0);
function getFromLocalStorage() {
  survey_questions.value = JSON.parse(
      localStorage.getItem(props.local_storage_title)
  );
  current_question.value = survey_questions.value.find(
      (item) => item.id === props.id
  );
  title.value = current_question.value.title;
  current_question_text.value = current_question.value.text;
  filled_count.value = current_question.value.rating;
  if (props.type === 1) {
    survey_store.setSurveyEmpty(filled_count.value === 0);
  } else {
    survey_store.setSurveyEmpty(current_question_text.value.length === 0);
  }
}
function saveToLocalStorage() {
  const index = survey_questions.value.findIndex(
      (item) => item.id === props.id
  );
  survey_questions.value[index].text = current_question_text.value;
  survey_questions.value[index].rating = filled_count.value;
  // console.log(survey_questions.value[index], 'survey_questions.value[index]')
  localStorage.setItem(
      props.local_storage_title,
      JSON.stringify(survey_questions.value)
  );
}
function changeHandler(event) {
  current_question_text.value = event.target.value;
  saveToLocalStorage();
}
watch(current_question_text, (value) => {
  if (props.type === 0) {
    survey_store.setSurveyEmpty(value.length === 0);
  }
});
watch(filled_count, (value) => {
  if (props.type === 1) {
    saveToLocalStorage();
    survey_store.setSurveyEmpty(value === 0);
  }
});
const textarea = ref(null);
onMounted(() => {
  if (textarea.value) {
    textarea.value.focus();
  }
  getFromLocalStorage();
});
</script>
<template>
  <div class="survey-question">
    <h2 class="survey-question__title">{{ title }}</h2>
    <div v-if="type === 0" class="survey-question__text">
      <span class="survey-question__span">Risposta:</span>
      <textarea
          @change="changeHandler"
          rows="10"
          v-model="current_question_text"
          ref="textarea"
      ></textarea>
    </div>
    <div v-else class="survey-question__rating">
      <Rating v-model:filled="filled_count"/>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.survey-question {
  align-self: center;
  @media screen and (max-width: 992px) {
    margin: 0 auto;
    width: 90%;
  }
  &__title {
    margin-bottom: 6.4rem;
    width: 96rem;
    text-align: center;
    @media screen and (max-width: 992px) {
      width: 100%;
    }
  }
  &__text {
    position: relative;
    padding: 1.6rem 3.2rem;
    background: #e6fffa;
    border: none;
    border-bottom: 1px solid #d1f4ee;
    border-radius: 16px;
    textarea {
      position: relative;
      padding: 2rem 3.2rem 1.6rem 8rem;
      width: 100%;
      min-height: 10.2rem;
      border: none;
      background: transparent;
      z-index: 1;
      &:focus {
        outline: none;
      }
    }
  }
  &__span {
    position: absolute;
    top: 3.2rem;
    left: 3.2rem;
    z-index: 2;
    @media screen and (max-width: 1400px) {
      top: 3.4rem;
    }
  }
}
</style>