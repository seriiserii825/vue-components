<script setup>
import {useRouter} from "vue-router";
import {useEventStore} from "../../stores/events-store";
import {useSessionContentStore} from "../../stores/content-store";
import {storeToRefs} from "pinia";
import {useCookies} from "vue3-cookies";
import {onMounted, ref} from "vue";
import {useAxiosToken} from "../../hooks/useAxiosToken";
const router = useRouter();
const emits = defineEmits(["emit_hide"]);
const eventStore = useEventStore();
const {event} = storeToRefs(eventStore);
const {cookies} = useCookies();
const contentStore = useSessionContentStore();
const session_content_id = ref(null);
function hidePopup() {
  emits("emit_hide");
}
async function setPreview(value) {
  cookies.set("preview", value);
  localStorage.setItem("preview", value);
  await contentStore.storeSessionContentStart(session_content_id.value, {
    preview: value,
  });
  await router.push({
    name: "contenuto-id",
    params: {id: session_content_id.value},
  });
}
async function init() {
  const user_token = cookies.get("userToken");
  useAxiosToken(user_token);
}
onMounted(() => {
  session_content_id.value = localStorage.getItem("session_content_id");
  init();
});
</script>
<template>
  <div class="teacher-popup">
    <div class="teacher-popup__body">
      <header class="teacher-popup__header">
        <div class="teacher-popup__left">
          <h2 class="teacher-popup__title">
            Ricostruzione post traumatica del menisco
          </h2>
          <div class="teacher-popup__location">
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  d="M12 12.75C13.6569 12.75 15 11.4069 15 9.75C15 8.09315 13.6569 6.75 12 6.75C10.3431 6.75 9 8.09315 9 9.75C9 11.4069 10.3431 12.75 12 12.75Z"
                  stroke="#464F69"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
              />
              <path
                  d="M19.5 9.75C19.5 16.5 12 21.75 12 21.75C12 21.75 4.5 16.5 4.5 9.75C4.5 7.76088 5.29018 5.85322 6.6967 4.4467C8.10322 3.04018 10.0109 2.25 12 2.25C13.9891 2.25 15.8968 3.04018 17.3033 4.4467C18.7098 5.85322 19.5 7.76088 19.5 9.75V9.75Z"
                  stroke="#464F69"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
              />
            </svg>
            <span>Aula Giuseppe Verdi</span>
          </div>
        </div>
        <div class="teacher-popup__right" @click="hidePopup">
          <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="32" height="32" rx="16" fill="#FF5A5A"/>
            <path
                d="M11.0811 21L20.9191 11.162"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
            />
            <path
                d="M11.0811 11L20.9191 20.838"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
            />
          </svg>
        </div>
      </header>
      <main class="teacher-popup__content">
        <button class="teacher-popup__btn" @click="setPreview(1)">
          Prova la presentazione
        </button>
        <button
            class="teacher-popup__btn teacher-popup__btn--dark"
            @click="setPreview(0)"
        >
          Avvia la presentazione
        </button>
      </main>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.teacher-popup {
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(8px);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 1000;
  &__body {
    padding: 3.2rem;
    width: 48rem;
    background: #fff;
    border-bottom: 1px solid #d1f4ee;
    box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.2);
    border-radius: 16px;
  }
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding-bottom: 3.2rem;
    border-bottom: 1px solid #d1f4ee;
  }
  &__left {
    padding-right: 3rem;
  }
  &__right {
    cursor: pointer;
  }
  &__title {
    margin-bottom: 0.8rem;
    font-size: 2rem;
    font-weight: 600;
  }
  &__location {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  &__content {
    padding-top: 3.2rem;
  }
  &__btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 5.2rem;
    font-size: 1.6rem;
    font-weight: 600;
    color: #464f69;
    background: transparent;
    border: 1px solid #d1f4ee;
    border-radius: 1.6rem;
    cursor: pointer;
    transition: all 0.4s;
    &:first-of-type {
      margin-bottom: 3.2rem;
      &:hover {
        background: var(--contrast);
      }
    }
    &--dark {
      background: var(--contrast);
      &:hover {
        background: var(--contrast-hover);
      }
    }
  }
}
</style>