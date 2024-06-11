<script setup>
import LightBox from "./LightBox.vue";
import {onMounted, ref} from "vue";

const props = defineProps({
  number_of_dragging_box: {
    type: Number,
    required: true
  },
  dragging_box_title_1: {
    type: String,
    required: false
  },
  dragging_box_title_2: {
    type: String,
    required: false
  },
  dragging_box_title_3: {
    type: String,
    required: false
  },
  dragging_box_title_4: {
    type: String,
    required: false
  },
  list1: {
    type: [Array, Object],
    required: false
  },
  list2: {
    type: [Array, Object],
    required: false
  },
  list3: {
    type: [Array, Object],
    required: false
  },
  list4: {
    type: [Array, Object],
    required: false
  },
  question: {
    type: String,
    required: true
  },
  answer_reason: {
    type: String,
    required: true
  },
});
const wrap_class = ref("");

switch (props.number_of_dragging_box) {
  case 2:
    wrap_class.value = 'drag-answer__row--double';
    break;
  case 3:
    wrap_class.value = 'drag-answer__row--triple';
    break;
  case 4:
    wrap_class.value = 'drag-answer__row--quadruple';
    break;
  default:
    wrap_class.value = 'drag-answer__row--double';
    break;
}

function getTitle(item) {
  switch (item) {
    case 1:
      return props.dragging_box_title_1;
    case 2:
      return props.dragging_box_title_2;
    case 3:
      return props.dragging_box_title_3;
    case 4:
      return props.dragging_box_title_4;
    default:
      return props.dragging_box_title_1;
  }
}

function getListItem(item) {
  switch (item) {
    case 1:
      return props.list1.value;
    case 2:
      return props.list2.value;
    case 3:
      return props.list3.value;
    case 4:
      return props.list4.value;
    default:
      return props.list2.value;
  }
}

onMounted(() => {
  // console.log(props);
});
</script>
<template>
  <div class='drag-answer myscrollbar'>
    <header class="drag-answer__header">
      <LightBox>
        <h2 class="drag-answer__main-title">{{ question }}</h2>
      </LightBox>
    </header>
    <div class="drag-answer__container">
      <h3 class="drag-answer__label">La Risposta corretta è</h3>
      <section
          class="drag-answer__row"
          :class="wrap_class"
      >
        <div
            class="drag-answer__column"
            v-for="i in number_of_dragging_box"
            :key="i"
        >
          <LightBox>
            <h3 class="drag-answer__title">{{ getTitle(i) }}</h3>
            <ul
                class="drag-answer__list"
                :class="{'drag-answer__list--wrap': number_of_dragging_box !== 4}"
            >
              <li
                  class="drag-answer__item"
                  v-for="item in getListItem(i)"
                  :key="item.id"
              >
                {{ item.option_text }}
              </li>
            </ul>
          </LightBox>
        </div>
      </section>
    </div>
    <LightBox>
      <footer class="drag-answer__text">{{ answer_reason }}</footer>
    </LightBox>
  </div>
</template>
<style lang="scss" scoped>
.drag-answer {
  &__header {
    margin-bottom: 3.2rem;
  }
  &__main-title {
    font-size: 3.2rem;
    font-weight: 600;
  }
  &__container {
    margin-bottom: 3.2rem;
    padding: 8px;
    border: 1px solid #8FE1D2;
    border-radius: 18px;
  }
  &__label {
    margin-bottom: 1rem;
    text-align: center;
  }
  &__row {
    display: flex;
    margin: 0 -0.4rem;
    @media screen and (max-width: 1500px) {
    	flex-wrap: wrap;
    }
    @media screen and (max-width: 768px) {
      display: block;
    }
    &--double {
      .drag-answer__column {
        flex: 0 0 calc(50% - 0.8rem);
      }
    }
    &--triple {
      @media screen and (max-width: 1500px) {
        flex-wrap: wrap;
      }
      .drag-answer__column {
        flex: 0 0 calc(33.33% - 0.8rem);
        @media screen and (max-width: 1500px) {
          flex: 0 0 calc(50% - 0.8rem);
        }
      }
    }
  }
  &__column {
    margin: 0 0.4rem;
    flex: 0 0 calc(25% - 0.8rem);
    height: 45rem;
    overflow-y: scroll;
    @media screen and (max-width: 1200px) {
      margin: 0 0.4rem 1.6rem;
      flex: 0 0 calc(50% - 0.8rem);
    }
    @media screen and (max-width: 576px) {
      height: 80rem;
    }
  }
  &__list {
    &.drag-answer__list--wrap {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -1.6rem;
      @media screen and (max-width: 992px) {
        display: block;
        margin: 0;
      }
      .drag-answer__item {
        margin: 0 1.6rem 1.6rem;
        flex: 0 0 calc(50% - 3.2rem);
        @media screen and (max-width: 992px) {
          margin: 0 0 1.6rem;
        }
      }
    }
  }
  &__title {
    margin-bottom: 3.2rem;
    font-size: 3.2rem;
    font-weight: 600;
  }
  &__item {
    margin-bottom: 1.6rem;
    padding: 1.6rem;
    border: 2px solid #65B244;
    border-radius: 16px;
  }
}
</style>