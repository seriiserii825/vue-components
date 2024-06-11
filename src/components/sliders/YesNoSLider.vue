<script setup>
import {computed, onMounted, onUnmounted} from "vue";
import {ref} from "@vue/reactivity";
import {useSessionContentStore} from "../../stores/content-store";
import {storeToRefs} from "pinia";
import {useCookies} from "vue3-cookies";
import {useAxiosToken} from "../../hooks/useAxiosToken";
import RangeBar from "../rangers/RangeBar.vue";
import InfoBox from "../globals/InfoBox.vue";
import RightAnswer from "../globals/RightAnswer.vue";
import Timer from "../globals/Timer.vue";
import TimerPopup from "../popups/TimerPopup.vue";
import ButtonIcon from "../globals/ButtonIcon.vue";
import RemainingTime from "../Globals/RemainingTime.vue";
import {usePopupStore} from "../../stores/popup-store";
const popup_store = usePopupStore();
let intervalId;
let received_answer_interval_id;
let remaining_time_interval_id;
const {cookies} = useCookies();
const is_timer_popup_visible = ref(false);
const is_received_answer_visible = ref(false);
const is_answer_visible = ref(false);
const is_footer_visible = ref(true);
const sessionContentStore = useSessionContentStore();
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
  current_page: {
    type: Number,
    required: true,
  },
  preview: {
    type: String,
    required: true,
  }
});
const {
  session_content,
  session_content_question_answer_yes_no,
  session_content_question_received_answers,
  session_content_question_remaining_time,
} = storeToRefs(sessionContentStore);
const loading = ref(true);
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
function getRemainingTime() {
  sessionContentStore.storeSessionContentQuestionRemainingTime(
      props.session_content_id,
      {
        question_id: props.question_id,
        preview: false,
      }
  );
}
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
  sessionContentStore.storeSessionContentShowAnswer(props.session_content_id, {
    question_id: props.question_id,
    preview: true,
  });
  is_answer_visible.value = true;
}
function goBack() {
  is_footer_visible.value = true;
  is_received_answer_visible.value = false;
  is_answer_visible.value = false;
  clearInterval(received_answer_interval_id);
}
const is_remaining_time_visible = computed(() => {
  return !is_answer_visible.value && session_content_question_remaining_time.value &&
      session_content_question_remaining_time.value.time !== 0
});
async function init() {
  const user_token = cookies.get("userToken");
  useAxiosToken(user_token);
  try {
    await sessionContentStore.storeSessionContentStartTimer(
        props.session_content_id,
        {question_id: props.question_id}
    );
    loading.value = false;
  } catch (e) {
    console.log(e, 'e')
    loading.value = false;
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
}
onMounted(() => {
  init();
  sessionContentStore.storeSessionContentQuestionReceivedAnswers(
      props.session_content_id,
      {
        question_id: props.question_id,
      }
  );
  intervalId = setInterval(() => {
    sessionContentStore.storeSessionContentQuestionReceivedAnswers(
        props.session_content_id,
        {
          question_id: props.question_id,
        }
    );
  }, 5000);
  getRemainingTime();
  remaining_time_interval_id = setInterval(() => {
    getRemainingTime();
  }, 5000);
});
onUnmounted(() => {
  clearInterval(intervalId);
  clearInterval(received_answer_interval_id);
  clearInterval(remaining_time_interval_id);
});
</script>
<template>
  <div class="yes-no-slider">
    <div class="yes-no-slider__wrap">
      <div class="yes-no-slider__content">
        <Timer
            v-if="!is_received_answer_visible && !is_answer_visible"
            @emit_timer_click="is_timer_popup_visible = true"
        />
        <div
            class="yes-no-slider__remaining-time"
            :class="{
            'yes-no-slider__remaining-time--down': is_received_answer_visible,
          }"
        >
          <RemainingTime
              v-if="is_remaining_time_visible"
              :time="session_content_question_remaining_time.time"
          />
        </div>
        <div class="yes-no-slider__question">{{ question }}</div>
        <InfoBox
            v-if="session_content_question_received_answers && is_footer_visible"
            label="Numero di risposte ricevute"
            :value="session_content_question_received_answers"
        />
        <RightAnswer v-if="is_answer_visible">
          <InfoBox
              label="La Risposta corretta è"
              :value="
              session_content.question_content.right_answer_yes_no === 0
                ? 'No'
                : 'Si'
            "
              width="300px"
          />
          <div class="right-answer__text">
            {{ session_content.question_content.answer_reason }}
          </div>
        </RightAnswer>
        <div v-if="is_received_answer_visible" class="yes-no-slider__ranges">
          <div
              v-if="session_content_question_answer_yes_no"
              class="yes-no-slider__range"
          >
            <RangeBar
                :success="!session_content_question_answer_yes_no.right_answer"
                :percentage="session_content_question_answer_yes_no.answers_no"
                label="Risposte ricevute"
                title="No"
                :value="session_content_question_answer_yes_no.no_received"
            />
          </div>
          <div
              v-if="session_content_question_answer_yes_no"
              class="yes-no-slider__range"
          >
            <RangeBar
                :success="session_content_question_answer_yes_no.right_answer"
                :percentage="session_content_question_answer_yes_no.answers_yes"
                label="Risposte ricevute"
                title="Si"
                :value="session_content_question_answer_yes_no.yes_received"
            />
          </div>
        </div>
        <footer class="yes-no-slider__footer">
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
              @click="showReceivedAnswer"
              :dark="true"
          />
        </footer>
      </div>
      <div class="yes-no-slider__img">
        <img
            @click="showImagePopup(image)"
            :src="image" alt=""/>
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
    cursor: pointer;
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
    @media screen and (max-width: 768px) {
      display: block;
    }
    & > * {
      @media screen and (max-width: 768px) {
        margin-bottom: 3.2rem;
      }
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
}
</style>