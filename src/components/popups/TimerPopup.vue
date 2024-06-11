<script setup>
import Button from "../ui/Button.vue";
import {useSessionContentStore} from "../../stores/content-store";
import {onMounted, ref} from "vue";
import {useAxiosToken} from "../../hooks/useAxiosToken";
import {useCookies} from "vue3-cookies";
import {computed} from "@vue/runtime-core";
import {storeToRefs} from "pinia";
const emits = defineEmits(['close_emit', 'emit_update']);
const {cookies} = useCookies();
const props = defineProps({
  session_content_id: {
    type: String,
    required: true
  },
  question_id: {
    type: Number,
    required: true
  },
  countdown_in_second: {
    type: [Number, String],
    required: false
  }
});
const sessionContentStore = useSessionContentStore();
const {session_content_update_timer} = storeToRefs(sessionContentStore);
const minutes = ref(0);
const seconds = ref(0);
const total_seconds = computed(() => {
  return minutes.value * 60 + seconds.value;
});
function changeMinutes(e) {
  let value = +e.target.value;
  const is_number = isFinite(value);
  if (is_number && value > 0 && value < 59) {
    minutes.value = value;
  } else {
    minutes.value = 0;
  }
}
function changeSeconds(e) {
  let value = +e.target.value;
  const is_number = isFinite(value);
  if (is_number && value > 0 && value < 59) {
    seconds.value = value;
  } else {
    seconds.value = 0;
  }
}
async function onSubmit() {
  try {
    await sessionContentStore.storeSessionContentUpdateTimer(props.session_content_id, {
      question_id: props.question_id,
      countdown: total_seconds.value
    });
  } catch (e) {
    console.log(e, 'e')
  }
  if (session_content_update_timer.value.status === 'success') {
    emits('emit_update', `${minutes.value}:${seconds.value}`);
  }
  closePopup();
}
function closePopup() {
  emits('close_emit');
}
onMounted(() => {
  const user_token = cookies.get('userToken');
  useAxiosToken(user_token);
  if (props.countdown_in_second) {
    const count_down_array = props.countdown_in_second.split(':');
    minutes.value = parseInt(count_down_array[0]);
    seconds.value = parseInt(count_down_array[1]);
  }
});
</script>
<template>
  <div class='timer-popup'>
    <div class="timer-popup__body">
      <header class="timer-popup__header">
        <div class="timer-popup__title">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 5.625V10H14.375" stroke="#464F69" stroke-width="1.8" stroke-linecap="round"
                  stroke-linejoin="round"/>
            <path
                d="M10 16.875C13.797 16.875 16.875 13.797 16.875 10C16.875 6.20304 13.797 3.125 10 3.125C6.20304 3.125 3.125 6.20304 3.125 10C3.125 13.797 6.20304 16.875 10 16.875Z"
                stroke="#464F69" stroke-width="1.8" stroke-miterlimit="10"/>
            <path d="M15.3047 2.04688L17.9531 4.69531" stroke="#464F69" stroke-width="1.8" stroke-linecap="round"
                  stroke-linejoin="round"/>
            <path d="M2.04688 4.69531L4.69531 2.04688" stroke="#464F69" stroke-width="1.8" stroke-linecap="round"
                  stroke-linejoin="round"/>
          </svg>
          <span>Impostare il timer</span>
        </div>
        <div
            @click="closePopup"
            class="timer-popup__close">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="16" fill="#FF5A5A"/>
            <path d="M11.0801 21L20.9181 11.162" stroke="white" stroke-width="2" stroke-linecap="round"/>
            <path d="M11.0801 11L20.9181 20.838" stroke="white" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
      </header>
      <div class="timer-popup__timer">
        <div class="timer-popup__timer-item">
          <div class="timer-popup__label">Minuti</div>
          <input
              class="timer-popup__count"
              type="text"
              :value="minutes"
              @change="changeMinutes"
          />
        </div>
        <div class="timer-popup__timer-item">
          <div class="timer-popup__label">Secondi</div>
          <input class="timer-popup__count"
                 type="text"
                 :value="seconds"
                 @change="changeSeconds"
          />
        </div>
      </div>
      <footer class="timer-popup__footer">
        <div class="timer-popup__btn">
          <Button
              @click="onSubmit"
              color="wet-asphalt">Conferma
          </Button>
        </div>
        <div class="timer-popup__btn">
          <Button @click="closePopup" color="contrast">Annulla</Button>
        </div>
      </footer>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.timer-popup {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 10000;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(8px);
    z-index: 1;
  }
  &__body {
    position: relative;
    flex: 0 0 48rem;
    padding: 3.2rem;
    background: #fff;
    border-radius: 1.6rem;
    z-index: 2;
  }
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3.8rem;
  }
  &__title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    color: #464F69;
    svg {
      margin-right: 1rem;
    }
  }
  &__close {
    cursor: pointer;
  }
  &__timer {
    display: flex;
    justify-content: space-between;
    margin-bottom: 3.2rem;
  }
  &__timer-item {
    flex: 0 0 19.2rem;
    padding: 3.2rem;
    border: 1px solid #D1F4EE;
    border-radius: 16px;
  }
  &__label {
    margin-bottom: 1.6rem;
    text-align: center;
  }
  &__count {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 12.8rem;
    height: 5.8rem;
    font-size: 2rem;
    font-weight: 600;
    text-align: center;
    color: #464F69;
    background: #E6FFFA;
    border: none;
    border-bottom: 1px solid #D1F4EE;
    border-radius: 16px;
  }
  &__btn {
    &:first-of-type {
      margin-bottom: 3.2rem;
    }
  }
}
</style>
