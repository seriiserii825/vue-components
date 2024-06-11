<script setup>
import {useSessionContentStore} from "../../stores/content-store";
import {useAxiosToken} from "../../hooks/useAxiosToken";
import {computed, onMounted, onUnmounted, ref} from "vue";
import RemainingTime from "../Globals/RemainingTime.vue";
import {storeToRefs} from "pinia";
import {useCookies} from "vue3-cookies";
import draggable from 'vuedraggable';
import DragItem from "./DragItem.vue";
import DragBlock from "./DragBlock.vue";
import Timer from "../globals/Timer.vue";
import TimerPopup from "../popups/TimerPopup.vue";
import InfoBox from "../globals/InfoBox.vue";
import ButtonIcon from "../globals/ButtonIcon.vue";
import DragReceived from "./DragReceived.vue";
import DragAnswer from "./DragAnswer.vue";
const loading = ref(false);
let remaining_time_interval_id;
const {cookies} = useCookies();
const sessionContentStore = useSessionContentStore();
const {
  session_content,
  session_content_question_received_answers,
  session_content_question_remaining_time,
} = storeToRefs(sessionContentStore);
const props = defineProps({
  question: {
    type: String,
    required: true
  },
  session_content_id: {
    type: String,
    required: true
  },
  question_id: {
    type: Number,
    required: true
  },
  number_of_dragging_box: {
    type: Number,
    required: true
  },
  dragging_box_title_1: {
    type: String,
    required: false
  },
  dragging_box_title_2: {
    type: String,
    required: false
  },
  dragging_box_title_3: {
    type: String,
    required: false
  },
  dragging_box_title_4: {
    type: String,
    required: false
  },
  dragging_option: {
    type: Array,
    required: true
  },
  answer_reason: {
    type: String,
    required: true
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
const wrap_class = ref('');
switch (props.number_of_dragging_box) {
  case 2:
    wrap_class.value = 'drag-wrap--double';
    break;
  case 3:
    wrap_class.value = 'drag-wrap--triple';
    break;
  case 4:
    wrap_class.value = 'drag-wrap--quadruple';
    break;
  default:
    wrap_class.value = 'drag-wrap--double';
    break;
}
const refs = {
  list1: ref([]),
  list2: ref([]),
  list3: ref([]),
  list4: ref([]),
};
const total_seconds = ref(props.countdown_in_second);
function updateTotalSeconds(value) {
  total_seconds.value = value;
}
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
const list_bottom = ref([]);
const is_timer_popup_visible = ref(false);
const is_footer_visible = ref(true);
const is_received_answer_visible = ref(false);
const is_answer_visible = ref(false);
function goBack() {
  is_footer_visible.value = true;
  is_received_answer_visible.value = false;
  is_answer_visible.value = false;
}
function getRemainingTime() {
  sessionContentStore.storeSessionContentQuestionRemainingTime(props.session_content_id, {
    question_id: props.question_id,
    preview: false
  });
}
async function showAnswer() {
  is_footer_visible.value = false;
  is_answer_visible.value = true;
  is_received_answer_visible.value = false;
  await sessionContentStore.storeSessionContentShowAnswer(props.session_content_id, {
    question_id: props.question_id,
    preview: true
  });
}
const showReceivedAnswer = async () => {
  is_footer_visible.value = false;
  is_answer_visible.value = false;
  is_received_answer_visible.value = true;
}
function log(evt) {
  // console.log(evt);
}
const is_remaining_time_visible = computed(() => {
  return session_content_question_remaining_time.value && session_content_question_remaining_time.value.time !== 0
});
let intervalId;
async function init() {
  const user_token = cookies.get('userToken');
  useAxiosToken(user_token);
  try {
    await sessionContentStore.storeSessionContentStartTimer(props.session_content_id, {question_id: props.question_id});
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
  }catch (e) {
  	console.log(e, 'e')
  }
}
function compareValues(key, order = 'asc') {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }
    const varA = (typeof a[key] === 'string') ?
        a[key].toUpperCase() : a[key];
    const varB = (typeof b[key] === 'string') ?
        b[key].toUpperCase() : b[key];
    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return (
        (order === 'desc') ? (comparison * -1) : comparison
    );
  };
}
function fillColumns() {
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
}
onMounted(() => {
  init();
  getRemainingTime();
  list_bottom.value = props.dragging_option;
  fillColumns();
  remaining_time_interval_id = setInterval(() => {
    getRemainingTime();
  }, 5000);
  sessionContentStore.storeSessionContentQuestionReceivedAnswers(props.session_content_id, {
    question_id: props.question_id
  });
  intervalId = setInterval(() => {
    sessionContentStore.storeSessionContentQuestionReceivedAnswers(props.session_content_id, {
      question_id: props.question_id
    });
  }, 5000);
});
onUnmounted(() => {
  clearInterval(remaining_time_interval_id);
  clearInterval(intervalId);
});
</script>
<template>
  <div class='draggable-box  myscrollbar'>
    <header
        v-if="is_footer_visible"
        class="draggable-box__header">
      <div class="draggable-box__remaining-time">
        <RemainingTime
            v-if="is_remaining_time_visible"
            :time="session_content_question_remaining_time.time"
        />
      </div>
      <Timer
          @emit_timer_click="is_timer_popup_visible = true"
      />
    </header>
    <div
        v-if="is_footer_visible"
        class="draggable-box__wrap"
        :class="wrap_class"
    >
      <div
          class="draggable-box__item"
          v-for="(item) in number_of_dragging_box"
          :key="item"
      >
        <DragBlock
            :title="getTitle(item)"
            :double="number_of_dragging_box !== 4"
        >
          <div class="list-group">
            <DragItem
                v-for="(element, index) in getListItem(item)"
                :id="element.id"
                :dark="true"
                :title="element.option_text"
                :no_remove="true"
            />
          </div>
        </DragBlock>
      </div>
    </div>
    <div v-if="dragging_option && is_footer_visible" class="draggable-box__container">
      <div class="list-group">
        <DragItem
            v-for="(element, index) in list_bottom"
            :id="element.id"
            :title="element.option_text"
            :key="element.id"
        />
      </div>
    </div>
    <DragReceived
        v-if="is_received_answer_visible"
        :session_content_id="session_content_id"
        :question_id="question_id"
    />
    <DragAnswer
        v-if="is_answer_visible"
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
    <footer class="draggable-box__footer">
      <div
          v-if="is_footer_visible"
          class="draggable-box__info">
        <InfoBox
            v-if="session_content_question_received_answers || session_content_question_received_answers === 0"
            label="Numero di risposte ricevute"
            :value="session_content_question_received_answers"
        />
      </div>
      <div class="draggable-box__actions">
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
      </div>
    </footer>
  </div>
  <TimerPopup
      v-if="is_timer_popup_visible"
      @close_emit="is_timer_popup_visible = false"
      :question_id="question_id"
      :session_content_id="session_content_id"
      :countdown_in_second="total_seconds"
      @emit_update="updateTotalSeconds"
  />
</template>
<style lang="scss">
.draggable-box {
  padding: 3.2rem;
  //height: calc(100vh - 6.6rem);
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
    @media screen and (max-width: 992px) {
      display: block;
    }
  }
  &__info {
    flex: 0 0 40rem;
    @media screen and (max-width: 992px) {
      margin-bottom: 3.2rem;
    }
  }
  &__actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex: 1;
    @media screen and (max-width: 576px) {
      display: block;
    }
    .button-icon {
      margin-left: 1.6rem;
      flex: 0 0 30rem;
    }
    & > * {
      @media screen and (max-width: 576px) {
        margin-bottom: 3.2rem;
        width: 100% !important;
      }
    }
  }
  &__btn {
    flex: 0 0 20rem;
  }
}
</style>