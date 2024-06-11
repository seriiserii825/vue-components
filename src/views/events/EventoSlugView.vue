<script setup>
import axios from "axios";
import {useRoute} from "vue-router";
import {onMounted} from "vue";
import {useFormatDate} from "../../hooks/useFormatDate";
import Block from "../../components/globals/Block.vue";
import {ref} from "@vue/reactivity";
import ProgramaItem from "../../components/programa/ProgramaItem.vue";
import Calendar from "../../components/calendar/Calendar.vue";
import ContactsList from "../../components/info/ContactsList.vue";
import Button from "../../components/ui/Button.vue";
import FormPopup from "../../components/popups/FormPopup.vue";
import EventInfo from "../../components/events/EventInfo.vue";
import LoginForm from "../../components/events/LoginForm.vue";
import BaseLayout from "../../layouts/BaseLayout.vue";
import Logo from "../../components/globals/Logo.vue";
import TextToggled from "../../components/globals/TextToggled.vue";
import GlobeIcon from "../../icons/GlobeIcon.vue";
import DownloadIcon from "../../icons/DownloadIcon.vue";
import Background from "../../components/globals/Background.vue";
import Loading from "../../components/globals/Loading.vue";
import {useEventStore} from "../../stores/events-store";
import {storeToRefs} from "pinia";
import AgentLogin from "../../components/popups/AgentLogin.vue";
import {computed} from "@vue/runtime-core";
import useDownloadPdf from "../../hooks/useDownloadPdf";
const route = useRoute();
const eventStore = useEventStore();
const {event} = storeToRefs(eventStore);
const event_is_upcoming = ref(false);
const event_is_active = ref(false);
const event_is_finished = ref(false);
const event_is_secret = ref(false);
const event_dates = ref([]);
const loading = ref(true);
const after_loading = ref(false);
const is_form_popup_visible = ref(false);
const event_status = ref(null);
const toggleFormPopup = (value) => {
  is_form_popup_visible.value = value;
};
const start_date = ref(null);
const end_date = ref(null);
const logo_click_count = ref(0);
const is_agent_login_visible = computed(() => {
  return logo_click_count.value === 3;
});
function logoClick() {
  logo_click_count.value += 1;
}
function stopLoading() {
  setTimeout(() => {
    loading.value = false;
    setTimeout(() => {
      after_loading.value = true;
    }, 200);
  }, 500);
}
function showFinishedEvent() {
  event_is_upcoming.value = false;
  event_is_active.value = false;
  event_is_finished.value = true;
  event_is_secret.value = false;
}
function showSecretForm() {
  event_is_upcoming.value = false;
  event_is_active.value = false;
  event_is_finished.value = false;
  event_is_secret.value = true;
}
function showUpcomingEvent() {
  event_is_upcoming.value = true;
  event_is_active.value = false;
  event_is_finished.value = false;
  event_is_secret.value = false;
}
//showActiveEvent
function showActiveEvent() {
  event_is_upcoming.value = false;
  event_is_active.value = true;
  event_is_finished.value = false;
  event_is_secret.value = false;
}
function formatDateWithWeek(date) {
  const week = useFormatDate(date).week_word;
  const day = useFormatDate(date).date_number;
  const month_word = useFormatDate(date).month_word;
  const year = useFormatDate(date).year;
  return `${week}, ${day} ${month_word} ${year}`;
}
const getEvent = async () => {
  loading.value = true;
  const slug = route.params.slug;
  await eventStore.storeEventsSlugToEvent(slug);
  localStorage.setItem("event", JSON.stringify(event.value));
  stopLoading();
  if (localStorage.getItem("show_login_form") === "true") {
    showSecretForm();
    loading.value = false;
  } else {
    const public_event = event.value.public;
    if (public_event) {
      localStorage.setItem("background", event.value.background);
      const visibility_status = event.value.visibility_status;
      event_status.value = event.value.event_status;
      start_date.value = useFormatDate(event.value.start_datetime);
      end_date.value = useFormatDate(event.value.end_datetime);
      event_dates.value = [
        {
          title: `${start_date.value.week_word}, ${start_date.value.date_number} ${start_date.value.month_word} ${start_date.value.year}`,
          time: start_date.value.time,
          valid: true,
        },
        {
          title: `${end_date.value.week_word}, ${end_date.value.date_number} ${end_date.value.month_word} ${end_date.value.year}`,
          time: end_date.value.time,
          valid: false,
        },
      ];
      switch (visibility_status) {
        case 0:
          showFinishedEvent();
          break;
        case 1:
          showActiveEvent();
          break;
        case 2:
          showUpcomingEvent();
          break;
      }
    } else {
      showSecretForm();
    }
  }
};
function downloadItem({url, label}) {
  axios.get(url, {responseType: 'blob'})
      .then(response => {
        const blob = new Blob([response.data], {type: 'application/pdf'})
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = label
        link.click()
        URL.revokeObjectURL(link.href)
      }).catch(console.error)
}
function resetLocalStorage() {
  localStorage.removeItem("preview");
  localStorage.removeItem("event");
  localStorage.removeItem("background");
  localStorage.removeItem("session_content_id");
  // localStorage.removeItem("session_content");
  localStorage.removeItem("session_content_object");
  localStorage.removeItem("televote_id");
  // localStorage.removeItem("survey_questions");
}
onMounted(() => {
  resetLocalStorage();
  getEvent();
});
</script>
<template>
  <main>
    <div class="home" v-if="!loading">
      <Background :background_image="event.background">
        <div class="container">
          <BaseLayout v-if="event_is_active">
            <template v-slot:left>
              <div class="home__logo">
                <Logo
                    v-if="event.logo"
                    :src="event.logo"
                    @click.native="logoClick"
                />
              </div>
            </template>
            <template v-slot:middle>
              <Block>
                <template v-slot:header>
                  <div class="block__titles">
                    <h2 class="block__title">{{ event.title }}</h2>
                    <h3 class="block__subtitle">{{ event.subtitle }}</h3>
                  </div>
                </template>
                <template v-slot:default>
                  <TextToggled>{{ event.description }}</TextToggled>
                </template>
              </Block>
              <Block
                  :small="true"
                  subtitle="Programma"
                  download_text="Scarica il programma"
                  download_file="/files/programma.pdf"
              >
                <template v-slot:header>
                  <div class="block__titles">
                    <h3 class="block__subtitle">Programma</h3>
                  </div>
                  <Button @click="useDownloadPdf(event)" :small="true" color="contrast">
                    <DownloadIcon/>
                    <span>Scarica il programma</span>
                  </Button>
                </template>
                <template v-slot:default>
                  <div v-if="event.sessions_list && event.sessions_list.length">
                    <div v-for="session_list in event.sessions_list">
                      <ProgramaItem
                          :id="session_list.id"
                          :key="session_list.id"
                          :title="session_list.title"
                          :date="formatDateWithWeek(session_list.session_date)"
                          :hours="`${session_list.session_start_time} - ${session_list.session_end_time}`"
                          :professor="session_list.teacher"
                          :address="
                          session_list.address ? session_list.address : null
                        "
                      />
                      <div
                          v-if="
                          session_list.session_content_list &&
                          session_list.session_content_list.length
                        "
                      >
                        <ProgramaItem
                            v-for="item in session_list.session_content_list"
                            :id="item.id"
                            :key="item.id"
                            :title="item.title"
                            :date="item.date"
                            :hours="`${item.content_start_time} - ${item.content_end_time}`"
                            :professor="item.teacher"
                            :address="item.address ? item.address : null"
                        />
                      </div>
                    </div>
                  </div>
                </template>
              </Block>
            </template>
            <template v-slot:right>
              <Calendar
                  v-if="event_dates.length"
                  :items="event_dates"
                  btn_text="Partecipa"
                  :show_time="false"
                  @show_secret_form="showSecretForm"
                  :btn_hidden="event_status !== 1"
              />
              <Block @button_clicked="toggleFormPopup(true)">
                <template v-slot:header>
                  <h2 class="block__subtitle">Contatti</h2>
                  <Button
                      @click="toggleFormPopup(true)"
                      color="contrast"
                      :small="true"
                  >Richiedi informazioni
                  </Button>
                </template>
                <template v-slot:default>
                  <ContactsList
                      :contact_name="event.contact_name"
                      :contact_phone="event.contact_phone"
                      :contact_email="event.contact_email"
                      :contact_note="event.contact_note"
                      :address="event.address"
                      :address_name="event.address_name"
                      :address_postal_code="event.address_postal_code"
                      :address_location="event.address_location"
                      :address_city="event.address_city"
                      :address_province="event.address_province"
                      :address_note="event.address_note"
                  />
                  <Button
                      color="contrast"
                      :external_link="`https://${event.website}`"
                  >
                    <GlobeIcon/>
                    <span>{{ event.website }}</span>
                  </Button>
                </template>
              </Block>
            </template>
          </BaseLayout>
          <div
              v-if="event_is_upcoming || event_is_finished || event_is_secret"
              class="home__center"
          >
            <EventInfo
                v-if="event_is_upcoming"
                title="L'evento sarà disponibile a partire dal"
                :subtitle="`${start_date.date_number} ${start_date.month_word} ${start_date.year}`"
                :text="event.title"
                :footer_text="event.subtitle"
                :success="true"
                :logo_src="event.logo"
            />
            <EventInfo
                v-if="event_is_finished"
                title="L'evento è"
                subtitle="Terminato"
                :text="event.title"
                :footer_text="event.subtitle"
                :logo_src="event.logo"
            />
            <LoginForm
                v-if="event_is_secret"
                :event_id="event.id"
                :event_slug="event.slug"
            />
          </div>
        </div>
      </Background>
    </div>
    <Loading v-else/>
  </main>
  <Transition>
    <FormPopup
        v-if="!loading && is_form_popup_visible"
        @close_form_popup="toggleFormPopup(false)"
        :event_id="event.id"
    />
  </Transition>
  <Transition>
    <AgentLogin
        v-if="is_agent_login_visible"
        :event_id="event.id"
        :event_slug="event.slug"
        @emit_hide="logo_click_count = 0"
    />
  </Transition>
</template>
<style lang="scss" scoped>
.home {
  &__center {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  &__logo {
    cursor: pointer;
  }
}
</style>