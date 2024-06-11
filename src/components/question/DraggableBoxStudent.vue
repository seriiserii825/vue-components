<script setup>
import {useSessionContentStore} from "../../stores/content-store";
import {useAxiosToken} from "../../hooks/useAxiosToken";
import {computed, onMounted, onUnmounted, ref, watch} from "vue";
import RemainingTime from "../Globals/RemainingTime.vue";
import {storeToRefs} from "pinia";
import {useCookies} from "vue3-cookies";
import draggable from "vuedraggable";
import DragItem from "./DragItem.vue";
import DragBlock from "./DragBlock.vue";
import InfoBox from "../globals/InfoBox.vue";
import Button from "../ui/Button.vue";
import DragAnswer from "./DragAnswer.vue";
import Preloader from "../ui/Preloader.vue";
const loading = ref(false);
let remaining_time_interval_id;
const {cookies} = useCookies();
const sessionContentStore = useSessionContentStore();
const {
  session_content,
  session_content_question_received_answers,
  session_content_question_remaining_time,
  session_content_question_answer_sent,
} = storeToRefs(sessionContentStore);
const props = defineProps({
  question: {
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
  number_of_dragging_box: {
    type: Number,
    required: true,
  },
  dragging_box_title_1: {
    type: String,
    required: false,
  },
  dragging_box_title_2: {
    type: String,
    required: false,
  },
  dragging_box_title_3: {
    type: String,
    required: false,
  },
  dragging_box_title_4: {
    type: String,
    required: false,
  },
  dragging_option: {
    type: Array,
    required: true,
  },
  answer_reason: {
    type: String,
    required: true,
  },
});
const wrap_class = ref("");
switch (props.number_of_dragging_box) {
  case 2:
    wrap_class.value = "drag-wrap--double";
    break;
  case 3:
    wrap_class.value = "drag-wrap--triple";
    break;
  case 4:
    wrap_class.value = "drag-wrap--quadruple";
    break;
  default:
    wrap_class.value = "drag-wrap--double";
    break;
}
const list_bottom = ref([]);
const refs = {
  list1: ref([]),
  list2: ref([]),
  list3: ref([]),
  list4: ref([]),
};
function getListItem(item) {
  switch (item) {
    case 1:
      return refs.list1.value;
    case 2:
      return refs.list2.value;
    case 3:
      return refs.list3.value;
    case 4:
      return refs.list4.value;
    default:
      return refs.list2.value;
  }
}
function getTitle(item) {
  switch (item) {
    case 1:
      return props.dragging_box_title_1;
    case 2:
      return props.dragging_box_title_2;
    case 3:
      return props.dragging_box_title_3;
    case 4:
      return props.dragging_box_title_4;
    default:
      return props.dragging_box_title_1;
  }
}
const dragOptions = ref({
  animation: 200,
  group: "description",
  disabled: false,
  ghostClass: "ghost",
});
const drag = ref(false);
function removeItem(id, list_var) {
  const item = refs[list_var].value.find((item) => item.id === id);
  list_bottom.value.push(item);
  refs[list_var].value = refs[list_var].value.filter((item) => item.id !== id);
}
const is_footer_visible = ref(true);
const is_received_answer_visible = ref(true);
const is_answer_visible = ref(true);
function goBack() {
  is_footer_visible.value = true;
  is_received_answer_visible.value = false;
  is_answer_visible.value = false;
  clearInterval(received_answer_interval_id);
}
function log(evt) {
  // console.log(evt);
}
function compareValues(key, order = "asc") {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }
    const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];
    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === "desc" ? comparison * -1 : comparison;
  };
}
function fillColumnsForAnswer() {
  list_bottom.value = props.dragging_option;
  const list1_array = list_bottom.value.filter(item => item.right_box === 1);
  list1_array.sort(compareValues('order_index'));
  refs.list1.value = list1_array;
  const list2_array = list_bottom.value.filter(item => item.right_box === 2);
  list2_array.sort(compareValues('order_index'));
  refs.list2.value = list2_array;
  const list3_array = list_bottom.value.filter(item => item.right_box === 3);
  list3_array.sort(compareValues('order_index'));
  refs.list3.value = list3_array;
  const list4_array = list_bottom.value.filter(item => item.right_box === 4);
  list4_array.sort(compareValues('order_index'));
  refs.list4.value = list4_array;
  console.log(refs.list1.value, 'refs.list1.value')
  console.log(refs.list2.value, 'refs.list2.value')
  console.log(refs.list3.value, 'refs.list3.value')
  console.log(refs.list4.value, 'refs.list4.value')
}
function setToLocalStorage() {
  localStorage.setItem("list_1", JSON.stringify(refs.list1.value));
  localStorage.setItem("list_2", JSON.stringify(refs.list2.value));
  localStorage.setItem("list_3", JSON.stringify(refs.list3.value));
  localStorage.setItem("list_4", JSON.stringify(refs.list4.value));
}
const is_empty_columns = computed(() => {
  return (
      refs.list1.value.length === 0 &&
      refs.list2.value.length === 0 &&
      refs.list3.value.length === 0 &&
      refs.list4.value.length === 0
  );
});
const is_visible_answer_computed = computed(() => {
  const result =
      session_content_question_remaining_time.value &&
      session_content_question_remaining_time.value.show_answer === 1 &&
      session_content_question_answer_sent.value && is_empty_columns.value === false;
  return result;
});
async function sendData(data) {
  for (const item of data) {
    try {
      await sessionContentStore.storeSessionContentAnswerQuestionDraggingAnswer(
          props.session_content_id,
          {
            question_id: props.question_id,
            option_id: item.option_id,
            box_number: item.box_number,
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
watch(
    () => session_content_question_remaining_time.value,
    (value) => {
      // console.log(value.show_answer && session_content_question_answer_sent.value,
      //     'value.show_answer && session_content_question_answer_sent')
      if (value.show_answer && session_content_question_answer_sent.value) {
        fillColumnsForAnswer();
      }
    }
);
function fillFromLocalStorage() {
  const list_1 = JSON.parse(localStorage.getItem("list_1"));
  const list_2 = JSON.parse(localStorage.getItem("list_2"));
  const list_3 = JSON.parse(localStorage.getItem("list_3"));
  const list_4 = JSON.parse(localStorage.getItem("list_4"));
  refs.list1.value = list_1;
  refs.list2.value = list_2;
  refs.list3.value = list_3;
  refs.list4.value = list_4;
}
async function onSubmit() {
  loading.value = true;
  const questions = [];
  refs.list1.value.forEach((item) => {
    questions.push({
      option_id: item.id,
      box_number: 0,
    });
  });
  refs.list2.value.forEach((item) => {
    questions.push({
      option_id: item.id,
      box_number: 1,
    });
  });
  refs.list3.value.forEach((item) => {
    questions.push({
      option_id: item.id,
      box_number: 2,
    });
  });
  refs.list4.value.forEach((item) => {
    questions.push({
      option_id: item.id,
      box_number: 3,
    });
  });
  try {
    await sendData(questions);
    loading.value = false;
  } catch (e) {
    console.log(e, 'e')
    loading.value = false;
  }
  loading.value = false;
  is_footer_visible.value = false;
  setToLocalStorage()
  try {
    await checkIfAnswerWasSent();
  } catch (error) {
    console.log(error, "error");
  }
}
async function init() {
  const user_token = cookies.get("userToken");
  useAxiosToken(user_token);
  list_bottom.value = props.dragging_option;
  try {
    await checkIfAnswerWasSent();
    loading.value = false;
  } catch (e) {
    console.log(e, 'e')
    loading.value = false;
  }
  try {
    await getRemainingTime();
    if (session_content_question_remaining_time.value.show_answer && session_content_question_answer_sent.value) {
      fillColumnsForAnswer();
    }
    remaining_time_interval_id = setInterval(async () => {
      await getRemainingTime();
    }, 5000);
  } catch (e) {
    console.log(e, 'e')
  }
  if (session_content_question_remaining_time.value &&
      session_content_question_remaining_time.value.show_answer === 0 &&
      session_content_question_answer_sent.value) {
    console.log('fillFromLocalStorage');
    fillFromLocalStorage();
  }
}
onMounted(() => {
  init();
});
onUnmounted(() => {
  clearInterval(remaining_time_interval_id);
});
</script>
<template>
  <div class="draggable-box">
    <header class="draggable-box__header">
      <div class="draggable-box__remaining-time">
        <RemainingTime
            v-if="is_remaining_time_visible" :time="session_content_question_remaining_time.time"
        />
      </div>
      <h3 class="draggable-box__main-title">{{ question }}</h3>
    </header>
    <DragAnswer
        v-if="is_visible_answer_computed"
        :question="question"
        :number_of_dragging_box="number_of_dragging_box"
        :dragging_box_title_1="dragging_box_title_1"
        :dragging_box_title_2="dragging_box_title_2"
        :dragging_box_title_3="dragging_box_title_3"
        :dragging_box_title_4="dragging_box_title_4"
        :list1="refs.list1"
        :list2="refs.list2"
        :list3="refs.list3"
        :list4="refs.list4"
        :answer_reason="answer_reason"
    />
    <div v-else>
      <div class="draggable-box__wrap" :class="wrap_class">
        <div
            class="draggable-box__item"
            v-for="item in number_of_dragging_box"
            :key="item"
        >
          <DragBlock
              :title="getTitle(item)"
              :double="number_of_dragging_box !== 4"
          >
            <transition-group>
              <draggable
                  class="list-group"
                  :list="getListItem(item)"
                  group="people"
                  @change="log"
                  itemKey="name"
                  chosen-class="chosen"
                  key="dragggable"
                  v-bind="dragOptions"
                  @start="drag = true"
                  @end="drag = false"
              >
                <template #item="{ element }">
                  <DragItem
                      :id="element.id"
                      :dark="true"
                      :title="element.option_text"
                      @emit_remove="removeItem(element.id, `list${item}`)"
                  />
                </template>
              </draggable>
            </transition-group>
          </DragBlock>
        </div>
      </div>
      <div v-if="dragging_option" class="draggable-box__container">
        <transition-group>
          <draggable
              class="list-group"
              :list="list_bottom"
              group="people"
              @change="log"
              itemKey="name"
              key="dragggable"
              v-bind="dragOptions"
              @start="drag = true"
              @end="drag = false"
          >
            <template #item="{ element }">
              <DragItem :id="element.id" :title="element.option_text"/>
            </template>
          </draggable>
        </transition-group>
      </div>
    </div>
    <footer v-if="session_content_question_answer_sent === false"
            class="draggable-box__footer">
      <div class="draggable-box__info">
        <InfoBox
            v-if="
            session_content_question_received_answers ||
            session_content_question_received_answers === 0
          "
            label="Numero di risposte ricevute"
            :value="session_content_question_received_answers"
        />
      </div>
      <div class="draggable-box__actions">
        <Preloader v-if="loading"/>
        <div v-else class="draggable-box__btn">
          <Button
              v-if="session_content_question_answer_sent !== true"
              color="wet-asphalt"
              @click="onSubmit"
              :disabled="is_empty_columns || session_content_question_remaining_time?.time === 0"
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
.draggable-box {
  padding: 3.2rem;
  background: #fff;
  border-radius: 16px;
  &__header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 3.2rem;
    @media screen and (max-width: 1200px) {
      display: block;
    }
  }
  &__remaining-time {
    margin-right: 3.2rem;
    @media screen and (max-width: 1200px) {
      margin-bottom: 3.2rem;
    }
  }
  &__main-title {
    font-size: 2rem;
    font-weight: 600;
  }
  &__wrap {
    display: flex;
    margin: 0 -1.6rem 6.4rem;
    @media screen and (max-width: 1200px) {
      flex-wrap: wrap;
    }
    &.drag-wrap--double {
      .draggable-box__item {
        flex: 0 0 calc(50% - 3.2rem);
        @media screen and (max-width: 1200px) {
          margin: 0 0 3.2rem;
          flex: 0 0 100%;
        }
      }
    }
    &.drag-wrap--triple {
      @media screen and (max-width: 1500px) {
        flex-wrap: wrap;
      }
      .draggable-box__item {
        flex: 0 0 calc(33.33% - 3.2rem);
        @media screen and (max-width: 1500px) {
          margin-bottom: 3.2rem;
          flex: 0 0 calc(50% - 3.2rem);
        }
        @media screen and (max-width: 1200px) {
          margin: 0 0 3.2rem;
          flex: 0 0 100%;
        }
      }
    }
    &.drag-wrap--quadruple {
      @media screen and (max-width: 1500px) {
        flex-wrap: wrap;
      }
      .draggable-box__item {
        margin-bottom: 3.2rem;
        flex: 0 0 calc(25% - 3.2rem);
        @media screen and (max-width: 1500px) {
          flex: 0 0 calc(50% - 3.2rem);
        }
        @media screen and (max-width: 1200px) {
          margin: 0 0 3.2rem;
          flex: 0 0 100%;
        }
      }
    }
  }
  &__container {
    margin-bottom: 3.2rem;
    padding: 3.2rem;
    background: #e6fffa;
    border-radius: 1.6rem;
    .list-group {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -1.6rem;
      .drag-item {
        margin: 0 1.6rem 1.6rem;
        flex: 0 0 calc(25% - 3.2rem);
        @media screen and (max-width: 1200px) {
          flex: 0 0 calc(50% - 3.2rem);
        }
        @media screen and (max-width: 576px) {
          margin: 0 0 1.6rem;
          flex: 0 0 100%;
        }
      }
    }
  }
  &__item {
    margin: 0 1.6rem;
  }
  &__title {
    margin-bottom: 3.2rem;
    font-size: 3.2rem;
    font-weight: 600;
  }
  &__remaining-time {
    position: relative;
    top: -0.2rem;
  }
  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 576px) {
      display: block;
    }
  }
  &__info {
    flex: 0 0 40rem;
  }
  &__actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex: 1;
    .button-icon {
      margin-left: 1.6rem;
      flex: 0 0 30rem;
    }
  }
  &__btn {
    flex: 0 0 20rem;
  }
}
</style>