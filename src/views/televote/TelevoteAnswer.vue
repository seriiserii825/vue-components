<script setup>
import Body from "../../components/globals/Body.vue";
import { useTelevoteStore } from "../../stores/televote-store";
import { storeToRefs } from "pinia";
import { onMounted, onUnmounted, ref } from "vue";
import { useAxiosToken } from "../../hooks/useAxiosToken";
import { useCookies } from "vue3-cookies";
import { useRoute, useRouter } from "vue-router";
import LightBox from "../../components/question/LightBox.vue";
import CheckboxItem from "../../components/globals/CheckboxItem.vue";
import Preloader from "../../components/ui/Preloader.vue";
import InfoBox from "../../components/globals/InfoBox.vue";
import ButtonIcon from "../../components/globals/ButtonIcon.vue";
import Button from "../../components/ui/Button.vue";
import { computed } from "@vue/runtime-core";
import RemainingTime from "../../components/Globals/RemainingTime.vue";
const loading = ref(false);
const televoteStore = useTelevoteStore();
const { televote_store } = storeToRefs(televoteStore);
const { cookies } = useCookies();
const route = useRoute();
const router = useRouter();
const session_content = ref(null);
let televote_interval_id;
let televote_id = ref(null);
function goToDetail() {
  router.push({
    name: "televote-risposte-dettaglio",
    params: {
      session_content_id: session_content.value.id,
      televote_id: televote_store.value.id,
    },
  });
}
function getIdFromUrl() {
  const url = route.path;
  const url_array = url.split("/");
  return url_array[url_array.length - 2];
}
const answer_received = computed(() => {
  return televote_store.value.answer_received === 0
    ? "0"
    : televote_store.value.answer_received;
});
async function init() {
  loading.value = true;
  const user_token = cookies.get("userToken");
  useAxiosToken(user_token);
  session_content.value = JSON.parse(
    localStorage.getItem("session_content_object")
  );
  try {
    await televoteStore.storeTelevoteId(
      session_content.value.id,
      televote_id.value
    );
    localStorage.setItem("televote_id", televote_id.value);
    televote_interval_id = setInterval(() => {
      televoteStore.storeTelevoteId(
        session_content.value.id,
        televote_id.value
      );
    }, 5000);
    loading.value = false;
  } catch (error) {
    console.log(error, "--- error");
    loading.value = false;
  }
}
function goToTelevoteList() {
  router.push({
    name: "televote-results-id",
    params: {
      id: session_content.value.id,
    },
  });
}
onMounted(() => {
  televote_id.value = getIdFromUrl();
  init();
});
onUnmounted(() => {
  clearInterval(televote_interval_id);
});
</script>
<template>
  <div v-if="televote_store" class="televote-answer">
    <Body>
      <div v-if="loading"></div>
      <div v-else class="televote-answer__container">
        <header class="televote-answer__header">
          <div class="televote-answer__remaining-time">
            <RemainingTime :time="televote_store.remaining_time" />
          </div>
          <div class="televote-answer__go-back">
            <Button @click="goToTelevoteList">Torna alla lista</Button>
          </div>
        </header>
        <div class="televote-answer__body">
          <LightBox>
            <h2 class="televote-answer__title">
              {{ televote_store.question }}
            </h2>
            <div class="televote-answer__options">
              <div
                v-for="(item, index) in televote_store.options"
                :key="index"
                class="televote-answer__option"
              >
                <CheckboxItem :title="item.answer" :checked="item.is_right" />
              </div>
            </div>
          </LightBox>
        </div>
        <footer class="televote-answer__footer">
          <div class="televote-answer__receives">
            <InfoBox
              label="Numero di risposte ricevute"
              v-if="answer_received"
              :value="answer_received"
            />
          </div>
          <div class="televote-answer__btn">
            <ButtonIcon
              @click="goToDetail"
              title="Mostra risultati"
              :dark="true"
              :full="true"
            />
          </div>
        </footer>
      </div>
    </Body>
  </div>
</template>
<style lang="scss" scoped>
.televote-answer {
  position: relative;
  &__header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 3.2rem;
    text-align: center;
  }
  &__remaining-time {
    flex: 0 0 30rem;
  }
  &__go-back {
    position: absolute;
    top: 3.2rem;
    right: 3.2rem;
  }
  &__container {
    padding: 12.8rem;
    width: 100%;
    @media screen and (max-width: 992px) {
      padding: 14.4rem 3.2rem 6.4rem;
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
  }
  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 576px) {
      display: block;
    }
  }
  &__receives {
    flex: 0 0 38rem;
    @media screen and (max-width: 576px) {
      margin-bottom: 3.2rem;
    }
  }
  &__btn {
    flex: 0 0 17rem;
  }
}
</style>