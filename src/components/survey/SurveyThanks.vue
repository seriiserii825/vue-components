<script setup>
import Button from "../ui/Button.vue";
import { onMounted, ref } from "vue";
import { useAxiosToken } from "../../hooks/useAxiosToken";
import { useRouter } from "vue-router";
import { useSurveyStore } from "../../stores/survey-store";
import Preloader from "../ui/Preloader.vue";
const survey_store = useSurveyStore();

const router = useRouter();
const loading = ref(false);

const props = defineProps({
  user_token: {
    type: String,
    required: true,
  },
  event_id: {
    type: Number,
    required: true,
  },
  event_slug: {
    type: String,
    required: true,
  },
  session_content_id: {
    type: [Number, String],
    required: false,
  },
});

function setAllSurveyThanks() {
  if (props.session_content_id) {
    setStudentSurvey();
  } else {
    setEventSurvey();
  }
}

async function sendEventSurvey(surveys) {
  for (const survey of surveys) {
    const question = survey.id;
    const answer = survey.type === 0 ? survey.text : survey.rating;
    try {
      await survey_store.storeEventSurveyAnswer(props.event_id, {
        question,
        answer,
      });
    } catch (error) {
      console.log(error, "error");
    }
  }
}
async function setEventSurvey() {
  loading.value = true;
  const survey_questions = JSON.parse(localStorage.getItem("survey_questions"));
  await sendEventSurvey(survey_questions);
  loading.value = false;
  router.push({
    name: "evento_detaglio",
    params: {
      slug: props.event_slug,
    },
  });
}

async function sendStudentSurvey(surveys) {
  loading.value = true;
  for (const survey of surveys) {
    const question = survey.id;
    const answer = survey.type === 0 ? survey.text : survey.rating;
    try {
      await survey_store.storeSessionContentSurveyAnswer(
        props.session_content_id,
        {
          question,
          answer,
        }
      );
    } catch (error) {
      console.log(error, "error");
    }
  }
}

async function setStudentSurvey() {
  loading.value = true;
  let survey_questions = JSON.parse(localStorage.getItem("student_surveys"));
  // let session_content_survey_to_fill = JSON.parse(
  //   localStorage.getItem("session_content_survey_to_fill")
  // );
  // console.log(survey_questions, "survey_questions");
  await sendStudentSurvey(survey_questions);

  router.push({
    name: "evento_detaglio",
    params: { slug: props.event_slug },
  });
}

onMounted(() => {
  useAxiosToken(props.user_token);
});
</script>
<template>
  <div class="survey-thanks">
    <div class="survey-thanks__icon">
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M43 26L28.325 40L21 33"
          stroke="#65B244"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M32 56C45.2548 56 56 45.2548 56 32C56 18.7452 45.2548 8 32 8C18.7452 8 8 18.7452 8 32C8 45.2548 18.7452 56 32 56Z"
          stroke="#65B244"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
    <h3 class="survey-thanks__title">Grazie per aver completato l'indagine</h3>
    <Preloader v-if="loading" />
    <Button v-else @click="setAllSurveyThanks" :small="true"
      >Invia la tua immagine</Button
    >
  </div>
</template>
<style lang="scss" scoped>
.survey-thanks {
  text-align: center;
  &__icon {
    margin-bottom: 4rem;
  }
  &__title {
    margin-bottom: 3.2rem;
  }
}
</style>