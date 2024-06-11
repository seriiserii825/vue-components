<script setup>
import Body from "../../components/globals/Body.vue";
import BackBtn from "../../components/globals/BackBtn.vue";
import LightBox from "../../components/question/LightBox.vue";
import { onMounted, ref } from "vue";
import { useTelevoteStore } from "../../stores/televote-store";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useAxiosToken } from "../../hooks/useAxiosToken";
import { useCookies } from "vue3-cookies";
const televote_store = useTelevoteStore();
const { televote_answers } = storeToRefs(televote_store);
const session_content = ref(null);
const router = useRouter();
const { cookies } = useCookies();

function goBack() {
  router.push({
    name: "televote-results-id",
    params: {
      id: session_content.value.id,
    },
  });
}
async function init() {
  session_content.value = JSON.parse(
    localStorage.getItem("session_content_object")
  );
  const user_token = cookies.get("userToken");
  useAxiosToken(user_token);
  await televote_store.storeTelevoteAnswers(
    session_content.value.id,
    localStorage.getItem("televote_id")
  );
}
onMounted(() => {
  init();
});
</script>
<template>
  <div class="televote-answer-detail">
    <Body>
      <div class="televote-answer-detail__container">
        <div class="televote-answer-detail__btn">
          <BackBtn @click="goBack" />
        </div>
        <LightBox>
          <div class="televote-answer-detail__body">
            <h2 class="televote-answer-detail__title">
              {{ televote_answers.question }}
            </h2>
            <div
              v-for="item in televote_answers.answers"
              :key="item.id"
              class="televote-answer-detail__item"
            >
              <span class="televote-answer-detail__label">{{
                item.answer
              }}</span>
              <div class="televote-answer-detail__percent">
                <strong>{{ item.percentage }}</strong> %
              </div>
            </div>
          </div>
        </LightBox>
      </div>
    </Body>
  </div>
</template>
<style lang="scss" scoped>
.televote-answer-detail {
  position: relative;
  &__container {
    align-self: center;
  }
  &__btn {
    position: absolute;
    top: 12.8rem;
    left: 12.8rem;
  }
  &__body {
    margin: 0 auto;
    width: 80rem;
  }
  &__title {
    margin-bottom: 3.2rem;
    font-size: 3.2rem;
    font-weight: 600;
    text-align: center;
  }
  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3.2rem;
    padding: 0 3.2rem;
    width: 100%;
    height: 53px;
    border: 1px solid #d1f4ee;
    border-radius: 16px;
  }
  &__label {
    font-size: 16px;
    font-weight: 600;
    color: #464f69;
  }
  &__percent {
    font-size: 16px;
    font-weight: 500;
    strong {
      font-size: 16px;
      font-weight: 700;
      color: #65b244;
    }
  }
}
</style>