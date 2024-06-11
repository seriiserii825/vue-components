<script setup>
import Background from "../../components/globals/Background.vue";
import Loading from "../../components/globals/Loading.vue";
import {ref} from "@vue/reactivity";
import {useEventStore} from "../../stores/events-store";
import {useCookies} from "vue3-cookies";
import {storeToRefs} from "pinia";
import {useRoute, useRouter} from "vue-router";
import {useAxiosToken} from "../../hooks/useAxiosToken";
import {onMounted} from "vue";
import HeaderNavigation from "../../layouts/HeaderNavigation.vue";
import EventInformation from "../../components/events/EventInformation.vue";
import Body from "../../components/globals/Body.vue";
import Repository from "../../components/repository/Repository.vue";
const eventStore = useEventStore();
const {event, event_repository} = storeToRefs(eventStore);
const route = useRoute();
const router = useRouter();
const user_token = ref(null);
const {cookies} = useCookies();
const loading = ref(true);
const after_loading = ref(false);
const slug = ref(false);
function stopLoading() {
  setTimeout(() => {
    loading.value = false;
    setTimeout(() => {
      after_loading.value = true;
    }, 200);
  }, 500)
}
const getEvent = async () => {
  loading.value = true;
  try {
    await eventStore.storeEventsSlugToEvent(slug.value);
    await eventStore.storeEventsRepository(event.value.id);
    stopLoading();
  } catch (e) {
    console.log(e, 'e')
    stopLoading();
  }
}
onMounted(() => {
  user_token.value = cookies.get('userToken');
  useAxiosToken(user_token.value);
  slug.value = route.params.slug;
  getEvent();
})
</script>
<template>
  <main>
    <div v-if="!loading">
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
            <Repository
                v-if="event_repository.length > 0"
                :items="event_repository"
            />
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