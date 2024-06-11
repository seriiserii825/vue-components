<script setup>
import Background from "../../components/globals/Background.vue";
import HeaderNavigation from "../../layouts/HeaderNavigation.vue";
import EventInformation from "../../components/events/EventInformation.vue";
import Body from "../../components/globals/Body.vue";
import {onMounted, ref} from "vue";
import Loading from "../../components/globals/Loading.vue";
import Repository from "../../components/repository/Repository.vue";
import {useAxiosToken} from "../../hooks/useAxiosToken";
import {useCookies} from "vue3-cookies";
import {useSessionContentStore} from "../../stores/content-store";
import {storeToRefs} from "pinia";
const event = ref(null);
const session_content_id = ref(null);
const loading = ref(false);
const user_token = ref(null);
const {cookies} = useCookies();
const session_store = useSessionContentStore();
const {session_content_repository} = storeToRefs(session_store);
function goBack() {
  console.log('some back')
}
async function init() {
  loading.value = true;
  event.value = JSON.parse(localStorage.getItem('event'));
  session_content_id.value = localStorage.getItem('session_content_id');
  try {
    await session_store.storeSessionContentRepository(session_content_id.value);
    loading.value = false;
  } catch (e) {
    loading.value = false;
  }
}
onMounted(() => {
  user_token.value = cookies.get('userToken');
  useAxiosToken(user_token.value);
  init();
})
</script>
<template>
  <main>
    <div v-if="!loading && event">
      <Background :background_image="event.background">
        <div class="container">
          <div class="padding">
            <HeaderNavigation>
              <template v-slot:left>
                <EventInformation
                    :title="event.title"
                    :subtitle="event.subtitle"
                    :logo="event.logo"
                />
              </template>
              <template v-slot:center></template>
              <template v-slot:right>
                <div></div>
              </template>
            </HeaderNavigation>
            <Body>
            <Repository :items="session_content_repository"/>
            </Body>
          </div>
        </div>
      </Background>
    </div>
    <Loading v-else/>
  </main>
</template>
<style lang="scss" scoped>
</style>