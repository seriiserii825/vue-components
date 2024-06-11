<script setup>
import {useCookies} from "vue3-cookies";
import {onMounted} from "vue";
import HeaderNavigation from "../layouts/HeaderNavigation.vue";
import {storeToRefs} from "pinia";
import EventInformation from "../components/events/EventInformation.vue";
import Navigation from "../components/globals/Navigation.vue";
import {useRoute} from "vue-router";
import BurgerMenu from "../components/navigation/BurgerMenu.vue";
import PagesSlider from "../components/sliders/PagesSlider.vue";
import {ref} from "@vue/reactivity";
import SingleSlide from "../components/sliders/SingleSlide.vue";
import {useSessionContentStore} from "../stores/content-store";
import {useAxiosToken} from "../hooks/useAxiosToken";
import Background from "../components/globals/Background.vue";
import Loading from "../components/globals/Loading.vue";
import {computed} from "@vue/runtime-core";
import TwoColumnsSlider from "../components/sliders/TwoColumnsSlider.vue";
import SliderBox from "../components/sliders/SliderBox.vue";
import YesNoSLider from "../components/sliders/YesNoSLider.vue";
import MultipleAnswer from "../components/question/MultipleAnswer.vue";
import SelectImages from "../components/question/SelectImages.vue";
import DraggableBox from "../components/question/DraggableBox.vue";
import SurveyPopup from "../components/popups/SurveyPopup.vue";
import SurveyAnswers from "../components/survey/SurveyAnswers.vue";
import {useEventStore} from "../stores/events-store";
import {useSurveyStore} from "../stores/survey-store";
const contentStore = useSessionContentStore();
const {session_content, session_content_pages} = storeToRefs(contentStore);
const eventStore = useEventStore();
const survey_store = useSurveyStore();
const {store_session_content_survey} = storeToRefs(survey_store);
const route = useRoute();
const is_pages_slider_visible = ref(false);
const loading = ref(true);
const {cookies} = useCookies();
const current_page = ref(0);
const preview = ref(null);
const session_content_id = ref(null);
const next_index = ref(1);
const event_slug = ref("");
const current_slide = ref(0);
const survey_popup_status = ref(false);
const is_visible_survey_answers = ref(false);
function showSurveyAnswer() {
  survey_popup_status.value = false;
  is_visible_survey_answers.value = true;
}
async function burgerTeacherSurvey() {
  try {
    await survey_store.storeSessionContentSurvey(session_content_id.value);
    if (store_session_content_survey.value.started !== true) {
      survey_popup_status.value = true;
    } else {
      localStorage.setItem("survey_id", store_session_content_survey.value.id);
      showSurveyAnswer();
    }
  } catch (e) {
    console.log(e, 'e showSurveyAnswer');
  }
}
function showPagesSlider() {
  is_pages_slider_visible.value = true;
}
function closePagesSlider() {
  // console.log('closePagesSlider')
  is_pages_slider_visible.value = false;
}
const is_image_content = computed(() => {
  return (
      session_content.value.slide_content.template === 0 &&
      session_content.value.slide_content.type_1 === 1
  );
});
const is_columnt_content = computed(() => {
  return session_content.value.slide_content.template === 1;
});
const is_box_content = computed(() => {
  return (
      session_content.value.slide_content.type_3 === 1 ||
      session_content.value.slide_content.type_4 === 1
  );
});
const is_question_yes_no = computed(() => {
  return (
      session_content.value.question_content.template === 0 &&
      session_content.value.slide_content.type_1 === 0 &&
      session_content.value.slide_content.type_2 === 0 &&
      session_content.value.slide_content.type_3 === 0 &&
      session_content.value.slide_content.type_4 === 0
  );
});
const is_multiple_answers = computed(() => {
  return session_content.value.question_content.template === 1;
});
const is_select_images = computed(() => {
  return session_content.value.question_content.template === 2;
});
const is_draggable_box = computed(() => {
  return session_content.value.question_content.template === 3;
});
const prevSlide = async () => {
  current_page.value -= 1;
  loading.value = true;
  await contentStore.storeSessionContent(
      session_content_id.value,
      current_page.value,
      preview.value
  );
  next_index.value = session_content.value.next_index;
  loading.value = false;
};
const nextSlide = async () => {
  current_page.value += 1;
  loading.value = true;
  await contentStore.storeSessionContent(
      session_content_id.value,
      current_page.value,
      preview.value
  );
  next_index.value = session_content.value.next_index;
  loading.value = false;
};
const goToSlide = async (slide) => {
  current_page.value = slide;
  loading.value = true;
  await contentStore.storeSessionContent(
      session_content_id.value,
      current_page.value,
      preview.value
  );
  next_index.value = session_content.value.next_index;
  loading.value = false;
};
const prev_link_visible = computed(() => {
  return current_page.value > 0 ? "/" : "";
});
const next_link_visible = computed(() => {
  // console.log(current_page.value, 'current_page.value')
  // console.log(session_content_pages.value.data.pages.length, 'session_content_pages?.data.pages')
  // console.log(session_content_pages.value.data.pages.length - 1 !== current_page.value,
  //     'session_content_pages.value.data.pages.length !== current_page.value - 1')
  return session_content_pages.value.data.pages.length - 1 !== current_page.value;
});
async function setCurrentPage(index) {
  current_page.value = index;
  loading.value = true;
  await contentStore.storeSessionContent(
      session_content_id.value,
      current_page.value,
      preview.value
  );
  next_index.value = session_content.value.next_index;
  loading.value = false;
}
const init = async () => {
  eventStore.storeEventsHideTeacherPopup();
  session_content_id.value = localStorage.getItem("session_content_id");
  preview.value = localStorage.getItem("preview");
  current_page.value = 0;
  const user_token = cookies.get("userToken");
  useAxiosToken(user_token);
  try {
    await contentStore.storeSessionContentPages(session_content_id.value);
  } catch (e) {
    console.log(e, 'e')
  }
  try {
    await contentStore.storeSessionContent(
        session_content_id.value,
        current_page.value,
        preview.value
    );
    current_slide.value = +session_content.value.current_slide;
    event_slug.value = JSON.parse(localStorage.getItem("event")).slug;
    localStorage.setItem(
        "session_content_object",
        JSON.stringify(session_content.value)
    );
    loading.value = false;
  } catch (e) {
    console.log(e, "error from contenuto page");
    // window.location.href = "/";
    loading.value = false;
  }
};
onMounted(() => {
  init();
});
</script>
<template>
  <Loading v-if="loading"/>
  <Background v-else :background_image="session_content.background">
    <div class="contenuto-view">
      <div class="contenuto-view__header">
        <HeaderNavigation v-if="session_content.title">
          <template v-slot:left>
            <EventInformation
                :title="session_content.title"
                :subtitle="session_content.teacher"
                :logo="session_content.logo"
            />
          </template>
          <template v-slot:center>
            <Navigation
                :prev_link="prev_link_visible"
                :next_link="next_link_visible"
                :center_mode="!is_pages_slider_visible"
                :current_slide="current_slide"
                :close_btn="is_pages_slider_visible"
                @emit_center_mode="showPagesSlider"
                @emit_close_btn="closePagesSlider"
                @emit_prev="prevSlide"
                @emit_next="nextSlide"
                @emit_slide="goToSlide"
            />
          </template>
          <template v-slot:right>
            <BurgerMenu
                v-if="session_content_id"
                :session_content_id="session_content_id"
                :event_slug="event_slug"
                @emits_teacher_survey="burgerTeacherSurvey"
            />
          </template>
        </HeaderNavigation>
      </div>
      <div class="contenuto-view__slider">
        <PagesSlider
            v-if="is_pages_slider_visible"
            :current_page="current_page"
            @emit_click="setCurrentPage"
            @emit_close="is_pages_slider_visible = false"
            :is_teacher="true"
        />
      </div>
      <div v-if="!is_visible_survey_answers" class="contenuto-view__body">
        <SingleSlide
            v-if="is_image_content"
            :title="session_content.slide_content.title"
            :footer="session_content.slide_content.caption_1"
            :image="session_content.slide_content.image_1"
        />
        <TwoColumnsSlider
            v-if="is_columnt_content"
            :text_1="session_content.slide_content.text_1"
            :text_2="session_content.slide_content.text_2"
            :image_1="session_content.slide_content.image_1"
            :image_2="session_content.slide_content.image_2"
            :caption_1="session_content.slide_content.caption_1"
            :caption_2="session_content.slide_content.caption_2"
        />
        <SliderBox
            v-if="is_box_content"
            :text_1="session_content.slide_content.text_1"
            :text_2="session_content.slide_content.text_2"
            :text_3="session_content.slide_content.text_3"
            :text_4="session_content.slide_content.text_4"
            :image_1="session_content.slide_content.image_1"
            :image_2="session_content.slide_content.image_2"
            :image_3="session_content.slide_content.image_3"
            :image_4="session_content.slide_content.image_4"
            :caption_1="session_content.slide_content.caption_1"
            :caption_2="session_content.slide_content.caption_2"
            :caption_3="session_content.slide_content.caption_3"
            :caption_4="session_content.slide_content.caption_4"
        />
        <YesNoSLider
            v-if="is_question_yes_no"
            :question="session_content.question_content.question"
            :image="session_content.question_content.image"
            :session_content_id="session_content_id"
            :question_id="session_content.question_content.id_question_content"
            :current_page="current_page"
            :preview="preview"
        />
        <MultipleAnswer
            v-if="is_multiple_answers"
            :question="session_content.question_content.question"
            :image="session_content.question_content.image"
            :session_content_id="session_content_id"
            :question_id="session_content.question_content.id_question_content"
            :answer_reason="session_content.question_content.answer_reason"
            :multiple_answer_options="
            session_content.question_content.multiple_answer_options
          "
            :current_page="current_page"
            :preview="preview"
        />
        <SelectImages
            v-if="is_select_images"
            :question="session_content.question_content.question"
            :select_image_option="
            session_content.question_content.select_image_option
          "
            :session_content_id="session_content_id"
            :question_id="session_content.question_content.id_question_content"
            :current_page="current_page"
            :preview="preview"
        />
        <DraggableBox
            v-if="is_draggable_box"
            :question="session_content.question_content.question"
            :session_content_id="session_content_id"
            :question_id="session_content.question_content.id_question_content"
            :number_of_dragging_box="
            session_content.question_content.number_of_dragging_box
          "
            :dragging_box_title_1="
            session_content.question_content.dragging_box_title_1
          "
            :dragging_box_title_2="
            session_content.question_content.dragging_box_title_2
          "
            :dragging_box_title_3="
            session_content.question_content.dragging_box_title_3
          "
            :dragging_box_title_4="
            session_content.question_content.dragging_box_title_4
          "
            :dragging_option="session_content.question_content.dragging_option"
            :answer_reason="session_content.question_content.answer_reason"
            :current_page="current_page"
            :preview="preview"
        />
      </div>
      <Transition>
        <SurveyAnswers
            @emit_back="is_visible_survey_answers = false"
            v-if="is_visible_survey_answers"
        />
      </Transition>
    </div>
  </Background>
  <Transition>
    <SurveyPopup
        v-if="survey_popup_status"
        @emit_close="survey_popup_status = false"
        @emit_show="showSurveyAnswer"
    />
  </Transition>
</template>
<style lang="scss" scoped>
.contenuto-view {
  position: relative;
  padding: 3.2rem 0 3.2rem;
  &__header {
    padding: 0 3.2rem;
  }
  &__slider {
    position: absolute;
    top: 9rem;
    left: 0;
    width: 99.2vw;
    z-index: 2;
  }
  &__body {
    margin: 0 3.2rem;
    border-radius: 16px;
    background: #fff;
  }
}
</style>
