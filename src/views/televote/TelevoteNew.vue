<script setup="">
import MainPopup from "../../components/popups/MainPopup.vue";
import Button from "../../components/ui/Button.vue";
import {onMounted, ref, watch} from "vue";
import TelevoteOption from "../../components/televote/TelevoteOption.vue";
import {computed} from "@vue/runtime-core";
import {useTelevoteStore} from "../../stores/televote-store";
import {useAxiosToken} from "../../hooks/useAxiosToken";
import {useCookies} from "vue3-cookies";
import Preloader from "../../components/ui/Preloader.vue";
import {storeToRefs} from "pinia";
import {useRouter} from "vue-router";
import Checkbox from "../../components/ui/Checkbox.vue";
const router = useRouter();
const session_content_id = ref(null);
const options = ref([]);
const televoteStore = useTelevoteStore();
const {televote_new_store} = storeToRefs(televoteStore);
const {cookies} = useCookies();
const question = ref("");
const countdown = ref(0);
const minutes = ref(0);
const seconds = ref(0);
const loading = ref(false);
const exclusive_status = ref(false);
const has_empty_options_computed = computed(() => {
  return options.value.some((option) => {
    return option.title === "";
  });
});
function createOption() {
  if (has_empty_options_computed.value === false) {
    options.value = [
      ...options.value,
      {
        id: new Date().valueOf(),
        answer: "",
        right: false,
      },
    ];
  }
}
function onDelete(id) {
  options.value = options.value.filter((option) => option.id !== id);
}
function onCheck(id) {
  options.value = options.value.map((option) => {
    if (option.id === id) {
      option.right = !option.right;
    }
    return option;
  });
}
function onChange({id, answer}) {
  options.value = options.value.map((option) => {
    if (option.id === id) {
      option.answer = answer;
    }
    return option;
  });
}
watch(minutes, (value) => {
  countdown.value = parseInt(value) * 60 + parseInt(seconds.value);
});
watch(seconds, (value) => {
  countdown.value = parseInt(minutes.value) * 60 + parseInt(value);
});
const is_form_valid_computed = computed(() => {
  return (
      question.value !== "" &&
      options.value.length > 1 &&
      !has_empty_options_computed.value &&
      countdown.value > 0
  );
});
async function onSubmit() {
  loading.value = true;
  const user_token = cookies.get("userToken");
  useAxiosToken(user_token);
  try {
    await televoteStore.storeTelevoteNewRepository(session_content_id.value, {
      session_content_id: session_content_id.value,
      question: question.value,
      options: options.value,
      countdown: countdown.value,
      mutually_exclusive: !exclusive_status.value
    });
    const televote_id = televote_new_store.value.id;
    await televoteStore.storeTelevoteStart(
        session_content_id.value,
        televote_id
    );
    await router.push({
      name: "televote-risposte",
      params: {
        televote_id: televote_new_store.value.id,
        session_content_id: session_content_id.value,
      },
    });
    loading.value = false;
  } catch (e) {
    loading.value = false;
    console.log(e, "e");
  }
}
function onClose() {
  router.back();
}
onMounted(() => {
  session_content_id.value = localStorage.getItem("session_content_id");
});
</script>
<template>
  <div class="televote-new">
    <MainPopup>
      <header class="televote-new__header">
        <div class="televote-new__header-left">
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
        </div>
        <div @click="onClose" class="televote-new__close">
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
      <div class="televote-new__group">
        <div class="televote-new__label">Domanda</div>
        <input
            type="text"
            placeholder="Testo della domanda"
            v-model="question"
        />
      </div>
      <div class="televote-new__checkbox">
        <header class="televote-new__checkbox-header">
          <div class="televote-new__label">Risposta</div>
          <div @click="createOption" class="televote-new__create">
            <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="17" height="17" rx="8.5" fill="#65B244"/>
              <path
                  d="M8.5 12.5L8.5 4.5"
                  stroke="white"
                  stroke-linecap="round"
              />
              <path
                  d="M4.5 8.5L12.5 8.5"
                  stroke="white"
                  stroke-linecap="round"
              />
            </svg>
          </div>
        </header>
        <ul v-if="options.length" class="televote-new__options">
          <li v-for="item in options" :key="item.id">
            <TelevoteOption
                :id="item.id"
                :is_correct="item.right"
                @emit_delete="onDelete"
                @emit_check="onCheck"
                @emit_change="onChange"
            />
          </li>
        </ul>
      </div>
      <div class="televote-new__hours">
        <div class="televote-new__item">
          <div class="televote-new__label">Minuti</div>
          <input class="televote-new__count" type="text" v-model="minutes"/>
        </div>
        <div class="televote-new__item">
          <div class="televote-new__label">Secondi</div>
          <input class="televote-new__count" type="text" v-model="seconds"/>
        </div>
      </div>
      <div class="televote-new__exclusive">
        <Checkbox
            value="exclusive"
            label="Consenti selezione multipla"
            name="exclusive"
            id="exclusive"
            v-model:checked="exclusive_status"/>
      </div>
      <div v-if="!loading" class="televote-new__btn">
        <Button
            @click="onSubmit"
            color="wet-asphalt"
            :disabled="!is_form_valid_computed"
        >Apri il televoto
        </Button>
      </div>
      <Preloader v-else/>
      <Button @click="onClose" color="contrast" :red_color="true"
      >Annulla
      </Button>
    </MainPopup>
  </div>
</template>
<style lang="scss">
.televote-new {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3.2rem;
    &-left {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      svg {
        margin-right: 1rem;
      }
    }
  }
  &__close {
    cursor: pointer;
  }
  &__group {
    margin-bottom: 3.2rem;
    .televote-new__label {
      margin-bottom: 1.6rem;
    }
    input {
      width: 100%;
      height: 5.1rem;
      font-size: 1.4rem;
      text-indent: 3.2rem;
      background: #e6fffa;
      border: none;
      border-bottom: 1px solid #d1f4ee;
      border-radius: 16px;
    }
  }
  &__label {
    font-size: 1.4rem;
    font-weight: 500;
    color: #464f69;
  }
  &__checkbox {
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.6rem;
    }
  }
  &__create {
    cursor: pointer;
  }
  &__hours {
    display: flex;
    justify-content: space-between;
    margin-bottom: 3.2rem;
  }
  &__exclusive {
    margin-bottom: 3.2rem;
    .checkbox {
      label {
        font-size: 1.4rem;
        font-weight: 500;
        color: #464f69;
      }
    }
  }
  &__item {
    flex: 0 0 19.2rem;
    padding: 3.2rem;
    border: 1px solid #d1f4ee;
    border-radius: 16px;
    .televote-new__label {
      margin-bottom: 1.6rem;
      text-align: center;
    }
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
    color: #464f69;
    background: #e6fffa;
    border: none;
    border-bottom: 1px solid #d1f4ee;
    border-radius: 16px;
  }
  &__btn {
    margin-bottom: 3.2rem;
  }
}
</style>
