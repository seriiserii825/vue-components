<script setup>
import StartSurvey from "./StartSurvey.vue";
import SurveyQuestion from "./SurveyQuestion.vue";
import SurveyThanks from "./SurveyThanks.vue";
import Button from "../ui/Button.vue";
const emits = defineEmits(["emit_prev_question", "emit_next_question", "emit_start_survey"]);
const props = defineProps({
  survey_list: {
    type: Array,
    required: true
  },
  survey_start: {
    type: Boolean,
    required: false
  },
  is_question_visible: {
    type: Boolean,
    required: false
  },
  is_questions_completed: {
    type: Boolean,
    required: false
  },
  current_question: {
    type: Number,
    required: false
  },
  user_token: {
    type: String,
    required: false
  },
  event: {
    type: Object,
    required: false
  },
  local_storage_title: {
    type: String,
    required: false
  },
  session_content_id: {
    type: [String, Number],
    required: false
  },
  is_student_survey: {
    type: Boolean,
    required: false
  }
});
function prevQuestion() {
  emits('emit_prev_question');
}
function nextQuestion() {
  emits('emit_next_question');
}
function startSurveyEmit() {
  emits('emit_start_survey');
}
</script>
<template>
  <div class='survey'>
    <StartSurvey
        v-if="survey_list.length > 0 && !survey_start"
        @emit_start_survey="startSurveyEmit"
    />
    <div class="survey__question">
      <SurveyQuestion
          v-if="is_question_visible && survey_start && !is_questions_completed"
          :id="survey_list[current_question].id"
          :current_question="current_question + 1"
          :type="survey_list[current_question].type"
          :local_storage_title="local_storage_title"
      />
    </div>
    <SurveyThanks
        v-if="is_questions_completed"
        :user_token="user_token"
        :event_id="event.id"
        :event_slug="event.slug"
        :session_content_id="is_student_survey ? session_content_id : ''"
    />

    <footer v-if="survey_start && !is_questions_completed" class="survey__footer">
      <div class="survey__button">
        <Button
            v-if="current_question !== 0"
            @click="prevQuestion"
            color="wet-asphalt">Indietro
        </Button>
      </div>
      <div class="survey__button">
        <Button
            @click="nextQuestion"
            color="wet-asphalt">Avanti
        </Button>
      </div>
    </footer>
  </div>
</template>
<style lang="scss" scoped>
.survey {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 3.2rem;
  min-height: 85vh;
  &__footer {
    position: absolute;
    bottom: 6.4rem;
    left: 6.4rem;
    right: 6.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__button {
    flex: 0 0 20rem;
  }
}
</style>