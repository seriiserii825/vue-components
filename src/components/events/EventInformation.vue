<script setup>
import {ref} from "@vue/reactivity";
import {onMounted} from "vue";
const event = ref(null);
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: false,
  },
});
const is_popup_visible = ref(false);
function togglePopup() {
  is_popup_visible.value = !is_popup_visible.value;
}
onMounted(() => {
  event.value = JSON.parse(localStorage.getItem("event"));
});
</script>
<template>
  <div class="event-information">
    <div class="event-information__btn" @click="togglePopup">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z"
            stroke="#464F69" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M9.375 9.375H10V13.75H10.625" stroke="#464F69" stroke-width="1.8" stroke-linecap="round"
              stroke-linejoin="round"/>
        <path
            d="M9.84375 7.5C10.3615 7.5 10.7812 7.08027 10.7812 6.5625C10.7812 6.04473 10.3615 5.625 9.84375 5.625C9.32598 5.625 8.90625 6.04473 8.90625 6.5625C8.90625 7.08027 9.32598 7.5 9.84375 7.5Z"
            fill="#464F69"/>
      </svg>
      <span>Info evento</span>
    </div>
    <transition>
      <div class="event-information__popup" v-if="is_popup_visible">
        <router-link
            :to="{
            name: 'home',
          }"
        >
          <img
              class="event-information__logo"
              :width="115"
              :src="logo"
              alt=""
          />
        </router-link>
        <h3 class="event-information__title">{{ title }}</h3>
        <div class="event-information__professor">
          <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M12 15.75C13.6569 15.75 15 14.4069 15 12.75C15 11.0931 13.6569 9.75 12 9.75C10.3431 9.75 9 11.0931 9 12.75C9 14.4069 10.3431 15.75 12 15.75Z"
                stroke="#464F69"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M7.5 18C8.02395 17.3014 8.70336 16.7344 9.48442 16.3438C10.2655 15.9533 11.1267 15.75 12 15.75C12.8733 15.75 13.7345 15.9533 14.5156 16.3438C15.2966 16.7344 15.976 17.3014 16.5 18"
                stroke="#464F69"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M19.5 20.25V3.75C19.5 3.33579 19.1642 3 18.75 3L5.25 3C4.83579 3 4.5 3.33579 4.5 3.75L4.5 20.25C4.5 20.6642 4.83579 21 5.25 21H18.75C19.1642 21 19.5 20.6642 19.5 20.25Z"
                stroke="#464F69"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M9 6H15"
                stroke="#464F69"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
          </svg>
          <span>{{ subtitle }}</span>
        </div>
      </div>
    </transition>
  </div>
</template>
<style lang="scss" scoped>
.event-information {
  position: relative;
  z-index: 100;
  &__btn {
    display: flex;
    align-items: center;
    padding: 0 1rem;
    width: 130px;
    height: 3.2rem;
    font-size: 1.6rem;
    font-weight: 600;
    //color: white;
    color: #464F69;
    //background: #65b244;
    background: #D1F4EE;
    border-radius: 16px;
    cursor: pointer;
    svg {
      margin-right: 0.8rem;
    }
    span {
      position: relative;
      top: -0.2rem;
    }
  }
  &__popup {
    position: absolute;
    top: 4rem;
    left: 0;
    padding: 6.4rem;
    width: 48rem;
    background: #fff;
    border-bottom: 1px solid #d1f4ee;
    box-shadow: 0 4px 12px rgba(#101d1a, 0.3);
    border-radius: 16px;
  }
  &__logo {
    display: inline-block;
    margin-bottom: 3.2rem;
  }
  &__title {
    margin-bottom: 1.6rem;
  }
  &__professor {
    display: flex;
    align-items: center;
    svg {
      margin-right: 0.8rem;
    }
  }
}
</style>