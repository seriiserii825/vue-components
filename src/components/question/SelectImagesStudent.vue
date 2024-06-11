<script lang="ts" setup>
import {useAxiosToken} from "../../hooks/useAxiosToken";
import {useSessionContentStore} from "../../stores/content-store";
import {storeToRefs} from "pinia";
import {computed, onMounted, onUnmounted, ref, watch} from "vue";
import {useCookies} from "vue3-cookies";
import Button from "../ui/Button.vue";
import ImageBoxChecked from "../images/ImageBoxChecked.vue";
import RemainingTime from "../Globals/RemainingTime.vue";

let remaining_time_interval_id;
const {cookies} = useCookies();
const sessionContentStore = useSessionContentStore();
const {
  session_content_question_remaining_time,
  session_content_question_answer_sent,
} = storeToRefs(sessionContentStore);
const loading = ref(false);
const is_visible_answer = ref(false);
const is_footer_visible = ref(true);
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
  countdown_in_second: {
    type: String,
    required: true,
  },
  mutually_exclusive: {
    type: Boolean,
    required: true,
  },
});
const images = ref([]);

async function sendData(data) {
  for (const item of data) {
    try {
      await sessionContentStore.storeSessionContentAnswerQuestionSelectImage(
          props.session_content_id,
          {
            question_id: props.question_id,
            option_id: item.id,
          }
      );
    } catch (error) {
      console.log(error, "error");
    }
  }
  loading.value = false;
}

const is_remaining_time_visible = computed(() => {
  return session_content_question_remaining_time.value && session_content_question_remaining_time.value.time !== 0
});

const has_empty_answer_computed = computed(() => {
  return images.value.every((item) => item.right_answer === false) || session_content_question_remaining_time.value.time === 0;
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

async function getRemainingTime() {
  await sessionContentStore.storeSessionContentQuestionRemainingTime(
      props.session_content_id,
      {
        question_id: props.question_id,
        preview: false,
      }
  );
}

function resetRightAnswers() {
  images.value = images.value.map((item) => {
    return {
      ...item,
      right_answer: false,
    };
  });
}

function updateRightAnswer({id, right_answer}) {
  if (props.mutually_exclusive) {
    resetRightAnswers();
  }

  images.value = images.value.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        right_answer: right_answer,
      };
    }
    return item;
  });
}

const is_visible_answer_computed = computed(() => {
  return session_content_question_remaining_time.value &&
      session_content_question_remaining_time.value.show_answer === 1 &&
      session_content_question_answer_sent.value;
});
watch(
    () => session_content_question_remaining_time.value,
    (value) => {
      if (value.show_answer) {
        images.value = props.select_image_option;
      }
    }
);

async function onSubmit() {
  loading.value = true;
  is_footer_visible.value = false;
  const ids = images.value.filter((item) => item.right_answer === true);
  localStorage.setItem("slider_images", JSON.stringify(ids));
  try {
    await sendData(ids);
    await checkIfAnswerWasSent();
    loading.value = false;
  } catch (error) {
    console.log(error, "error");
    loading.value = false;
  }
}

async function init() {
  loading.value = true;
  images.value = props.select_image_option;
  const user_token = cookies.get("userToken");
  useAxiosToken(user_token);
  try {
    await getRemainingTime();
    await checkIfAnswerWasSent();
    const is_show_answer =
        session_content_question_remaining_time.value.show_answer === 1 &&
        session_content_question_answer_sent.value === true;
    console.log(is_show_answer, "--- is_show_answer");
    if (is_show_answer) {
      images.value = props.select_image_option;
    } else if (session_content_question_answer_sent.value === true) {
      const lc_images = JSON.parse(localStorage.getItem("slider_images"));
      const ids = lc_images.map((item) => item.id);
      console.log(lc_images, "--- lc_images");
      if (lc_images) {
        images.value = images.value.map((item) => {
          return {
            ...item,
            right_answer: ids.includes(item.id),
          };
        });
      }
    } else {
      console.log(images.value, "--- images.value");
      images.value = images.value.map((item) => {
        return {
          ...item,
          right_answer: false,
        };
      });
    }
    loading.value = false;
  } catch (error) {
    console.log(error, "--- error");
    loading.value = false;
  }
  remaining_time_interval_id = setInterval(() => {
    getRemainingTime();
  }, 5000);
}

let intervalId;
onMounted(() => {
  init();
});
onUnmounted(() => {
  clearInterval(remaining_time_interval_id);
});
</script>
<template>
  <div v-if="loading"></div>
  <div v-else class="select-images">
    <div class="select-images__remaining-time">
      <RemainingTime
          v-if="is_remaining_time_visible" :time="session_content_question_remaining_time.time"
      />
    </div>
    <h2 class="select-images__title">{{ question }}</h2>
    <div
        v-if="is_visible_answer_computed"
        class="select-images__wrap select-images__wrap--answer"
        :class="{
        'select-images__wrap-two': images.length === 2,
        'select-images__wrap-three': images.length === 3,
        'select-images__wrap-four': images.length === 4,
      }"
    >
      <div
          class="select-images__item select-images__item--no-hover"
          v-for="item in images"
          :key="item.id"
      >
        <ImageBoxChecked
            :id="item.id"
            :image="item.image"
            :right_answer="item.right_answer"
        />
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
        <ImageBoxChecked
            :id="item.id"
            :image="item.image"
            :right_answer="item.right_answer"
            @emit_right_answer="updateRightAnswer"
            :preview="session_content_question_answer_sent === true"
        />
      </div>
    </div>
    <footer v-if="!is_visible_answer" class="select-images__footer">
      <div class="select-images__actions">
        <div class="select-images__btn">
          <Button
              v-if="
              session_content_question_answer_sent !== true &&
              session_content_question_remaining_time !== 0
            "
              color="wet-asphalt"
              :disabled="has_empty_answer_computed"
              @click="onSubmit"
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
      </div>
    </footer>
  </div>
</template>
<style lang="scss">
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
    justify-content: flex-end;
    align-items: center;
  }
  &__info-box {
    flex: 0 0 35rem;
  }
  &__actions {
    flex: 0 0 50rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>