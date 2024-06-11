<script setup>
import {useAxiosToken} from "../../hooks/useAxiosToken";
import {useCookies} from "vue3-cookies";
import {ref} from "@vue/reactivity";
import {computed, onMounted, onUnmounted} from "vue";
import Timer from "../globals/Timer.vue";
import TimerPopup from "../popups/TimerPopup.vue";
import TitleWithBg from "../globals/TitleWithBg.vue";
import {useSessionContentStore} from "../../stores/content-store";
import {storeToRefs} from "pinia";
import InfoBox from "../globals/InfoBox.vue";
import ButtonIcon from "../globals/ButtonIcon.vue";
import RangeText from "../rangers/RangeText.vue";
import CorretAnswers from "../globals/CorretAnswers.vue";
import RemainingTime from "../Globals/RemainingTime.vue";
import {usePopupStore} from "../../stores/popup-store";
const popup_store = usePopupStore();
let intervalId;
let multiple_answers_interval_id;
let remaining_time_interval_id;
const sessionContentStore = useSessionContentStore();
const {
  session_content,
  session_content_question_received_answers,
  session_content_answers_multiple_answers,
  session_content_question_remaining_time,
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
  answer_reason: {
    type: String,
    required: false,
  },
  multiple_answer_options: {
    type: Array,
    required: false,
  },
  current_page: {
    type: Number,
    required: true,
  },
  preview: {
    type: String,
    required: true,
  }
});
const {cookies} = useCookies();
const loading = ref(true);
const is_timer_popup_visible = ref(false);
const is_visible_received_answer = ref(false);
const is_visible_answer = ref(false);
const is_footer_visible = ref(true);
const total_seconds = ref(props.countdown_in_second);
function showImagePopup(img) {
  popup_store.showImagePopup(img);
}
function updateTotalSeconds(value) {
  total_seconds.value = value;
}
function multipleAnswers() {
  sessionContentStore.storeSessionContentAnswersMultipleAnswers(
      props.session_content_id,
      {
        question_id: props.question_id,
      }
  );
}
function getRemainingTime() {
  sessionContentStore.storeSessionContentQuestionRemainingTime(
      props.session_content_id,
      {
        question_id: props.question_id,
        preview: false,
      }
  );
}
async function showAnswer() {
  loading.value = true;
  is_footer_visible.value = false;
  try {
    await sessionContentStore.storeSessionContentShowAnswer(
        props.session_content_id,
        {
          question_id: props.question_id,
          preview: true,
        }
    );
    loading.value = false;
    is_visible_answer.value = true;
  } catch (error) {
    console.log(error, "error");
    loading.value = false;
  }
}
async function showReceivedAnswers() {
  is_footer_visible.value = false;
  multipleAnswers();
  multiple_answers_interval_id = setInterval(() => {
    multipleAnswers();
  }, 5000);
  is_visible_received_answer.value = true;
}
function goBack() {
  is_footer_visible.value = true;
  is_visible_received_answer.value = false;
  is_visible_answer.value = false;
  clearInterval(multiple_answers_interval_id);
}
const is_remaining_time_visible = computed(() => {
  return session_content_question_remaining_time.value && session_content_question_remaining_time.value.time !== 0
});
async function init() {
  const user_token = cookies.get("userToken");
  useAxiosToken(user_token);
  try {
    await sessionContentStore.storeSessionContentStartTimer(
        props.session_content_id,
        {question_id: props.question_id}
    );
  } catch (e) {
    console.log(e, 'e')
  }
  try {
    await sessionContentStore.storeSessionContent(
        props.session_content_id,
        props.current_page,
        props.preview
    );
    if (session_content.value.question_content.countdown_in_second === "00:00") {
      is_timer_popup_visible.value = true;
    }
  } catch (e) {
    console.log(e, 'e')
  }
  if (props.countdown_in_second === "00:00") {
    is_timer_popup_visible.value = true;
  }
  loading.value = false;
}
onMounted(() => {
  init();
  sessionContentStore.storeSessionContentQuestionReceivedAnswers(
      props.session_content_id,
      {question_id: props.question_id}
  );
  intervalId = setInterval(() => {
    sessionContentStore.storeSessionContentQuestionReceivedAnswers(
        props.session_content_id,
        {question_id: props.question_id}
    );
  }, 5000);
  getRemainingTime();
  remaining_time_interval_id = setInterval(() => {
    getRemainingTime();
  }, 5000);
});
onUnmounted(() => {
  clearInterval(intervalId);
  clearInterval(multiple_answers_interval_id);
  clearInterval(remaining_time_interval_id);
});
</script>
<template>
  <div class="multiple-answers">
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
        <div v-if="is_footer_visible" class="multiple-answers__timer">
          <Timer @emit_timer_click="is_timer_popup_visible = true"/>
        </div>
        <div class="multiple-answers__remaining-time">
          <RemainingTime
              v-if="is_remaining_time_visible"
              :time="session_content_question_remaining_time.time"
          />
        </div>
        <div
            class="multiple-answers__title"
            :class="{ 'no-margin': is_visible_received_answer }"
        >
          <TitleWithBg :title="question"/>
        </div>
        <div :class="{ 'multiple-answers__flex': !image }">
          <div v-if="is_footer_visible" class="multiple-answers__info-box">
            <InfoBox
                v-if="
                session_content_question_received_answers ||
                session_content_question_received_answers === 0
              "
                label="Numero di risposte ricevute"
                :value="session_content_question_received_answers"
            />
          </div>
          <div
              v-if="
              is_visible_received_answer &&
              session_content_answers_multiple_answers
            "
              class="multiple-answers__statistics"
          >
            <div
                v-for="option in session_content_answers_multiple_answers.answers_stat"
                :key="option.id"
                class="multiple-answers__range-text"
            >
              <RangeText
                  :title="option.option_text"
                  :received="option.received"
                  :percentage="option.percentage"
                  :right_answer="option.right_answer"
              />
            </div>
          </div>
          <div v-if="is_visible_answer">
            <CorretAnswers
                :multiple_answer_options="multiple_answer_options"
                :answer_reason="answer_reason"
            />
          </div>
          <footer class="multiple-answers__footer">
            <ButtonIcon
                v-if="!is_footer_visible"
                title="Ritorna"
                @click="goBack"
                :back="true"
            />
            <ButtonIcon
                v-if="is_footer_visible"
                title="Mostra risposta"
                @click="showAnswer"
            />
            <ButtonIcon
                v-if="is_footer_visible"
                title="Mostra risposte ricevute"
                :dark="true"
                @click="showReceivedAnswers"
            />
          </footer>
        </div>
      </div>
    </div>
    <TimerPopup
        v-if="is_timer_popup_visible"
        @close_emit="is_timer_popup_visible = false"
        :countdown_in_second="total_seconds"
        @emit_update="updateTotalSeconds"
        :question_id="question_id"
        :session_content_id="props.session_content_id"
    />
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
    margin-bottom: 20rem;
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
    justify-content: space-between;
    align-items: center;
    margin-top: 4rem;
    @media screen and (max-width: 576px) {
      display: block;
    }
    & > * {
      @media screen and (max-width: 576px) {
        margin-bottom: 3.2rem;
        width: 100% !important;
      }
    }
  }
  &__range-text {
    margin-bottom: 2rem;
  }
}
</style>