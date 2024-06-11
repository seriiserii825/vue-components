<script setup>
import Timer from "../globals/Timer.vue";
import {useAxiosToken} from "../../hooks/useAxiosToken";
import {useSessionContentStore} from "../../stores/content-store";
import {storeToRefs} from "pinia";
import {computed, onMounted, onUnmounted, ref} from "vue";
import {useCookies} from "vue3-cookies";
import TimerPopup from "../popups/TimerPopup.vue";
import InfoBox from "../globals/InfoBox.vue";
import ButtonIcon from "../globals/ButtonIcon.vue";
import ImageBox from "../images/ImageBox.vue";
import RemainingTime from "../Globals/RemainingTime.vue";
let select_images_interval_id;
let remaining_time_interval_id;
const {cookies} = useCookies();
const sessionContentStore = useSessionContentStore();
const {
  session_content,
  session_content_question_received_answers,
  session_content_question_answers_select_image,
  session_content_question_remaining_time,
} = storeToRefs(sessionContentStore);
const loading = ref(false);
const is_timer_popup_visible = ref(false);
const is_visible_answer = ref(false);
const is_footer_visible = ref(true);
const is_received_answer_visible = ref(false);
const props = defineProps({
  question: {
    type: String,
    required: true,
  },
  select_image_option: {
    type: Object,
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
const images = ref(props.select_image_option);
const total_seconds = ref(props.countdown_in_second);
function updateTotalSeconds(value) {
  total_seconds.value = value;
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
async function handlerShowReceivedAnswers() {
  is_footer_visible.value = false;
  is_received_answer_visible.value = true;
  loading.value = true;
  selectImages();
  select_images_interval_id = setInterval(() => {
    selectImages();
  }, 5000);
  setTimeout(() => {
    loading.value = false;
  }, 2000);
}
function selectImages() {
  sessionContentStore.storeSessionContentQuestionAnswersSelectImage(
      props.session_content_id,
      {
        question_id: props.question_id,
      }
  );
}
async function handlerShowAnswer() {
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
    is_visible_answer.value = true;
    loading.value = false;
  } catch (error) {
    console.log(error, "error");
    loading.value = false;
  }
}
function goBack() {
  is_footer_visible.value = true;
  is_visible_answer.value = false;
  is_received_answer_visible.value = false;
  clearInterval(select_images_interval_id);
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
  try {
    await sessionContentStore.storeSessionContentQuestionReceivedAnswers(
        props.session_content_id,
        {
          question_id: props.question_id,
        }
    );
  } catch (e) {
    console.log(e, 'e')
  }
}
let intervalId;
onMounted(() => {
  init();
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
  clearInterval(select_images_interval_id);
  clearInterval(remaining_time_interval_id);
});
</script>
<template>
  <div class="select-images">
    <div class="select-images__title">
      <Timer
          v-if="is_footer_visible"
          @emit_timer_click="is_timer_popup_visible = true"
      />
    </div>
    <div class="select-images__remaining-time">
      <RemainingTime
          v-if="is_remaining_time_visible"
          :time="session_content_question_remaining_time.time"
      />
    </div>
    <h2 class="select-images__title">{{ question }}</h2>
    <div
        v-if="
        is_received_answer_visible &&
        session_content_question_answers_select_image
      "
        class="select-images__wrap"
        :class="{
        'select-images__wrap-two':
          session_content_question_answers_select_image.length === 2,
        'select-images__wrap-three':
          session_content_question_answers_select_image.length === 3,
        'select-images__wrap-four':
          session_content_question_answers_select_image.length === 4,
      }"
    >
      <div
          class="select-images__item"
          v-for="item in session_content_question_answers_select_image"
          :key="item.id"
      >
        <ImageBox
            :image="item.image"
            :percentage="item.percentage"
            :received="item.received"
            :right_answer="item.right_answer"
            :range="true"
        />
      </div>
    </div>
    <div
        v-else-if="is_visible_answer"
        class="select-images__wrap"
        :class="{
        'select-images__wrap-two': images.length === 2,
        'select-images__wrap-three': images.length === 3,
        'select-images__wrap-four': images.length === 4,
      }"
    >
      <div class="select-images__item" v-for="item in images" :key="item.id">
        <ImageBox :image="item.image" :right_answer="item.right_answer"/>
      </div>
    </div>
    <div
        v-else
        class="select-images__wrap"
        :class="{
        'select-images__wrap-two': images.length === 2,
        'select-images__wrap-three': images.length === 3,
        'select-images__wrap-four': images.length === 4,
      }"
    >
      <div class="select-images__item" v-for="item in images" :key="item.id">
        <ImageBox :image="item.image"/>
      </div>
    </div>
    <footer class="select-images__footer">
      <div v-if="is_footer_visible" class="select-images__info-box">
        <InfoBox
            v-if="
            session_content_question_received_answers ||
            session_content_question_received_answers === 0
          "
            label="Numero di risposte ricevute"
            :value="session_content_question_received_answers"
        />
      </div>
      <div class="select-images__actions">
        <ButtonIcon
            v-if="!is_footer_visible"
            title="Ritorna"
            @click="goBack"
            :back="true"
        />
        <ButtonIcon
            v-if="is_footer_visible"
            title="Mostra risposta"
            @click="handlerShowAnswer"
        />
        <ButtonIcon
            v-if="is_footer_visible"
            title="Mostra risposte ricevute"
            :dark="true"
            @click="handlerShowReceivedAnswers"
        />
      </div>
    </footer>

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
<style lang="scss" scoped>
.select-images {
  padding: 6.4rem;
  min-height: 100vh;
  background: #ffffff;
  border-right: 1px solid #d1f4ee;
  border-radius: 16px;
  @media screen and (max-width: 1200px) {
    padding: 6.4rem 3.2rem;
  }
  &__timer {
    margin-bottom: 3.2rem;
  }
  &__title {
    margin-bottom: 3.2rem;
    font-size: 3.2rem;
    font-weight: 600;
    line-height: 3.8rem;
    text-align: center;
    @media screen and (max-width: 1200px) {
      text-align: left;
    }
  }
  &__wrap {
    display: flex;
    justify-content: center;
    align-items: stretch;
    margin-bottom: 3.2rem;
    @media screen and (max-width: 1200px) {
      margin: 0 -1.6rem;
      flex-wrap: wrap;
      justify-content: initial;
      align-items: initial
    }
    @media screen and (max-width: 768px) {
      display: block;
      margin: 0;
    }
    &.select-images__wrap-two {
      .select-images__item {
        flex: 0 0 53rem;
      }
    }
    &.select-images__wrap-three {
      .select-images__item {
        flex: 1;
        margin-left: 3.5rem;
        margin-right: 3.5rem;
      }
    }
    &.select-images__wrap-four {
      .select-images__item {
        flex: 1;
      }
    }
  }
  &__item {
    margin: 0 1.6rem;
    cursor: pointer;
    @media screen and (max-width: 1200px) {
      margin: 0 1.6rem 3.2rem !important;
      flex: 0 0 calc(50% - 3.2rem) !important;
    }
    @media screen and (max-width: 768px) {
      margin: 0 0 3.2rem !important;
    }
    &--no-hover {
      cursor: default;
    }
    &:first-of-type {
      margin-left: 0;
    }
    &:last-of-type {
      margin-right: 0;
    }
  }
  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 768px) {
      display: block;
    }
  }
  &__info-box {
    flex: 0 0 35rem;
    @media screen and (max-width: 768px) {
      margin-bottom: 3.2rem;
    }
  }
  &__actions {
    flex: 0 0 50rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 576px) {
      display: block;
    }
    & > * {
      @media screen and (max-width: 576px) {
        margin-bottom: 1.6rem;
        width: 100%;
      }
    }
  }
}
</style>