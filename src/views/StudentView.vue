<script setup>
import {useCookies} from "vue3-cookies";
import {onMounted} from "vue";
import HeaderNavigation from "../layouts/HeaderNavigation.vue";
import {useEventStore} from "../stores/events-store";
import {storeToRefs} from "pinia";
import EventInformation from "../components/events/EventInformation.vue";
import Navigation from "../components/globals/Navigation.vue";
import {useRoute, useRouter} from "vue-router";
import BurgerMenu from "../components/navigation/BurgerMenu.vue";
import PagesSlider from "../components/sliders/PagesSlider.vue";
import {ref} from "@vue/reactivity";
import SingleSlide from "../components/sliders/SingleSlide.vue";
import {useSessionContentStore} from "../stores/content-store";
import {useAxiosToken} from "../hooks/useAxiosToken";
import Background from "../components/globals/Background.vue";
import Loading from "../components/globals/Loading.vue";
import {computed, onUnmounted, watch} from "@vue/runtime-core";
import TwoColumnsSlider from "../components/sliders/TwoColumnsSlider.vue";
import SliderBox from "../components/sliders/SliderBox.vue";
import YesNoSLiderStudent from "../components/sliders/YesNoSLiderStudent.vue";
import MultipleAnswerStudent from "../components/question/MultipleAnswerStudent.vue";
import SelectImagesStudent from "../components/question/SelectImagesStudent.vue";
import DraggableBoxStudent from "../components/question/DraggableBoxStudent.vue";
import Preloader from "../components/ui/Preloader.vue";
const contentStore = useSessionContentStore();
const {session_content} = storeToRefs(contentStore);
const route = useRoute();
const router = useRouter();
const is_pages_slider_visible = ref(false);
const loading = ref(false);
const eventStore = useEventStore();
const event = ref(null);
const {cookies} = useCookies();
const current_page = ref(0);
const preview = ref(null);
const session_content_id = ref(null);
const next_index = ref(1);
const event_id = ref(null);
const event_slug = ref("");
const small_loading = ref(false);
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
const mutually_exclusive = computed(() => {
  return session_content.value.question_content.mutually_exclusive;
});
const background = ref(null);
const current_slide = ref(0);
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
  return current_page.value < current_slide.value;
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
function showPagesSlider() {
  small_loading.value = true;
  is_pages_slider_visible.value = true;
  small_loading.value = false;
}
let session_content_interval_id;
async function getSessionContent() {
  try {
    await contentStore.storeSessionContent(
        session_content_id.value,
        current_page.value,
        0
    );
    current_slide.value = session_content.value.current_slide;
  } catch (e) {
    console.log(e, 'e')
    await router.push({
      name: "evento_detaglio",
      params: {
        slug: event_slug.value
      }
    });
  }
  session_content_interval_id = setInterval(async () => {
    try {
      await contentStore.storeSessionContent(
          session_content_id.value,
          current_page.value,
          0
      );
      current_slide.value = session_content.value.current_slide;
    } catch (e) {
      console.log(e, 'e')
      await router.push({
        name: "evento_detaglio",
        params: {
          slug: event_slug.value
        }
      });
    }
  }, 5000);
}
const init = async () => {
  loading.value = true;
  event.value = JSON.parse(localStorage.getItem("event"));
  background.value = localStorage.getItem("background");
  const user_type = cookies.get("user_type");
  if (user_type === "D" || user_type === "U") {
    const event_from_local_storage = JSON.parse(localStorage.getItem("event"));
    session_content_id.value = localStorage.getItem("session_content_id");
    preview.value = false;
    current_page.value = current_slide.value;
    event_id.value = event_from_local_storage.id;
    const user_token = cookies.get("userToken");
    useAxiosToken(user_token);
    try {
      await getSessionContent();
      loading.value = true;
    } catch (e) {
      loading.value = true;
      console.log(e, 'e')
    }
    try {
      await setCurrentPage(current_slide.value);
    } catch (e) {
      console.log(e, 'e')
    }
    try {
      await contentStore.storeSessionContentRegisterPartecipant(
          session_content_id.value
      );
    } catch (error) {
      console.log(error, "error");
    }
    try {
      await eventStore.storeEventsId(event_id.value);
      await contentStore.storeSessionContent(
          session_content_id.value,
          current_page.value,
          0
      );
      localStorage.setItem(
          "session_content_object",
          JSON.stringify(session_content.value)
      );
      current_slide.value = session_content.value.current_slide
          ? session_content.value.current_slide
          : 0;
      event_slug.value = event.value.slug;
    } catch (e) {
    }
  } else {
    await router.push("/");
  }
};
onMounted(() => {
  init();
});
onUnmounted(() => {
  clearInterval(session_content_interval_id);
});
</script>
<template>
  <Background v-if="background" :background_image="background">
    <Loading v-if="loading"/>
    <div v-else class="contenuto-view">
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
                :student_current_slide="current_slide"
                @emit_student_current_slide="goToSlide"
            />
          </template>
        </HeaderNavigation>
      </div>
      <Preloader v-if="small_loading"/>
      <div v-else-if="is_pages_slider_visible" class="contenuto-view__slider">
        <PagesSlider
            :current_page="current_page"
            @emit_click="setCurrentPage"
            @emit_close="is_pages_slider_visible = false"
        />
      </div>
      <div class="contenuto-view__body">
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
        <YesNoSLiderStudent
            v-if="is_question_yes_no"
            :question="session_content.question_content.question"
            :image="session_content.question_content.image"
            :session_content_id="session_content_id"
            :question_id="session_content.question_content.id_question_content"
            :countdown_in_second="
            session_content.question_content.countdown_in_second
          "
            :current_page="current_page"
        />
        <MultipleAnswerStudent
            v-if="is_multiple_answers"
            :question="session_content.question_content.question"
            :image="session_content.question_content.image"
            :session_content_id="session_content_id"
            :question_id="session_content.question_content.id_question_content"
            :countdown_in_second="
            session_content.question_content.countdown_in_second
          "
            :answer_reason="session_content.question_content.answer_reason"
            :multiple_answer_options="
            session_content.question_content.multiple_answer_options
          "
            :mutually_exclusive="mutually_exclusive"
        />
        <SelectImagesStudent
            v-if="is_select_images"
            :question="session_content.question_content.question"
            :select_image_option="
            session_content.question_content.select_image_option
          "
            :session_content_id="session_content_id"
            :question_id="session_content.question_content.id_question_content"
            :countdown_in_second="
            session_content.question_content.countdown_in_second
          "
            :mutually_exclusive="mutually_exclusive"
        />
        <DraggableBoxStudent
            v-if="is_draggable_box"
            :question="session_content.question_content.question"
            :session_content_id="session_content_id"
            :question_id="session_content.question_content.id_question_content"
            :countdown_in_second="
            session_content.question_content.countdown_in_second
          "
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
        />
      </div>
    </div>
  </Background>
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
