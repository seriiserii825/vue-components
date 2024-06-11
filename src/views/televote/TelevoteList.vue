<script setup>
import Body from "../../components/globals/Body.vue";
import { useTelevoteStore } from "../../stores/televote-store";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useCookies } from "vue3-cookies";
import { useAxiosToken } from "../../hooks/useAxiosToken";
import { useRouter } from "vue-router";
import BackBtn from "../../components/globals/BackBtn.vue";
const { cookies } = useCookies();
const session_content = ref(null);
const televote_store = useTelevoteStore();
const { televote_list } = storeToRefs(televote_store);
const router = useRouter();
function goToTelevote(id) {
  router.push({
    name: "televote-risposte",
    params: {
      session_content_id: session_content.value.id,
      televote_id: id,
    },
  });
}
function goBack() {
  router.push({
    name: "contenuto-id",
    params: {
      session_content_id: session_content.value.id,
    },
  });
}
async function init() {
  session_content.value = JSON.parse(
    localStorage.getItem("session_content_object")
  );
  const user_token = cookies.get("userToken");
  useAxiosToken(user_token);
  await televote_store.storeTelevoteList(session_content.value.id);
  televote_list.value.forEach((item) => {
    console.log(item.question, "item.question");
    console.log(item.running, "item.running");
  });
}
onMounted(() => {
  init();
});
</script>
<template>
  <div class="televote-list myscrollbar">
    <div class="televote-list__wrap">
      <div class="televote-list__back">
        <BackBtn @click="goBack" />
      </div>
      <Body>
        <div class="televote-list__body">
          <header class="televote-list__header">
            <h2 class="televote-list__title">Risultati televoto</h2>
          </header>
          <div class="televote-list__container">
            <div
              v-for="item in televote_list"
              :key="item.id"
              class="televote-list__item"
              :class="{ active: item.running }"
            >
              <div class="televote-list__time">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                    stroke="#464F69"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                  />
                  <path
                    d="M12 6.75V12H17.25"
                    stroke="#464F69"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span>{{ item.start_time }}</span>
              </div>
              <div class="televote-list__label">{{ item.question }}</div>
              <div @click="goToTelevote(item.id)" class="televote-list__play">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.8203 9.46806L6.57812 2.59306C6.48349 2.53468 6.37499 2.50261 6.26382 2.50015C6.15265 2.49769 6.04284 2.52494 5.94571 2.57907C5.84859 2.63321 5.76766 2.71228 5.71128 2.80812C5.65491 2.90397 5.62512 3.01312 5.625 3.12431V16.8743C5.62512 16.9855 5.65491 17.0947 5.71128 17.1905C5.76766 17.2863 5.84859 17.3654 5.94571 17.4195C6.04284 17.4737 6.15265 17.5009 6.26382 17.4985C6.37499 17.496 6.48349 17.4639 6.57812 17.4056L17.8203 10.5306C17.9126 10.476 17.9891 10.3983 18.0423 10.3051C18.0954 10.212 18.1233 10.1066 18.1233 9.99931C18.1233 9.89207 18.0954 9.78667 18.0423 9.69351C17.9891 9.60036 17.9126 9.52265 17.8203 9.46806V9.46806Z"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Body>
    </div>
  </div>
</template>
<style lang="scss">
.televote-list {
  position: relative;
  z-index: 1;
  &__wrap {
    position: relative;
  }
  &__title {
    margin-bottom: 6.4rem;
    text-align: center;
  }
  &__body {
    padding: 12.8rem 0;
  }
  &__back {
    position: absolute;
    top: 6.4rem;
    right: 6.4rem;
    z-index: 100;
  }
  &__container {
    height: 58rem;
    overflow-y: scroll;
  }
  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3.2rem;
    padding: 0 3.2rem;
    width: 78.4rem;
    height: 116px;
    border: 1px solid #d1f4ee;
    border-radius: 16px;
    @media screen and (max-width: 992px) {
      width: 100%;
    }
    &.active {
      background: #d1f4ee;
      border-color: var(--accent);
      .televote-list__play {
        background: var(--accent);
        border-color: var(--accent);
        svg {
          stroke: white;
        }
      }
    }
  }
  &__time {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 8rem;
    svg {
      margin-right: 1.6rem;
    }
  }
  &__label {
    margin-right: auto;
    margin-left: 1rem;
    font-size: 2rem;
    font-weight: 600;
  }
  &__play {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0 0 5.2rem;
    height: 5.2rem;
    border: 1px solid #d1f4ee;
    border-radius: 16px;
    cursor: pointer;
    svg {
      stroke: #464f69;
    }
  }
}
</style>