<script setup>
import {onMounted, ref} from "vue";
import {useAxiosToken} from "../../hooks/useAxiosToken";
import {useCookies} from "vue3-cookies";
import {useSessionContentStore} from "../../stores/content-store";
import {storeToRefs} from "pinia";
import Loading from "../globals/Loading.vue";
const {cookies} = useCookies();
const emits = defineEmits(['emit_close']);
const loading = ref(false);
const props = defineProps({
  session_content_id: {
    type: String,
    required: true
  }
});
const student_code = ref("");
const listener_code = ref("");
const contentStore = useSessionContentStore();
const {session_content_codes} = storeToRefs(contentStore);
function closePopup() {
  emits('emit_close');
}
async function init() {
  loading.value = true;
  const user_token = cookies.get('userToken');
  useAxiosToken(user_token);
  await contentStore.storeSessionContentCodes(props.session_content_id);
  student_code.value = session_content_codes.value.student_code;
  listener_code.value = session_content_codes.value.listener_code;
  setTimeout(() => {
    loading.value = false;
  }, 1000);
}
onMounted(() => {
  init();
});
</script>
<template>
  <div class='user-code-window'>
    <Loading v-if="loading"/>
    <div v-else class="user-code-window__container">
      <header class="user-code-window__header">
        <div class="user-code-window__icon">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M16.25 6.875H3.75C3.40482 6.875 3.125 7.15482 3.125 7.5V16.25C3.125 16.5952 3.40482 16.875 3.75 16.875H16.25C16.5952 16.875 16.875 16.5952 16.875 16.25V7.5C16.875 7.15482 16.5952 6.875 16.25 6.875Z"
                stroke="#464F69" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            <path
                d="M7.1875 6.875V4.0625C7.1875 3.31658 7.48382 2.60121 8.01126 2.07376C8.53871 1.54632 9.25408 1.25 10 1.25C10.7459 1.25 11.4613 1.54632 11.9887 2.07376C12.5162 2.60121 12.8125 3.31658 12.8125 4.0625"
                stroke="#464F69" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            <path
                d="M10 12.8125C10.5178 12.8125 10.9375 12.3928 10.9375 11.875C10.9375 11.3572 10.5178 10.9375 10 10.9375C9.48223 10.9375 9.0625 11.3572 9.0625 11.875C9.0625 12.3928 9.48223 12.8125 10 12.8125Z"
                fill="#464F69"/>
          </svg>
        </div>
        <h3 class="user-code-window__title">Codici di accesso</h3>
        <div class="user-code-window__close" @click="closePopup">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="16" fill="#FF5A5A"/>
            <path d="M11.0811 21L20.9191 11.162" stroke="white" stroke-width="2" stroke-linecap="round"/>
            <path d="M11.0811 11L20.9191 20.838" stroke="white" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
      </header>
      <section class="user-code-window__group">
        <div class="user-code-window__label">Codice Discenti</div>
        <input v-if="student_code" disabled class="user-code-window__input" type="text" :value="student_code">
      </section>
      <section class="user-code-window__group">
        <div class="user-code-window__label">Codice Uditore</div>
        <input v-if="listener_code" disabled class="user-code-window__input" type="text" :value="listener_code">
      </section>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.user-code-window {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(8px);
  z-index: 1000;
  &__container {
    position: relative;
    padding: 3.2rem;
    width: 48rem;
    background: #FFFFFF;
    border-bottom: 1px solid #D1F4EE;
    box-shadow: 0 4px 3.2rem rgba(#101D1A, .3);
    border-radius: 16px;
    z-index: 2;
  }
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 3.2rem;
    border-bottom: 1px solid #D1F4EE;
  }
  &__title {
    margin-right: auto;
    margin-left: 1rem;
    font-size: 16px;
    font-weight: 600;
    color: #464F69;
  }
  &__close {
    cursor: pointer;
  }
  &__group {
    padding: 3.2rem 0;
    &:first-of-type {
      border-bottom: 1px solid #D1F4EE;
    }
  }
  &__label {
    margin-bottom: 1.6rem;
    font-size: 1.6rem;
    color: black;
  }
  &__input {
    padding: 0 3.2rem;
    width: 100%;
    height: 51px;
    font-weight: 400;
    font-size: 14px;
    color: #464F69;
    background: transparent;
    border: 1px solid #D1F4EE;
    border-radius: 16px;
  }
}
</style>