<script setup>
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {useEventStore} from "../../stores/events-store";
import {storeToRefs} from "pinia";
import {useCookies} from "vue3-cookies";
import LoginForm from "../../components/events/LoginForm.vue";
import TeacherPopup from "../../components/popups/TeacherPopup.vue";
import useResetLocalStorage from "../../hooks/useResetLocalStorage";
const eventStore = useEventStore();
const {event, event_login} = storeToRefs(eventStore);
const route = useRoute();
const loading = ref(false);
const {cookies} = useCookies();
const router = useRouter();
const is_visible_login_form = ref(false);
const is_teacher_popup_visible = ref(false);
function checkIfUserIsLoggedInWithCode() {
  if (event_login.value.status === "success") {
    localStorage.setItem("event", JSON.stringify(event.value));
    const userToken = event_login.value.data.userToken;
    const user_type = event_login.value.data.user_type;
    const session_content = event_login.value.data.session_content;
    const session_content_id = route.params.session_content_id;
    localStorage.setItem("session_content_id", session_content_id);
    localStorage.setItem("session_content", session_content);
    cookies.set("userToken", userToken, "100d");
    cookies.set("user_type", user_type, "100d");
    if (user_type === "D" && session_content === true) {
      router.push({
        name: "contenuto-id-discenti",
        params: {id: session_content_id},
      });
    }
  }
}
async function init() {
  useResetLocalStorage();
  const code = route.query.code;
  if (code) {
    loading.value = true;
    const slug = route.params.slug;
    try {
      await eventStore.storeEventsSlugToEvent(slug);
      localStorage.setItem("event", JSON.stringify(event.value));
      localStorage.setItem("background", JSON.stringify(event.value.background));
      loading.value = false;
    } catch (e) {
      console.log(e, 'e')
      loading.value = false;
    }
    try {
      await eventStore.storeEventsLogin(event.value.id, {
        code: code,
      });
    } catch (e) {
      is_visible_login_form.value = true;
      console.log(e, 'e login is not valid')
    }
    checkIfUserIsLoggedInWithCode();
  }
}
onMounted(() => {
  init();
})
</script>
<template>
  <div class='event-info'>
    <Transition name="down" appear>
      <div :key="1">
        <LoginForm
            v-if="is_visible_login_form"
            :event_id="event.id"
            :event_slug="event.slug"
        />
      </div>
    </Transition>

    <Transition>
      <TeacherPopup
          v-if="is_teacher_popup_visible"
          @emit_hide="is_teacher_popup_visible = false"
      />
    </Transition>
  </div>
</template>
<style lang="scss" scoped>
.event-info {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.down-enter-active {
  transition: all 1.5s ease-out;
  transition-delay: 1s;
}
.down-enter-from,
.down-leave-to {
  transform: translateY(-1080px);
  opacity: 0.6;
}
</style>
