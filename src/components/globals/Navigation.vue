<script setup>
const emits = defineEmits(["emit_prev", "emit_next", "emit_center_mode", "emit_close_btn", "emit_slide"]);
const props = defineProps({
  prev_link: {
    type: String,
    required: false
  },
  prev_link_tooltip: {
    type: String,
    required: false
  },
  prev_link_disabled: {
    type: Boolean,
    required: false,
    default: false
  },
  center_link: {
    type: [String, Object],
    required: false
  },
  center_link_tooltip: {
    type: [String, Object],
    required: false
  },
  center_mode: {
    type: Boolean,
    required: false,
    default: false
  },
  next_link: {
    type: [String, Boolean],
    required: false
  },
  next_link_tooltip: {
    type: String,
    required: false
  },
  next_link_disabled: {
    type: Boolean,
    required: false,
    default: false
  },
  current_slide: {
    type: Number,
    required: false,
  },
  close_btn: {
    type: Boolean,
    required: false,
    default: false
  }
});

function prevHandler() {
  emits("emit_prev");
}

function nextHandler() {
  emits("emit_next");
}

function centerModeHandler() {
  emits("emit_center_mode");
}

function closeBtnHandler() {
  emits("emit_close_btn");
}
function goToSlide(current_slide){
  emits("emit_slide", current_slide);
}
</script>
<template>
  <div class='navigation prevent-select'>
    <div :class="{'navigation__btn--disabled': !prev_link}" class="navigation__btn" @click="prevHandler">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.5 8H2.5" stroke="#464F69" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M7 3.5L2.5 8L7 12.5" stroke="#464F69" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span v-if="prev_link_tooltip" class="navigation__tooltip">{{ prev_link_tooltip }}</span>
    </div>
    <router-link v-if="center_link" class="navigation__btn-center" :to="center_link">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M13.3375 6.85062L8.3375 2.30687C8.24533 2.22255 8.12493 2.17578 8 2.17578C7.87507 2.17578 7.75467 2.22255 7.6625 2.30687L2.6625 6.85062C2.61219 6.89814 2.57189 6.95524 2.54398 7.01857C2.51607 7.0819 2.50112 7.15018 2.5 7.21937V13.0006C2.5 13.1332 2.55268 13.2604 2.64645 13.3542C2.74021 13.4479 2.86739 13.5006 3 13.5006H13C13.1326 13.5006 13.2598 13.4479 13.3536 13.3542C13.4473 13.2604 13.5 13.1332 13.5 13.0006V7.21937C13.4989 7.15018 13.4839 7.0819 13.456 7.01857C13.4281 6.95524 13.3878 6.89814 13.3375 6.85062V6.85062Z"
            stroke="#464F69" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span v-if="center_link_tooltip" class="navigation__tooltip">{{ center_link_tooltip }}</span>
    </router-link>
    <div
        v-if="center_mode"
        @click="centerModeHandler"
        class="navigation__center">
      <svg width="60" height="20" viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1.25" y="3.25" width="13.5" height="13.5" rx="2.75" stroke="#464F69" stroke-width="1.5"/>
        <rect x="21.25" y="1.25" width="17.5" height="17.5" rx="2.75" stroke="#464F69" stroke-width="1.5"/>
        <rect x="45.25" y="3.25" width="13.5" height="13.5" rx="2.75" stroke="#464F69" stroke-width="1.5"/>
      </svg>
    </div>
    <div
        v-if="close_btn"
        @click="closeBtnHandler"
        class="navigation__close">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.08105 11L10.9191 1.16199" stroke="white" stroke-width="2" stroke-linecap="round"/>
        <path d="M1.08105 1L10.9191 10.838" stroke="white" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </div>
    <div :class="{'navigation__btn--disabled': !next_link}" class="navigation__btn" @click="nextHandler">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.5 8H13.5" stroke="#464F69" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M9 3.5L13.5 8L9 12.5" stroke="#464F69" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span v-if="next_link_tooltip" class="navigation__tooltip">{{ next_link_tooltip }}</span>
    </div>
    <div v-if="current_slide" @click="goToSlide(current_slide)" class="navigation__current">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 3.5L13.5 8L9 12.5" stroke="#464F69" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M4 3.5L8.5 8L4 12.5" stroke="#464F69" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.navigation {
  display: flex;
  justify-content: center;
  align-items: center;
  &__btn {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3.2rem;
    height: 3.2rem;
    background: #fff;
    border-radius: 50%;
    cursor: pointer;
    transition: all .6s;
    &:hover {
      background: #464F69;
      transform: scale(1.5);
      svg {
        path {
          stroke: #fff;
        }
      }
      .navigation__tooltip {
        opacity: 1;
      }
    }
    &:active {
      transform: scale(0.9);
    }
    &--disabled {
      opacity: 0;
      pointer-events: none;
    }
    svg {
      path {
        transition: all .4s;
      }
    }
  }
  &__btn-center {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 4.8rem;
    height: 3.2rem;
    background: #fff;
    border-radius: 3.2rem;
    margin: 0 3.2rem;
    &:hover {
      .navigation__tooltip {
        opacity: 1;
      }
    }
  }
  &__tooltip {
    position: absolute;
    top: 110%;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.8rem 1.6rem;
    font-size: 1.2rem;
    font-weight: 500;
    color: white;
    background: #000;
    border-radius: 0.8rem;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: all .6s;
  }
  &__center {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 3.2rem;
    padding: 0.8rem 2rem;
    background: #fff;
    border-radius: 3.2rem;
    cursor: pointer;
  }
  &__current {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3.2rem;
    height: 3.2rem;
    //background: #fff;
    background: #D1F4EE;
    border-radius: 50%;
    margin: 0 3.2rem;
    cursor: pointer;
    @media screen and (max-width: 576px) {
      margin: 0 1.6rem;
    }
  }
  &__close {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 3.2rem;
    width: 3.2rem;
    height: 3.2rem;
    background: #FF5A5A;
    border-radius: 50%;
    cursor: pointer;
    @media screen and (max-width: 576px) {
      margin: 0 1.6rem;
    }
  }
}
</style>