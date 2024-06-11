<script setup>
import DateIcon from "../../icons/DateIcon.vue";
import DateInvalidIcon from "../../icons/DateInvalidIcon.vue";
import Button from "../ui/Button.vue";

const emits = defineEmits(["show_secret_form"]);

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  btn_text: {
    type: String,
    required: false,
  },
  show_time: {
    type: Boolean,
    required: false,
    default: true,
  },
  btn_hidden: {
    type: Boolean,
    required: false,
    default: false,
  },
});

function clickHandler() {
  emits("show_secret_form");
}
</script>
<template>
  <div class='calendar'>
    <div
        v-for="item in items"
        :key="item.title"
        class="calendar__item">
      <div class="calendar__icon">
        <DateIcon v-if="item.valid" type="success"/>
        <DateInvalidIcon v-else/>
      </div>
      <div class="calendar__content">
        <h3 class="calendar__title">{{ item.title }}</h3>
        <div v-if="show_time" class="calendar__time">{{ item.time }}</div>
      </div>
    </div>
    <footer v-if="btn_text" class="calendar__footer">
      <Button
          :hidden="btn_hidden"
          @click="clickHandler">
        <span>Partecipa</span>
      </Button>
    </footer>
  </div>
</template>
<style lang="scss" scoped>
.calendar {
  margin-bottom: 1.6rem;
  background: #fff;
  border-radius: 1.6rem;
  &__item {
    display: flex;
    align-items: center;
    padding: 3.2rem;
    &:not(:last-of-type) {
      border-bottom: 1px solid #D1F4EE;
    }
  }
  &__icon {
    margin-right: 3.7rem;
  }
  &__title {
    margin-bottom: 0.4rem;
    font-size: 2rem;
    font-weight: normal;
  }
  &__time {
    font-size: 2rem;
    font-weight: 600;
  }
  &__footer {
    padding: 3.6rem 3.2rem;
    width: 100%;
  }
}
</style>