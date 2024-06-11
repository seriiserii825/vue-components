<script setup>
import {useSessionContentStore} from "../../stores/content-store";
import {onMounted, onUnmounted, ref} from "vue";
import {storeToRefs} from "pinia";
import DragColumn from "./DragColumn.vue";
import {computed} from "@vue/runtime-core";
const sessionContentStore = useSessionContentStore();
const {
  session_content_question_answer_dragging_answer
} = storeToRefs(sessionContentStore);
const props = defineProps({
  session_content_id: {
    type: [String, Number],
    required: true
  },
  question_id: {
    type: Number,
    required: true
  },
});
const boxes_stat = ref([]);
const wrap_class = computed(() => {
  switch (boxes_stat.value.length) {
    case 2:
      return 'drag-received__row--double';
    case 3:
      return 'drag-received__row--triple';
    case 4:
      return 'drag-received__row--quadruple';
    default:
      return '';
  }
});
async function getDraggingAnswer() {
  await sessionContentStore.storeSessionContentQuestionAnswerDraggingAnswer(props.session_content_id, {
    question_id: props.question_id,
  });
  boxes_stat.value = session_content_question_answer_dragging_answer.value.boxes_stat;
}
let drag_interval;
function init() {
  getDraggingAnswer();
  drag_interval = setInterval(() => {
    console.log(props.question_id, 'props.question_id')
    getDraggingAnswer();
  }, 5000);
}
onMounted(() => {
  init();
});
onUnmounted(() =>{
  clearInterval(drag_interval);
})
</script>
<template>
  <div class='drag-received'>
    <div
        class="drag-received__row"
        :class="wrap_class"
    >
      <div
          v-for="(box, index) in boxes_stat"
          :key="index"
          class="drag-received__column"
      >
        <DragColumn
            :item="box"
        />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.drag-received {
  &__row {
    display: flex;
    margin: 0 -1.6rem;
    &.drag-received__row--quadruple {
      .drag-received__column {
        flex: 0 0 calc(25% - 3.2rem);
      }
    }
    &.drag-received__row--triple {
      .drag-received__column {
        flex: 0 0 calc(33.33% - 3.2rem);
      }
    }
    &.drag-received__row--double {
      .drag-received__column {
        flex: 0 0 calc(50% - 3.2rem);
      }
    }
  }
  &__column {
    margin: 0 1.6rem;
    flex: 0 0 calc(25% - 3.2rem);
  }
}
</style>