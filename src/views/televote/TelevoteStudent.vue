<script lang="ts" setup>
import Body from "../../components/globals/Body.vue";
import {useTelevoteStore} from "../../stores/televote-store";
import {storeToRefs} from "pinia";
import {onMounted, onUnmounted, ref, computed} from "vue";
import {useAxiosToken} from "../../hooks/useAxiosToken";
import {useCookies} from "vue3-cookies";
import {useRoute, useRouter} from "vue-router";
import LightBox from "../../components/question/LightBox.vue";
import CheckboxItem from "../../components/globals/CheckboxItem.vue";
import Preloader from "../../components/ui/Preloader.vue";
import ButtonIcon from "../../components/globals/ButtonIcon.vue";
import RemainingTime from "../../components/Globals/RemainingTime.vue";
import {usePopupStore} from "../../stores/popup-store.js";
import {I_TelevoteOption} from "../../interfaces/I_TelevoteOption";

const loading = ref(false);
const televoteStore = useTelevoteStore();
const {televote_store} = storeToRefs(televoteStore);
const {cookies} = useCookies();
const route = useRoute();
const router = useRouter();
const session_content = ref(null);
const session_content_id = ref(null);
const televote_interval_id = ref(null);
const televote_options = ref<I_TelevoteOption[]>([]);
const televote_id = ref(null);
const event = ref(null);
const errors = ref([]);
const popup_store = usePopupStore();
const close_televote = ref(false);

function getIdFromUrl() {
  const url = route.path;
  const url_array = url.split("/");
  return url_array[url_array.length - 1];
}

const is_finished_time_remaining = computed(() => {
  return televote_store.value.remaining_time === 0;
});
const options_are_empty = computed(() => {
  return (
      televote_options.value.every((item) => item.is_right === false) &&
      televote_store.value.remaining_time !== 0
  );
});
const mutually_exclusive = computed(() => {
  return televote_store.value.mutually_exclusive;
});

function resetCheckbox() {
  televote_options.value = televote_options.value.map((item) => {
    return {
      ...item,
      is_right: false,
    };
  });
}

function checkTelevoteOption(id: number) {
  televote_options.value = televote_options.value.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        is_right: !item.is_right,
      };
    }
    return item;
  });
}

function checkboxHandler(id: number) {
  if (mutually_exclusive.value) {
    resetCheckbox();
    checkTelevoteOption(id);
  } else {
    checkTelevoteOption(id);
  }
}

async function sendData(id) {
  await televoteStore.storeTelevoteOptionAnswer(session_content_id.value, {
    televote_option_id: id,
    televote_id: televote_id.value
  });
}

const televote_btn = computed(() => {
  if (close_televote.value || televote_store.value.remaining_time === 0) {
    return 'Chiudi';
  } else {
    return 'Invia la risposta';
  }
});

async function onSubmit() {
  if (close_televote.value) {
    await router.push({
      name: "contenuto-id-discenti",
      params: {
        id: event.value.id,
      },
    });
  }
  if (is_finished_time_remaining.value) {
    await router.push({
      name: "contenuto-id-discenti",
      params: {
        id: event.value.id,
      },
    });
  } else {
    if (options_are_empty.value !== true) {
      for (const item of televote_options.value) {
        if (item.is_right) {
          try {
            await sendData(item.id);
          } catch (e) {
            errors.value.push('error');
            console.log(e, 'e')
          }
        }
      }
      if (errors.value.length) {
        popup_store.showMiniPopup("Il televoto non è stato avviato");
        close_televote.value = true;
      } else {
        await router.push({
          name: "contenuto-id-discenti",
          params: {
            id: event.value.id,
          },
        });
      }
    }
  }
}

async function init() {
  loading.value = true;
  event.value = JSON.parse(localStorage.getItem("event"));
  const user_token = cookies.get("userToken");
  useAxiosToken(user_token);
  session_content_id.value = localStorage.getItem("session_content_id");
  session_content.value = JSON.parse(
      localStorage.getItem("session_content_object")
  );
  televote_id.value = getIdFromUrl();
  try {
    await televoteStore.storeTelevoteId(session_content.value.id, televote_id.value);
    loading.value = false;
    televote_options.value = televote_store.value.options;
    televote_options.value = televote_options.value.map((item) => {
      return {
        ...item,
        is_right: false,
      };
    });
    localStorage.setItem("televote_id", televote_id.value);
    televote_interval_id.value = setInterval(() => {
      televoteStore.storeTelevoteId(session_content.value.id, televote_id.value);
    }, 1000);
  } catch (e) {
    console.log(e, 'e')
    loading.value = false;
  }
}

onMounted(() => {
  init();
});
onUnmounted(() => {
  clearInterval(televote_interval_id.value);
});
</script>
<template>
  <div class="televote-answer">
    <Body>
    <Preloader v-if="loading"/>
    <div v-else class="televote-answer__container">
      <div v-if="televote_store">
        <header class="televote-answer__header">
          <RemainingTime :time="televote_store?.remaining_time"/>
        </header>
        <div class="televote-answer__body">
          <LightBox>
            <h2 class="televote-answer__title">
              {{ televote_store.question }}
            </h2>
            <div class="televote-answer__options">
              <div
                  v-for="(item, index) in televote_options"
                  :key="index"
                  class="televote-answer__option"
              >
                <CheckboxItem
                    :id="item.id"
                    :title="item.answer"
                    :checked="item.is_right"
                    :preview="false"
                    @emit_click="checkboxHandler"
                />
              </div>
            </div>
          </LightBox>
        </div>
        <footer class="televote-answer__footer">
          <div class="televote-answer__btn">
            <ButtonIcon
                @click="onSubmit"
                :title="televote_btn"
                :dark="true"
                :full="true"
                :disabled="options_are_empty"
            />
          </div>
        </footer>
      </div>
    </div>
    </Body>
  </div>
</template>
<style lang="scss" scoped>
.televote-answer {
  &__header {
    margin-bottom: 3.2rem;
    text-align: center;
  }
  &__container {
    padding: 12.8rem;
    width: 100%;
    @media screen and (max-width: 992px) {
      padding: 6.4rem 3.2rem;
    }
  }
  &__body {
    margin: 0 auto 20rem;
    width: 80rem;
    @media screen and (max-width: 992px) {
      margin-bottom: 8rem;
      width: 100%;
    }
  }
  &__title {
    margin-bottom: 3.2rem;
    font-size: 3.2rem;
    font-weight: 600;
    text-align: center;
  }
  &__options {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -1.6rem;
    @media screen and (max-width: 576px) {
      display: block;
      margin: 0;
    }
  }
  &__option {
    margin: 0 1.6rem 3.2rem;
    flex: 0 0 calc(50% - 3.2rem);
    @media screen and (max-width: 576px) {
      margin: 0 0 3.2rem;
    }
  }
  &__footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  &__receives {
    flex: 0 0 38rem;
  }
  &__btn {
    flex: 0 0 17rem;
  }
}
</style>