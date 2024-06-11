<script setup>
import BackBtn from "../globals/BackBtn.vue";
import SurveyDetailItem from "./SurveyDetailItem.vue";
import LightBox from "../question/LightBox.vue";
import { onMounted, onUnmounted, ref } from "vue";
import { useSurveyStore } from "../../stores/survey-store";
import { storeToRefs } from "pinia";
const emits = defineEmits(["emit_back"]);
const store_survey = useSurveyStore();
const { store_session_content_survey_list } = storeToRefs(store_survey);
const session_content_id = ref(null);

const loading = ref(false);

const props = defineProps({
  survey_id: {
    type: Number,
    required: true,
  },
  item: {
    type: Object,
    required: true,
  },
});

let current_item = ref(null);

function goBack() {
  emits("emit_back");
}

let survey_list_interval_id;

async function getSurveyList() {
  try {
    await store_survey.storeSessionContentSurveyList(session_content_id.value, {
      survey: props.survey_id,
    });
    current_item.value = store_session_content_survey_list.value.find(
      (item) => item.id === props.item.id
    );
    current_item.value.answers = current_item.value.answers.reverse();
  } catch (error) {
    console.log(error, "error");
  }
}

async function init() {
  loading.value = true;
  session_content_id.value = localStorage.getItem("session_content_id");
  await getSurveyList();
  loading.value = false;

  survey_list_interval_id = setInterval(async () => {
    await getSurveyList();
  }, 5000);
}

onMounted(() => {
  init();
});
onUnmounted(() => {
  clearInterval(survey_list_interval_id);
});
</script>
<template>
  <div v-if="loading"></div>
  <div
    v-else-if="!loading && current_item"
    class="survey-text-detail myscrollbar"
  >
    <div class="survey-text-detail__container">
      <header class="survey-text-detail__header">
        <div class="survey-text-detail__btn">
          <BackBtn @click="goBack" />
        </div>
        <div class="survey-text-detail__info">
          <h3 class="survey-text-detail__title">{{ current_item.title }}</h3>
          <div class="survey-text-detail__receives">
            <span class="survey-text-detail__number">{{
              current_item.number_of_answers
            }}</span>
            <span class="survey-text-detail__label">Risposte ricevute</span>
          </div>
        </div>
      </header>
      <main class="survey-text-detail__main">
        <div
          v-for="elem in current_item.answers"
          :key="elem.id"
          class="survey-text-detail__item"
        >
          <LightBox>
            <SurveyDetailItem
              :title="elem.answer ? elem.answer : ''"
              :rating="elem.score === null ? 0 : elem.score"
              :show_rating="Boolean(item.type)"
              :receives="current_item.number_of_answers"
            />
          </LightBox>
        </div>
      </main>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.survey-text-detail {
  padding: 6.4rem;
  width: 100%;
  height: 100%;
  &__container {
    height: 80rem;
    overflow-y: scroll;
    border: 1px solid #d1f4ee;
    border-radius: 1.6rem;
  }
  &__main {
    padding: 3.2rem;
  }
  &__item {
    margin-bottom: 3.2rem;
  }
  &__header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 3.2rem;
    border-bottom: 1px solid #d1f4ee;
  }
  &__btn {
    margin-right: 3.2rem;
  }
  &__title {
    margin-bottom: 1.6rem;
    font-size: 1.6rem;
    font-weight: 600;
  }
  &__receives {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  &__number {
    margin-right: 0.8rem;
    font-weight: bold;
    color: var(--accent);
  }
  &__label {
    font-weight: 500;
  }
}
</style>