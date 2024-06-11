<script setup>
import EventInformation from "../../components/events/EventInformation.vue";
import {useRoute, useRouter} from "vue-router";
import {onMounted} from "vue";
import {ref} from "@vue/reactivity";
import {useCookies} from "vue3-cookies";
import Navigation from "../../components/globals/Navigation.vue";
import HeaderNavigation from "../../layouts/HeaderNavigation.vue";
import Body from "../../components/globals/Body.vue";
import Background from "../../components/globals/Background.vue";
import {computed} from "@vue/runtime-core";
import {storeToRefs} from "pinia";
import {useEventStore} from "../../stores/events-store";
import {useAxiosToken} from "../../hooks/useAxiosToken";
import {useSurveyStore} from "../../stores/survey-store";
import Survey from "../../components/survey/Survey.vue";
//store
const eventStore = useEventStore();
const {event} = storeToRefs(eventStore);
const surveyStore = useSurveyStore();
const {survey, is_survey_empty} = storeToRefs(surveyStore);
//cookie
const {cookies} = useCookies();
const router = useRouter();
const route = useRoute();
const loading = ref(true);
const after_loading = ref(false);
const slug = ref(false);
const survey_start = ref(false);
const survey_list = ref([]);
const prev_link_tooltip = ref("Vai alla domanda precedente");
const center_link_tooltip = ref(
    "Torna alla pagina principale, tutte le risposte saranno perse"
);
const next_link_tooltip = ref("Vai alla domanda successiva");
const current_question = ref(0);
const is_question_visible = ref(true);
const questions_length = ref(0);
const user_token = ref(null);
function showQuestion() {
  setTimeout(() => {
    is_question_visible.value = true;
  }, 200);
}
function hideQuestion() {
  is_question_visible.value = false;
}
function stopLoading() {
  setTimeout(() => {
    loading.value = false;
    setTimeout(() => {
      after_loading.value = true;
    }, 200);
  }, 500);
}
const getEvent = async () => {
  loading.value = true;
  await eventStore.storeEventsSlugToEvent(slug.value);
  await getSurveyQuestions();
  stopLoading();
};
const getSurveyQuestions = async () => {
  const id = event.value.id;
  await surveyStore.storeSurveyGetAll(id);
  survey_list.value = survey.value.survey_questions;
  const data = survey_list.value.map((item) => {
    item.text = "";
    item.rating = 0;
    return item;
  });
  const survey_questions = JSON.parse(localStorage.getItem("survey_questions"));
  questions_length.value = survey_questions;
  if (!survey_questions) {
    initLocalStorage(data);
  }
};
function initLocalStorage(data) {
  localStorage.setItem("survey_questions", JSON.stringify(data));
}
function prevQuestion() {
  hideQuestion();
  if (current_question.value > 0) {
    current_question.value--;
    showQuestion();
  }
}
function nextQuestion() {
  if (is_survey_empty.value === false) {
    if (is_questions_completed.value) {
      hideQuestion();
    } else {
      hideQuestion();
      current_question.value++;
      showQuestion();
    }
  }
}
function startSurvey() {
  console.log(survey_start.value, 'survey_start.value')
  survey_start.value = true;
}
const is_questions_completed = computed(() => {
  return (
      survey_start.value && current_question.value === survey_list.value.length
  );
});
onMounted(() => {
  slug.value = route.params.slug;
  const user_type = cookies.get("user_type");
  user_token.value = cookies.get("userToken");
  useAxiosToken(user_token.value);
  if (user_type !== "D") {
    router.push({name: "home"});
  } else {
    getEvent();
  }
});
</script>
<template>
  <transition appear>
    <Background :background_image="event.background" v-if="!loading">
      <div class="padding" v-if="!loading">
        <HeaderNavigation>
          <template v-slot:left>
            <EventInformation
                :title="event.title"
                :subtitle="event.subtitle"
                :logo="event.logo"
            />
          </template>
          <template v-slot:center>
            <Navigation
                v-if="!survey_start"
                :center_link="{ name: 'evento_detaglio', params: { slug: slug } }"
                :center_link_tooltip="center_link_tooltip"
            />
            <Navigation
                v-else-if="survey_start && current_question === 0"
                :center_link="{ name: 'evento_detaglio', params: { slug: slug } }"
                :next_link="`/`"
                :center_link_tooltip="center_link_tooltip"
                :next_link_tooltip="next_link_tooltip"
                @emit_prev="prevQuestion"
                @emit_next="nextQuestion"
            />
            <Navigation
                v-else-if="is_questions_completed"
                :center_link="{ name: 'evento_detaglio', params: { slug: slug } }"
                :center_link_tooltip="center_link_tooltip"
            />
            <Navigation
                v-else
                :prev_link="`/`"
                :next_link="`/`"
                :center_link="{ name: 'evento_detaglio', params: { slug: slug } }"
                :center_link_tooltip="center_link_tooltip"
                :prev_link_tooltip="prev_link_tooltip"
                :next_link_tooltip="next_link_tooltip"
                @emit_prev="prevQuestion"
                @emit_next="nextQuestion"
            />
          </template>
          <template v-slot:right>
            <div></div>
          </template>
        </HeaderNavigation>
        <Body>
        <Survey
            v-if="event"
            :survey_list="survey_list"
            :survey_start="survey_start"
            :is_question_visible="is_question_visible"
            :is_questions_completed="is_questions_completed"
            :current_question="current_question"
            :user_token="user_token"
            :event="event"
            local_storage_title="survey_questions"
            @emit_prev_question="prevQuestion"
            @emit_next_question="nextQuestion"
            @emit_start_survey="startSurvey"
        />
        </Body>
      </div>
    </Background>
  </transition>
</template>
<style lang="scss" scoped>
</style>