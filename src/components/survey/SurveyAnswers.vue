<script setup>
import { storeToRefs } from "pinia";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useCookies } from "vue3-cookies";
import { useAxiosToken } from "../../hooks/useAxiosToken";
import { useSurveyStore } from "../../stores/survey-store";
import SurveyText from "./SurveyText.vue";
import LightBox from "../question/LightBox.vue";
import Body from "../globals/Body.vue";
import SurveyTextDetail from "./SurveyTextDetail.vue";
import BackBtn from "../globals/BackBtn.vue";
import { useRouter } from "vue-router";
const { cookies } = useCookies();

const store_survey = useSurveyStore();
const { store_session_content_survey_list } = storeToRefs(store_survey);
const is_survey_detail_visible = ref(false);
const survey_id = ref(null);
const session_content_id = ref(null);
const loading = ref(false);

const emits = defineEmits(["emit_back"]);

const left_data_computed = computed(() => {
  if (store_session_content_survey_list.value) {
    return store_session_content_survey_list.value.filter(
      (item) => item.type === 0
    );
  } else {
    return [];
  }
});

const right_data_computed = computed(() => {
  if (store_session_content_survey_list.value) {
    return store_session_content_survey_list.value.filter(
      (item) => item.type === 1
    );
  } else {
    return [];
  }
});

const current_answer_detail = ref({});

let survey_list_interval_id;
function showDetail(id, receives) {
  clearInterval(survey_list_interval_id);
  is_survey_detail_visible.value = true;
  current_answer_detail.value = store_session_content_survey_list.value.find(
    (item) => item.id === id
  );
  current_answer_detail.value.receives = receives;
}

function goBack() {
  emits("emit_back");
}

async function getSurveyList() {
  loading.value = true;
  try {
    await store_survey.storeSessionContentSurveyList(session_content_id.value, {
      survey: survey_id.value,
    });
    loading.value = false;
  }catch (e) {
  	console.log(e, 'e')
    loading.value = false;
  }
}
async function init() {
  const user_token = cookies.get("userToken");
  useAxiosToken(user_token);
  session_content_id.value = localStorage.getItem("session_content_id");
  survey_id.value = localStorage.getItem("survey_id");
  await getSurveyList();
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
  <div class="survey-answers">
    <Body>
      <Transition name="list" mode="out-in">
        <SurveyTextDetail
          v-if="is_survey_detail_visible === true"
          @emit_back="is_survey_detail_visible = false"
          :item="current_answer_detail"
          :survey_id="parseInt(survey_id)"
        />
        <div class="survey-answers__container" v-else>
          <div class="survey-answers__back">
            <BackBtn @click="goBack" />
          </div>
          <div class="survey-answers__wrap myscrollbar">
            <div
              v-if="left_data_computed.length"
              class="survey-answers__column"
            >
              <div
                v-for="item in left_data_computed"
                :key="item.id"
                class="survey-answers__item"
              >
                <LightBox>
                  <SurveyText
                    :title="item.title"
                    subtitle="Risposte ricevute"
                    :receives="item.number_of_answers"
                    @emit_show_detail="
                      showDetail(item.id, item.number_of_answers)
                    "
                  />
                </LightBox>
              </div>
            </div>
            <div
              v-if="right_data_computed.length"
              class="survey-answers__column"
            >
              <div
                v-for="item in right_data_computed"
                :key="item.id"
                class="survey-answers__item"
              >
                <LightBox>
                  <SurveyText
                    :title="item.title"
                    subtitle="Risposte ricevute"
                    :receives="item.number_of_answers"
                    :rating="item.score"
                    @emit_show_detail="
                      showDetail(item.id, item.number_of_answers)
                    "
                  />
                </LightBox>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Body>
  </div>
</template>
<style lang="scss">
.survey-answers {
  margin: 0 3.2rem;
  &__container {
    padding: 6.4rem;
    width: 100%;
    @media screen and (max-width: 992px) {
      padding: 6.4rem 3.2rem;
    }
  }
  &__back {
    margin-bottom: 3.2rem;
  }
  &__wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 -1.6rem;
    width: 100%;
    @media screen and (max-width: 1500px) {
      display: block;
      margin: 0;
    }
  }
  &__column {
    margin: 0 1.6rem;
    flex: 0 0 calc(50% - 3.2rem);
    height: 80rem;
    overflow-y: scroll;
    @media screen and (max-width: 1500px) {
      margin: 0;
    }
  }
  &__item {
    margin-bottom: 3.2rem;
  }
}
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(3%);
}

.list-enter-to,
.list-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>