<script setup>
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useCookies } from "vue3-cookies";
import Button from "../../components/ui/Button.vue";
import { useAxiosToken } from "../../hooks/useAxiosToken";
import { useSurveyStore } from "../../stores/survey-store";
const { cookies } = useCookies();
const session_content_id = ref(null);
const survey_store = useSurveyStore();
const { store_session_content_survey } = storeToRefs(survey_store);
const emits = defineEmits(["emit_close", "emit_show"]);
function closePopup() {
  emits("emit_close");
}
async function show() {
  const user_token = cookies.get("userToken");
  useAxiosToken(user_token);
  await survey_store.storeSessionContentSurvey(session_content_id.value);
  await survey_store.storeSessionContentSurveyStart(session_content_id.value, {
    survey: store_session_content_survey.value.id,
  });
  localStorage.setItem("survey_id", store_session_content_survey.value.id);
  if (localStorage.getItem("teacher_survey_answer_visibility") === "1") {
    emits("emit_show");
  } else {
    closePopup();
  }
}

onMounted(() => {
  localStorage.removeItem("survey_id");
  session_content_id.value = localStorage.getItem("session_content_id");
});
</script>
<template>
  <div class="survey-popup">
    <div class="survey-popup__container">
      <header class="survey-popup__header">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 16H27"
            stroke="#464F69"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M16 8H27"
            stroke="#464F69"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M16 24H27"
            stroke="#464F69"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M11.5 6L7.1625 10L5 8"
            stroke="#464F69"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M11.5 14L7.1625 18L5 16"
            stroke="#464F69"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M11.5 22L7.1625 26L5 24"
            stroke="#464F69"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <h2 class="survey-popup__title">
          Sei sicuro di voler avviare la survey?
        </h2>
      </header>
      <footer class="survey-popup__footer">
        <div class="survey-popup__btn">
          <Button @click="show" color="pink">Si</Button>
        </div>
        <div class="survey-popup__btn">
          <Button @click="closePopup">No</Button>
        </div>
      </footer>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.survey-popup {
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