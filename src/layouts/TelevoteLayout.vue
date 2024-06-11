<script setup="">
import Background from "../components/globals/Background.vue";
import HeaderNavigation from "./HeaderNavigation.vue";
import EventInformation from "../components/events/EventInformation.vue";
import BurgerMenu from "../components/navigation/BurgerMenu.vue";
import {onMounted, ref} from "vue";
const background = localStorage.getItem('background');
const event = ref(null);
const session_content = ref(null);
const session_content_id = ref(null);
const loading = ref(true);
onMounted(() => {
  session_content.value = JSON.parse(localStorage.getItem('session_content_object'));
  session_content_id.value = session_content.value.id;
  event.value = JSON.parse(localStorage.getItem('event'));
  loading.value = false;
});
</script>
<template>
  <div v-if="!loading" class='televote-layout'>
    <Background :background_image="background">
      <div class="televote-layout__container">
        <header class="televote-layout__header">
          <HeaderNavigation v-if="session_content.title">
            <template v-slot:left>
              <EventInformation
                  :title="session_content.title"
                  :subtitle="session_content.teacher"
                  :logo="session_content.logo"
              />
            </template>
            <template v-slot:center>
            </template>
            <template v-slot:right>
              <BurgerMenu
                  v-if="session_content_id"
                  :session_content_id="session_content_id"
                  :event_slug="event.slug"
              />
            </template>
          </HeaderNavigation>
        </header>
        <slot/>
      </div>
    </Background>
  </div>
</template>
<style lang="scss" scoped>
.televote-layout {
  &__header {
    position: relative;
    z-index: 100;
  }
  &__container {
    padding: 3.2rem;
  }
}
</style>