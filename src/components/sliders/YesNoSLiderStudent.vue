<script setup>
import {computed, onMounted, onUnmounted} from "vue";
import {ref} from "@vue/reactivity";
import {useSessionContentStore} from "../../stores/content-store";
import {storeToRefs} from "pinia";
import {useCookies} from "vue3-cookies";
import {useAxiosToken} from "../../hooks/useAxiosToken";
import InfoBox from "../globals/InfoBox.vue";
import RightAnswer from "../globals/RightAnswer.vue";
import TimerPopup from "../popups/TimerPopup.vue";
import Button from "../ui/Button.vue";
import RemainingTime from "../Globals/RemainingTime.vue";
import ContentContainer from "../loading/ContentContainer.vue";
import {useLoadingStore} from "../../stores/loading-store";
import Preloader from "../ui/Preloader.vue";
import {usePopupStore} from "../../stores/popup-store";
const popup_store = usePopupStore();
let received_answer_interval_id;
const {cookies} = useCookies();
const is_received_answer_visible = ref(false);
const is_answer_visible = ref(false);
const is_footer_visible = ref(true);
const is_submit_btn_visible = ref(true);
const sessionContentStore = useSessionContentStore();
const {
  session_content,
  session_content_question_received_answers,
  session_content_question_remaining_time,
  session_content_answer_question_yes_no,
  session_content_question_answer_sent,
} = storeToRefs(sessionContentStore);
const props = defineProps({
  question: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
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
  current_page: {
    type: Number,
    required: true,
  },
});
const loading = ref(false);
const total_seconds = ref(props.countdown_in_second);

function showImagePopup(img) {
  popup_store.showImagePopup(img);
}
function updateTotalSeconds(value) {
  total_seconds.value = value;
}
const showReceivedAnswer = async () => {
  is_footer_visible.value = false;
  questionAnswerYesNo();
  received_answer_interval_id = setInterval(() => {
    questionAnswerYesNo();
  }, 5000);
  is_received_answer_visible.value = true;
};
const questionAnswerYesNo = () => {
  sessionContentStore.storeSessionContentQuestionAnswerYesNo(
      props.session_content_id,
      {
        question_id: props.question_id,
      }
  );
};
function showAnswer() {
  is_footer_visible.value = false;
  is_answer_visible.value = true;
}
function goBack() {
  is_footer_visible.value = true;
  is_received_answer_visible.value = false;
  is_answer_visible.value = false;
  clearInterval(received_answer_interval_id);
}
const is_yes_active = ref(false);
const is_no_active = ref(false);
function toggleYes() {
  is_yes_active.value = !is_yes_active.value;
  if (is_no_active.value) {
    is_no_active.value = false;
  }
}
function toggleNo() {
  is_no_active.value = !is_no_active.value;
  if (is_yes_active.value) {
    is_yes_active.value = false;
  }
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
  try {
    await sessionContentStore.storeSessionContentAnswerQuestionYesNo(
        props.session_content_id,
        {
          question_id: props.question_id,
          answer: is_yes_active.value,
        }
    );
    await checkIfAnswerWasSent();
    is_submit_btn_visible.value = false;
  } catch (error) {
    console.log(error, "error");
  }
}
let remaining_time_interval_id;
async function getRemainingTime() {
  await sessionContentStore.storeSessionContentQuestionRemainingTime(
      props.session_content_id,
      {
        question_id: props.question_id,
        preview: false,
      }
  );
}
const disable_submit = computed(() => {
  return session_content_question_remaining_time.value?.time === 0 || is_yes_active.value === false &&
      is_no_active.value === false;
});
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
}
onMounted(() => {
  init();
});
onUnmounted(() => {
  console.log("onMounted--- ");
  clearInterval(remaining_time_interval_id);
});
</script>
<template>
  <div class="yes-no-slider">
    <div class="yes-no-slider__wrap">
      <div class="yes-no-slider__content">
        <div class="yes-no-slider__remaining-time">
          <RemainingTime
              v-if="is_remaining_time_visible" :time="session_content_question_remaining_time.time"
          />
        </div>
        <div class="yes-no-slider__question">{{ question }}</div>
        <InfoBox
            v-if="session_content_question_received_answers && is_footer_visible"
            label="Numero di risposte ricevute"
            :value="session_content_question_received_answers"
        />
        <RightAnswer
            v-if="
            session_content_question_remaining_time &&
            session_content_question_remaining_time.show_answer &&
            session_content_question_answer_sent
          "
        >
          <div class="yes-no-slider__info-box">
            <InfoBox
                label="La Risposta corretta è"
                :value="
                session_content.question_content.right_answer_yes_no === 0
                  ? 'No'
                  : 'Si'
              "
            />
          </div>
          <div class="right-answer__text">
            {{ session_content.question_content.answer_reason }}
          </div>
        </RightAnswer>
        <footer class="yes-no-slider__footer">
          <div
              v-if="session_content_question_answer_sent === false"
              class="yes-no-slider__buttons"
          >
            <div class="yes-no-slider__btn">
              <Button
                  v-if="is_footer_visible && is_yes_active"
                  color="accent"
                  @click="toggleYes"
              >Si
              </Button
              >
              <Button
                  v-if="is_footer_visible && !is_yes_active"
                  color="contrast"
                  @click="toggleYes"
              >Si
              </Button
              >
            </div>
            <div class="yes-no-slider__btn">
              <Button
                  v-if="is_footer_visible && is_no_active"
                  color="accent"
                  @click="toggleNo"
              >No
              </Button
              >
              <Button
                  v-if="is_footer_visible && !is_no_active"
                  color="contrast"
                  @click="toggleNo"
              >No
              </Button
              >
            </div>
          </div>
          <div class="yes-no-slider__submit">
            <Button
                @click="onSubmit"
                v-if="
                session_content_question_answer_sent === false &&
                session_content_question_remaining_time !== 0
              "
                color="wet-asphalt"
                :disabled="disable_submit"
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
      <div class="yes-no-slider__img">
        <img
            @click="showImagePopup(image)"
            :src="image" alt=""/>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.yes-no-slider {
  &__wrap {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    @media screen and (max-width: 992px) {
      display: block;
    }
  }
  &__content,
  &__img {
    width: 50%;
    @media screen and (max-width: 992px) {
      width: 100%;
    }
  }
  &__content {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding: 12.8rem;
    border-right: 1px solid #d1f4ee;
    @media screen and (max-width: 1200px) {
      padding: 6.4rem;
    }
  }
  &__img {
    padding: 3.2rem;
    cursor: pointer;
  }
  &__remaining-time {
    &.yes-no-slider__remaining-time--down {
      margin-bottom: 2.4rem;
    }
  }
  &__question {
    font-size: 3.2rem;
    font-weight: 600;
  }
  &__info-box {
    width: 30rem;
  }
  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 4rem;
    @media screen and (max-width: 576px) {
      display: block;
    }
  }
  &__ranges {
    margin-top: auto;
  }
  &__range {
    &:last-of-type {
      margin-top: 6.4rem;
    }
  }
  &__buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 576px) {
      margin-bottom: 3.2rem;
    }
  }
  &__btn {
    margin-right: 3.2rem;
    flex: 0 0 8rem;
  }
}
</style>