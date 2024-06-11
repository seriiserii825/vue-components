<script setup>
import {ref} from "@vue/reactivity";
import UserCodeWindow from "../popups/UserCodeWindow.vue";
import {computed} from "@vue/runtime-core";
import {useCookies} from "vue3-cookies";
import {onMounted} from "vue";
import {useTelevoteStore} from "../../stores/televote-store";
import {storeToRefs} from "pinia";
import {useAxiosToken} from "../../hooks/useAxiosToken";
import {usePopupStore} from "../../stores/popup-store";
import {useRouter} from "vue-router";
const popup_store = usePopupStore();
const router = useRouter();
const {cookies} = useCookies();
const televote_store = useTelevoteStore();
const {televote_list} = storeToRefs(televote_store);
const session_content_survey_to_fill = ref(null);
const emits = defineEmits([
  "emit_student_current_slide",
  "emits_teacher_survey",
]);
const props = defineProps({
  session_content_id: {
    type: [String, Number],
    required: true,
  },
  event_slug: {
    type: [String, Number],
    required: true,
  },
  student_current_slide: {
    type: Number,
    required: false,
  },
});
function teacherSurveyHandler() {
  emits("emits_teacher_survey");
  toggleMenu();
}
const is_user_window_code_visible = ref(false);
const televote_id = ref(null);
function showUserCodeWindow() {
  is_user_window_code_visible.value = true;
  toggleMenu();
}
const is_menu_visible = ref(false);
const is_teacher = computed(() => {
  return cookies.get("user_type") === "R";
});
const is_student = computed(() => {
  return cookies.get("user_type") === "D";
});
const is_listener = computed(() => {
  return cookies.get("user_type") === "U";
});
function toggleMenu() {
  is_menu_visible.value = !is_menu_visible.value;
}
function closeUserCodeWindow() {
  is_user_window_code_visible.value = false;
}
function getActiveTelevoteId() {
  const active_televote = televote_list.value.find((televote) => {
    return televote.running;
  });
  televote_id.value = active_televote ? active_televote.id : null;
}
function goToSlide() {
  emits("emit_student_current_slide", props.student_current_slide);
  toggleMenu();
}
async function showStudentTelevote() {
  const user_token = cookies.get("userToken");
  useAxiosToken(user_token);
  await televote_store.storeTelevoteList(props.session_content_id);
  getActiveTelevoteId();
  if (televote_id.value === null) {
    popup_store.showMiniPopup("Il televoto non è stato avviato");
    toggleMenu();
  } else {
    router.push({
      name: "televote-student",
      params: {
        session_content_id: props.session_content_id,
        televote_id: televote_id.value,
      },
    });
    toggleMenu();
  }
}
const home_computed = computed(() => {
  return {
    name: "evento_detaglio",
    params: {slug: props.event_slug},
  };
});
const is_not_complete_survey = computed(() => {
  if (session_content_survey_to_fill.value) {
    return (
        session_content_survey_to_fill.value.includes(
            parseInt(props.session_content_id)
        ) || session_content_survey_to_fill.value.length === 0
    );
  } else {
    return false;
  }
});
onMounted(() => {
  localStorage.setItem("session_content_id", props.session_content_id);
  session_content_survey_to_fill.value = JSON.parse(
      localStorage.getItem("session_content_survey_to_fill")
  );
});
</script>
<template>
  <div class="burger">
    <div class="burger__btn" @click="toggleMenu">
      <svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1H17" stroke="#464F69" stroke-width="2" stroke-linecap="round"/>
        <path d="M1 9H17" stroke="#464F69" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </div>
    <ul class="burger__menu" v-if="is_menu_visible && is_teacher">
      <li>
        <router-link :to="home_computed">
          <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M16.6719 8.5623L10.4219 2.88261C10.3067 2.77721 10.1562 2.71875 10 2.71875C9.84384 2.71875 9.69334 2.77721 9.57812 2.88261L3.32812 8.5623C3.26523 8.6217 3.21486 8.69308 3.17998 8.77224C3.14509 8.8514 3.1264 8.93674 3.125 9.02324V16.2498C3.125 16.4156 3.19085 16.5745 3.30806 16.6917C3.42527 16.809 3.58424 16.8748 3.75 16.8748H16.25C16.4158 16.8748 16.5747 16.809 16.6919 16.6917C16.8092 16.5745 16.875 16.4156 16.875 16.2498V9.02324C16.8736 8.93674 16.8549 8.8514 16.82 8.77224C16.7851 8.69308 16.7348 8.6217 16.6719 8.5623V8.5623Z"
                stroke="#464F69"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
          </svg>
          <span>Home</span>
        </router-link>
      </li>
      <li>
        <button @click="showUserCodeWindow">
          <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M16.25 6.875H3.75C3.40482 6.875 3.125 7.15482 3.125 7.5V16.25C3.125 16.5952 3.40482 16.875 3.75 16.875H16.25C16.5952 16.875 16.875 16.5952 16.875 16.25V7.5C16.875 7.15482 16.5952 6.875 16.25 6.875Z"
                stroke="#464F69"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M7.1875 6.875V4.0625C7.1875 3.31658 7.48382 2.60121 8.01126 2.07376C8.53871 1.54632 9.25408 1.25 10 1.25C10.7459 1.25 11.4613 1.54632 11.9887 2.07376C12.5162 2.60121 12.8125 3.31658 12.8125 4.0625"
                stroke="#464F69"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M10 12.8125C10.5178 12.8125 10.9375 12.3928 10.9375 11.875C10.9375 11.3572 10.5178 10.9375 10 10.9375C9.48223 10.9375 9.0625 11.3572 9.0625 11.875C9.0625 12.3928 9.48223 12.8125 10 12.8125Z"
                fill="#464F69"
            />
          </svg>
          <span>Codici di accesso</span>
        </button>
      </li>
      <li>
        <router-link
            :to="{
            name: 'televote-results-id',
            params: { id: session_content_id },
          }"
        >
          <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M6.875 5.3125V2.8125C6.875 2.3981 7.03962 2.00067 7.33265 1.70765C7.62567 1.41462 8.0231 1.25 8.4375 1.25C8.8519 1.25 9.24933 1.41462 9.54235 1.70765C9.83538 2.00067 10 2.3981 10 2.8125V8.125"
                stroke="#464F69"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M6.45306 12.7813C6.38773 12.884 6.35303 13.0032 6.35303 13.125C6.35303 13.2468 6.38773 13.366 6.45306 13.4687C6.89838 14.1562 8.07806 15.625 9.99994 15.625C11.9218 15.625 13.1015 14.1562 13.5468 13.4687C13.6121 13.366 13.6469 13.2468 13.6469 13.125C13.6469 13.0032 13.6121 12.884 13.5468 12.7813C13.1015 12.0938 11.9218 10.625 9.99994 10.625C8.07806 10.625 6.89838 12.0938 6.45306 12.7813Z"
                stroke="#464F69"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M10 4.0625C10 3.6481 10.1646 3.25067 10.4576 2.95765C10.7507 2.66462 11.1481 2.5 11.5625 2.5C11.9769 2.5 12.3743 2.66462 12.6674 2.95765C12.9604 3.25067 13.125 3.6481 13.125 4.0625V8.75"
                stroke="#464F69"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M13.125 9.0625V8.75C13.125 8.3356 13.2896 7.93817 13.5826 7.64515C13.8757 7.35212 14.2731 7.1875 14.6875 7.1875C15.1019 7.1875 15.4993 7.35212 15.7924 7.64515C16.0854 7.93817 16.25 8.3356 16.25 8.75V11.875C16.25 13.5326 15.5915 15.1223 14.4194 16.2944C13.2473 17.4665 11.6576 18.125 10 18.125C8.3424 18.125 6.75269 17.4665 5.58058 16.2944C4.40848 15.1223 3.75 13.5326 3.75 11.875V5.3125C3.75 4.8981 3.91462 4.50067 4.20765 4.20765C4.50067 3.91462 4.8981 3.75 5.3125 3.75C5.7269 3.75 6.12433 3.91462 6.41735 4.20765C6.71038 4.50067 6.875 4.8981 6.875 5.3125V8.75"
                stroke="#464F69"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M10 14.0625C10.5178 14.0625 10.9375 13.6428 10.9375 13.125C10.9375 12.6072 10.5178 12.1875 10 12.1875C9.48223 12.1875 9.0625 12.6072 9.0625 13.125C9.0625 13.6428 9.48223 14.0625 10 14.0625Z"
                fill="#464F69"
            />
          </svg>
          <span>Risultati televoto</span>
        </router-link>
      </li>
      <li>
        <router-link
            :to="{ name: 'televote-new-id', params: { id: session_content_id } }"
        >
          <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M6.875 5.3125V2.8125C6.875 2.3981 7.03962 2.00067 7.33265 1.70765C7.62567 1.41462 8.0231 1.25 8.4375 1.25C8.8519 1.25 9.24933 1.41462 9.54235 1.70765C9.83538 2.00067 10 2.3981 10 2.8125V8.125"
                stroke="#464F69"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M10 4.0625C10 3.6481 10.1646 3.25067 10.4576 2.95765C10.7507 2.66462 11.1481 2.5 11.5625 2.5C11.9769 2.5 12.3743 2.66462 12.6674 2.95765C12.9604 3.25067 13.125 3.6481 13.125 4.0625V8.75"
                stroke="#464F69"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M13.125 9.0625V8.75C13.125 8.3356 13.2896 7.93817 13.5826 7.64515C13.8757 7.35212 14.2731 7.1875 14.6875 7.1875C15.1019 7.1875 15.4993 7.35212 15.7924 7.64515C16.0854 7.93817 16.25 8.3356 16.25 8.75V11.875C16.25 13.5326 15.5915 15.1223 14.4194 16.2944C13.2473 17.4665 11.6576 18.125 10 18.125C8.3424 18.125 6.75269 17.4665 5.58058 16.2944C4.40848 15.1223 3.75 13.5326 3.75 11.875V5.3125C3.75 4.8981 3.91462 4.50067 4.20765 4.20765C4.50067 3.91462 4.8981 3.75 5.3125 3.75C5.7269 3.75 6.12433 3.91462 6.41735 4.20765C6.71038 4.50067 6.875 4.8981 6.875 5.3125V8.75"
                stroke="#464F69"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M10 11V15"
                stroke="#464F69"
                stroke-width="1.8"
                stroke-linecap="round"
            />
            <path
                d="M12 13L8 13"
                stroke="#464F69"
                stroke-width="1.8"
                stroke-linecap="round"
            />
          </svg>
          <span>Nuovo televoto</span>
        </router-link>
      </li>
      <li>
        <button @click="teacherSurveyHandler">
          <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M10 10H16.875"
                stroke="#464F69"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M10 5H16.875"
                stroke="#464F69"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M10 15H16.875"
                stroke="#464F69"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M7.1875 3.75L4.47656 6.25L3.125 5"
                stroke="#464F69"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M7.1875 8.75L4.47656 11.25L3.125 10"
                stroke="#464F69"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M7.1875 13.75L4.47656 16.25L3.125 15"
                stroke="#464F69"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
          </svg>
          <span>Survey</span>
        </button>
      </li>
      <li>
        <router-link
            :to="{ name: 'evento-repository', params: { slug: event_slug } }"
        >
          <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M17.5 4.375H2.5C2.15482 4.375 1.875 4.65482 1.875 5V6.875C1.875 7.22018 2.15482 7.5 2.5 7.5H17.5C17.8452 7.5 18.125 7.22018 18.125 6.875V5C18.125 4.65482 17.8452 4.375 17.5 4.375Z"
                stroke="#464F69"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M16.875 7.5V15C16.875 15.1658 16.8092 15.3247 16.6919 15.4419C16.5747 15.5592 16.4158 15.625 16.25 15.625H3.75C3.58424 15.625 3.42527 15.5592 3.30806 15.4419C3.19085 15.3247 3.125 15.1658 3.125 15V7.5"
                stroke="#464F69"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M8.125 10.625H11.875"
                stroke="#464F69"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
          </svg>
          <span>Repository</span>
        </router-link>
      </li>
    </ul>
    <ul class="burger__menu" v-if="is_menu_visible && is_student">
      <li>
        <router-link :to="home_computed">
          <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M16.6719 8.5623L10.4219 2.88261C10.3067 2.77721 10.1562 2.71875 10 2.71875C9.84384 2.71875 9.69334 2.77721 9.57812 2.88261L3.32812 8.5623C3.26523 8.6217 3.21486 8.69308 3.17998 8.77224C3.14509 8.8514 3.1264 8.93674 3.125 9.02324V16.2498C3.125 16.4156 3.19085 16.5745 3.30806 16.6917C3.42527 16.809 3.58424 16.8748 3.75 16.8748H16.25C16.4158 16.8748 16.5747 16.809 16.6919 16.6917C16.8092 16.5745 16.875 16.4156 16.875 16.2498V9.02324C16.8736 8.93674 16.8549 8.8514 16.82 8.77224C16.7851 8.69308 16.7348 8.6217 16.6719 8.5623V8.5623Z"
                stroke="#464F69"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
          </svg>
          <span>Home</span>
        </router-link>
      </li>
      <li>
        <button @click="goToSlide">
          <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M4.375 3.75L10.625 10L4.375 16.25"
                stroke="#464F69"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M10.625 3.75L16.875 10L10.625 16.25"
                stroke="#464F69"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
          </svg>
          <span>Vai alla slide corrente</span>
        </button>
      </li>
      <li>
        <button @click="showStudentTelevote">
          <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M6.875 5.3125V2.8125C6.875 2.3981 7.03962 2.00067 7.33265 1.70765C7.62567 1.41462 8.0231 1.25 8.4375 1.25C8.8519 1.25 9.24933 1.41462 9.54235 1.70765C9.83538 2.00067 10 2.3981 10 2.8125V8.125"
                stroke="#464F69"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M10 4.0625C10 3.6481 10.1646 3.25067 10.4576 2.95765C10.7507 2.66462 11.1481 2.5 11.5625 2.5C11.9769 2.5 12.3743 2.66462 12.6674 2.95765C12.9604 3.25067 13.125 3.6481 13.125 4.0625V8.75"
                stroke="#464F69"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M13.125 9.0625V8.75C13.125 8.3356 13.2896 7.93817 13.5826 7.64515C13.8757 7.35212 14.2731 7.1875 14.6875 7.1875C15.1019 7.1875 15.4993 7.35212 15.7924 7.64515C16.0854 7.93817 16.25 8.3356 16.25 8.75V11.875C16.25 13.5326 15.5915 15.1223 14.4194 16.2944C13.2473 17.4665 11.6576 18.125 10 18.125C8.3424 18.125 6.75269 17.4665 5.58058 16.2944C4.40848 15.1223 3.75 13.5326 3.75 11.875V5.3125C3.75 4.8981 3.91462 4.50067 4.20765 4.20765C4.50067 3.91462 4.8981 3.75 5.3125 3.75C5.7269 3.75 6.12433 3.91462 6.41735 4.20765C6.71038 4.50067 6.875 4.8981 6.875 5.3125V8.75"
                stroke="#464F69"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M10 11V15"
                stroke="#464F69"
                stroke-width="1.8"
                stroke-linecap="round"
            />
            <path
                d="M12 13L8 13"
                stroke="#464F69"
                stroke-width="1.8"
                stroke-linecap="round"
            />
          </svg>
          <span>Nuovo televoto</span>
        </button>
      </li>
      <li v-if="is_not_complete_survey">
        <router-link
            :to="{
            name: 'contenuto-id-survey',
            params: { id: session_content_id },
          }"
        >
          <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M10 10H16.875"
                stroke="#464F69"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M10 5H16.875"
                stroke="#464F69"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M10 15H16.875"
                stroke="#464F69"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M7.1875 3.75L4.47656 6.25L3.125 5"
                stroke="#464F69"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M7.1875 8.75L4.47656 11.25L3.125 10"
                stroke="#464F69"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M7.1875 13.75L4.47656 16.25L3.125 15"
                stroke="#464F69"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
          </svg>
          <span>Survey</span>
        </router-link>
      </li>
      <li>
        <router-link
            :to="{ name: 'session-repository', params: { id: session_content_id } }"
        >
          <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M17.5 4.375H2.5C2.15482 4.375 1.875 4.65482 1.875 5V6.875C1.875 7.22018 2.15482 7.5 2.5 7.5H17.5C17.8452 7.5 18.125 7.22018 18.125 6.875V5C18.125 4.65482 17.8452 4.375 17.5 4.375Z"
                stroke="#464F69"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M16.875 7.5V15C16.875 15.1658 16.8092 15.3247 16.6919 15.4419C16.5747 15.5592 16.4158 15.625 16.25 15.625H3.75C3.58424 15.625 3.42527 15.5592 3.30806 15.4419C3.19085 15.3247 3.125 15.1658 3.125 15V7.5"
                stroke="#464F69"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M8.125 10.625H11.875"
                stroke="#464F69"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
          </svg>
          <span>Repository</span>
        </router-link>
      </li>
    </ul>
  </div>
  <transition>
    <UserCodeWindow
        v-if="is_user_window_code_visible"
        :session_content_id="session_content_id"
        @emit_close="closeUserCodeWindow"
    />
  </transition>
</template>
<style lang="scss" scoped>
.burger {
  position: relative;
  &__btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3.2rem;
    height: 3.2rem;
    //background: var(--accent);
    background: #D1F4EE;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.6s;
  }
  &__menu {
    position: absolute;
    top: 4rem;
    left: -170px;
    width: 210px;
    background: #fff;
    border-radius: 1.6rem;
    overflow: hidden;
    button,
    a {
      display: flex;
      align-items: center;
      padding: 1.6rem;
      width: 100%;
      background: transparent;
      border: none;
      border-bottom: 1px solid #d1f4ee;
      transition: all 0.4s;
      cursor: pointer;
      &:hover {
        background: #d1f4ee;
      }
      svg {
        margin-right: 1rem;
      }
    }
  }
}
</style>