<script setup>
import {useAxiosToken} from "../../hooks/useAxiosToken";
const popup_store = usePopupStore();
const {cookies} = useCookies();
import {useCookies} from "vue3-cookies";
import {ref} from "@vue/reactivity";
import {computed, onMounted, onUnmounted} from "vue";
import TitleWithBg from "../globals/TitleWithBg.vue";
import {useSessionContentStore} from "../../stores/content-store";
import {storeToRefs} from "pinia";
import CheckboxItem from "../globals/CheckboxItem.vue";
import CorretAnswers from "../globals/CorretAnswers.vue";
import RemainingTime from "../Globals/RemainingTime.vue";
import LightBox from "../question/LightBox.vue";
import Button from "../ui/Button.vue";
import GridBlock from "../globals/GridBlock.vue";
import Preloader from "../ui/Preloader.vue";
import {usePopupStore} from "../../stores/popup-store";
let intervalId;
let multiple_answers_interval_id;
let remaining_time_interval_id;
const current_checkboxes = ref([]);
const sessionContentStore = useSessionContentStore();
const {
  session_content_question_received_answers,
  session_content_answers_multiple_answers,
  session_content_question_remaining_time,
  session_content_question_answer_sent,
} = storeToRefs(sessionContentStore);
const props = defineProps({
  question: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  session_content_id: {
    type: String,
    required: true,
  },
  question_id: {
    type: Number,
    required: true,
  },
  countdown_in_second: {
    type: String,
    required: true,
  },
  answer_reason: {
    type: String,
    required: false,
  },
  multiple_answer_options: {
    type: Array,
    required: false,
  },
  mutually_exclusive: {
    type: Boolean,
    required: true,
  },
});
const loading = ref(false);
const is_visible_received_answer = ref(false);
const is_visible_answer = ref(false);
const is_submit_btn_visible = ref(true);
function showImagePopup(img) {
  popup_store.showImagePopup(img);
}
function resetCurrentCheckboxes() {
  current_checkboxes.value = [];
}
function checkboxClickHandler(id) {
  if (props.mutually_exclusive) {
    resetCurrentCheckboxes();
  }
  if (current_checkboxes.value.includes(id)) {
    current_checkboxes.value = current_checkboxes.value.filter(
        (item) => item !== id
    );
  } else {
    current_checkboxes.value.push(id);
  }
}
async function sendData(data) {
  for (const item of data) {
    try {
      await sessionContentStore.storeSessionContentAnswerQuestionMultipleAnswer(
          props.session_content_id,
          {
            question_id: props.question_id,
            option: item,
          }
      );
      console.log(item.id, "item.id");
    } catch (error) {
      console.log(error, "error");
      console.log(item.id, "item.id");
    }
  }
  loading.value = false;
}
const is_remaining_time_visible = computed(() => {
  return session_content_question_remaining_time.value && session_content_question_remaining_time.value.time !== 0
});
async function checkIfAnswerWasSent() {
  try {
    await sessionContentStore.storeSessionContentQuestionAnswerSent(
        props.session_content_id,
        {
          question: props.question_id,
        }
    );
  } catch (error) {
    console.log(error, "--- error");
  }
}
async function onSubmit() {
  loading.value = true;
  is_submit_btn_visible.value = false;
  try {
    await sendData(current_checkboxes.value);
    localStorage.setItem(
        "current_checkboxes_lStorage",
        JSON.stringify(current_checkboxes.value)
    );
    await checkIfAnswerWasSent();
  } catch (error) {
    console.log(error, "error");
    loading.value = false;
  }
}
async function getRemainingTime() {
  await sessionContentStore.storeSessionContentQuestionRemainingTime(
      props.session_content_id,
      {
        question_id: props.question_id,
        preview: false,
      }
  );
}
async function init() {
  loading.value = true;
  const user_token = cookies.get("userToken");
  useAxiosToken(user_token);
  try {
    await getRemainingTime();
    await checkIfAnswerWasSent();
    remaining_time_interval_id = setInterval(() => {
      getRemainingTime();
    }, 5000);
    loading.value = false;
  } catch (error) {
    console.log(error, "--- error");
    loading.value = false;
  }
  if (session_content_question_answer_sent.value) {
    const lc_storage_values = JSON.parse(
        localStorage.getItem("current_checkboxes_lStorage")
    );
    if (lc_storage_values) {
      lc_storage_values.forEach((item) => {
        current_checkboxes.value.push(item);
      });
    }
  }
}
onMounted(() => {
  init();
});
onUnmounted(() => {
  clearInterval(intervalId);
  clearInterval(multiple_answers_interval_id);
  clearInterval(remaining_time_interval_id);
});
</script>
<template>
  <div v-if="loading"></div>
  <div v-else class="multiple-answers">
    <div class="multiple-answers__wrap">
      <div v-if="image" class="multiple-answers__img">
        <img
            @click="showImagePopup(image)"
            :src="image" alt=""/>
      </div>
      <div
          class="multiple-answers__content"
          :class="{
          'multiple-answers__content--small': is_visible_received_answer,
        }"
      >
        <div class="multiple-answers__remaining-time">
          <RemainingTime
              v-if="is_remaining_time_visible" :time="session_content_question_remaining_time.time"
          />
        </div>
        <LightBox>
          <div
              class="multiple-answers__title"
              :class="{ 'no-margin': is_visible_received_answer }"
          >
            <TitleWithBg :title="question"/>
          </div>
          <div
              v-if="
              session_content_question_remaining_time &&
              session_content_question_remaining_time.show_answer &&
              session_content_question_answer_sent
            "
          >
            <div class="multiple-answers__grid">
              <h2>La Risposta corretta è</h2>
              <div class="multiple-answers__grid-block">
                <GridBlock
                    title="option_text"
                    checked="right_answer"
                    :items="multiple_answer_options"
                />
              </div>
            </div>
          </div>
          <div v-else>
            <div
                v-for="option in multiple_answer_options"
                :key="option.id"
                class="multiple-answers__check prevent-select"
            >
              <CheckboxItem
                  :id="option.id"
                  :title="option.option_text"
                  :checked="current_checkboxes.includes(option.id)"
                  :preview="session_content_question_answer_sent === true"
                  @emit_click="checkboxClickHandler"
              />
            </div>
            <div :class="{ 'multiple-answers__flex': !image }">
              <footer
                  v-if="session_content_question_answer_sent === false"
                  class="multiple-answers__footer"
              >
                <div class="multiple-answers__btn">
                  <Button
                      @click="onSubmit"
                      v-if="
                      session_content_question_answer_sent !== true
                    "
                      color="wet-asphalt"
                      :disabled="current_checkboxes.length === 0 || session_content_question_remaining_time?.time === 0"
                  >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                          d="M16.4299 2.8046L1.8674 6.90616C1.74344 6.94006 1.63293 7.01134 1.55094 7.1103C1.46895 7.20926 1.41947 7.33109 1.40922 7.4592C1.39897 7.5873 1.42846 7.71545 1.49367 7.82619C1.55889 7.93693 1.65665 8.02487 1.77365 8.07804L8.46115 11.2421C8.59215 11.3028 8.69736 11.408 8.75802 11.539L11.9221 18.2265C11.9753 18.3435 12.0632 18.4412 12.1739 18.5065C12.2847 18.5717 12.4128 18.6012 12.5409 18.5909C12.669 18.5807 12.7909 18.5312 12.8898 18.4492C12.9888 18.3672 13.0601 18.2567 13.094 18.1327L17.1955 3.57023C17.2266 3.46396 17.2285 3.35129 17.2011 3.24402C17.1736 3.13676 17.1179 3.03885 17.0396 2.96056C16.9613 2.88226 16.8634 2.82648 16.7561 2.79904C16.6488 2.7716 16.5362 2.77352 16.4299 2.8046V2.8046Z"
                          stroke="white"
                          stroke-width="1.8"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                      />
                      <path
                          d="M8.66406 11.3359L12.1953 7.80469"
                          stroke="white"
                          stroke-width="1.8"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                      />
                    </svg>

                    <span>Invia la risposta</span>
                  </Button>
                </div>
              </footer>
            </div>
          </div>
          <div v-if="is_visible_answer" class="multiple-answers__grid-text">
            {{ answer_reason }}
          </div>
        </LightBox>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.multiple-answers {
  &__wrap {
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 992px) {
      display: block;
    }
  }
  &__img {
    padding: 3.2rem;
    width: 50%;
    cursor: pointer;
    @media screen and (max-width: 992px) {
      width: 100%;
    }
  }
  &__content {
    flex: 1;
    padding: 12.8rem;
    @media screen and (max-width: 1800px) {
      padding: 6.4rem;
    }
    @media screen and (max-width: 1200px) {
      padding: 3.2rem;
    }
    &.multiple-answers__content--small {
      padding: 6.4rem;
    }
  }
  &__timer {
    margin-bottom: 8rem;
  }
  &__remaining-time {
    margin-bottom: 8rem;
  }
  &__title {
    margin-bottom: 2rem;
    &.no-margin {
      margin-bottom: 2rem;
    }
  }
  &__flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .multiple-answers__info-box {
      flex: 0 0 35rem;
    }
    .multiple-answers__footer {
      flex: 0 0 50rem;
    }
  }
  &__info-box {
    margin-bottom: 1.6rem;
  }
  &__footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 4rem;
  }
  &__range-text {
    margin-bottom: 2rem;
  }
  &__check {
    margin-bottom: 3.2rem;
  }
  &__btn {
    flex: 0 0 20rem;
  }
  &__grid {
    margin: 3.2rem;
    padding: 1rem 0.8rem;
    border: 1px solid #8fe1d2;
    border-radius: 18px;
    h2 {
      margin-bottom: 1.6rem;
      font-size: 1.6rem;
      text-align: center;
    }
    &-text {
      padding: 0 3.2rem;
      font-weight: 400;
      font-size: 20px;
      line-height: 24px;
      color: #000000;
    }
  }
}
</style>