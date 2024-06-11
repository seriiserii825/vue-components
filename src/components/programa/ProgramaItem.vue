<script setup>
import DateIcon from "../../icons/DateIcon.vue";
import { useEventStore } from "../../stores/events-store";
import { useCookies } from "vue3-cookies";
import { useRouter } from "vue-router";

const router = useRouter();

const { cookies } = useCookies();

const emits = defineEmits(["emit_click"]);
const eventsStore = useEventStore();

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: false,
  },
  hours: {
    type: String,
    required: false,
  },
  professor: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  with_button: {
    type: Boolean,
    required: false,
    default: false,
  },
  status: {
    type: Number,
    required: false,
    default: 0,
  },
  event_id: {
    type: Number,
    required: false,
  },
  teacher_survey_answer_visibility: {
    type: Number,
    required: false,
  },
});

function clickHandler() {
  if (cookies.get("user_type") === "R" || cookies.get("user_type") === "A") {
    eventsStore.storeEventsShowTeacherPopup();
    localStorage.setItem("session_content_id", props.id);
    localStorage.setItem(
      "teacher_survey_answer_visibility",
      props.teacher_survey_answer_visibility
    );
  } else {
    localStorage.setItem("session_content_id", props.id);
    router.push({
      name: "contenuto-id-discenti",
      params: { id: props.id },
    });
  }
}
</script>
<template>
  <div
    :class="with_button ? 'programa-item--with-button' : ''"
    class="programa-item"
  >
    <div class="programa-item__content">
      <h3 class="programa-item__title">{{ title }}</h3>
      <div class="programa-item__infos">
        <div v-if="date" class="programa-item__info">
          <DateIcon />
          <span>{{ date }}</span>
        </div>
        <div v-if="professor" class="programa-item__info">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 15.75C13.6569 15.75 15 14.4069 15 12.75C15 11.0931 13.6569 9.75 12 9.75C10.3431 9.75 9 11.0931 9 12.75C9 14.4069 10.3431 15.75 12 15.75Z"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7.5 18C8.02395 17.3014 8.70336 16.7344 9.48442 16.3438C10.2655 15.9533 11.1267 15.75 12 15.75C12.8733 15.75 13.7345 15.9533 14.5156 16.3438C15.2966 16.7344 15.976 17.3014 16.5 18"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M19.5 20.25V3.75C19.5 3.33579 19.1642 3 18.75 3L5.25 3C4.83579 3 4.5 3.33579 4.5 3.75L4.5 20.25C4.5 20.6642 4.83579 21 5.25 21H18.75C19.1642 21 19.5 20.6642 19.5 20.25Z"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9 6H15"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span>{{ professor }}</span>
        </div>
        <div v-if="hours" class="programa-item__info">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
              stroke-width="1.5"
              stroke-miterlimit="10"
            />
            <path
              d="M12 6.75V12H17.25"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span>{{ hours }}</span>
        </div>
        <div v-if="address" class="programa-item__info">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 12.75C13.6569 12.75 15 11.4069 15 9.75C15 8.09315 13.6569 6.75 12 6.75C10.3431 6.75 9 8.09315 9 9.75C9 11.4069 10.3431 12.75 12 12.75Z"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M19.5 9.75C19.5 16.5 12 21.75 12 21.75C12 21.75 4.5 16.5 4.5 9.75C4.5 7.76088 5.29018 5.85322 6.6967 4.4467C8.10322 3.04018 10.0109 2.25 12 2.25C13.9891 2.25 15.8968 3.04018 17.3033 4.4467C18.7098 5.85322 19.5 7.76088 19.5 9.75V9.75Z"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span>{{ address }}</span>
        </div>
      </div>
    </div>
    <div
      v-if="with_button && status === 1"
      @click="clickHandler"
      class="programa-item__button"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.8203 9.46855L6.57812 2.59355C6.48349 2.53517 6.37499 2.5031 6.26382 2.50064C6.15265 2.49818 6.04284 2.52543 5.94571 2.57956C5.84859 2.6337 5.76766 2.71277 5.71128 2.80861C5.65491 2.90446 5.62512 3.0136 5.625 3.1248V16.8748C5.62512 16.986 5.65491 17.0951 5.71128 17.191C5.76766 17.2868 5.84859 17.3659 5.94571 17.42C6.04284 17.4742 6.15265 17.5014 6.26382 17.499C6.37499 17.4965 6.48349 17.4644 6.57812 17.4061L17.8203 10.5311C17.9126 10.4765 17.9891 10.3988 18.0423 10.3056C18.0954 10.2124 18.1233 10.107 18.1233 9.9998C18.1233 9.89255 18.0954 9.78716 18.0423 9.694C17.9891 9.60084 17.9126 9.52314 17.8203 9.46855V9.46855Z"
          stroke="white"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.programa-item {
  margin-bottom: 3.2rem;
  padding: 3.2rem 3.2rem 0;
  @media screen and (max-width: 1200px) {
    padding: 1.6rem;
  }
  &--with-button {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    background: #d1f4ee;
    border-radius: 16px;
    transition: all 0.4s;
    &:hover {
      color: white;
      background: #65b244;
      .programa-item__info {
        svg {
          stroke: white !important;
        }
      }
      .programa-item__button {
        border-color: white;
      }
    }
  }
  .programa-item__info {
    svg {
      stroke: #464f69;
      transition: all 0.4s;
    }
  }
  &__button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    flex: 0 0 5.2rem;
    height: 5.2rem;
    background: #65b244;
    border-radius: 1.6rem;
    border: 1px solid transparent;
    cursor: pointer;
  }
  &__title {
    margin-bottom: 0.5rem;
    font-size: 2.4rem;
    font-weight: 600;
  }
  &__content {
    padding-bottom: 3.2rem;
    border-bottom: 1px solid #d1f4ee;
    @media screen and (max-width: 1200px) {
      padding-bottom: 0;
    }
  }
  &__infos {
    display: flex;
    align-items: center;
    @media screen and (max-width: 576px) {
    	flex-wrap: wrap;
    }
  }
  &__info {
    display: flex;
    align-items: center;
    margin-right: 3.2rem;
    svg {
      margin-right: 0.8rem;
      width: 2.4rem;
    }
    span {
      font-size: 2rem;
    }
  }
}
</style>