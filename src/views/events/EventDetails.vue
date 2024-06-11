<script setup>
import {useRoute, useRouter} from "vue-router";
import {onMounted} from "vue";
import BaseLayout from "../../layouts/BaseLayout.vue";
import Logo from "../../components/globals/Logo.vue";
import ProgramaItem from "../../components/programa/ProgramaItem.vue";
import Block from "../../components/globals/Block.vue";
import TextToggled from "../../components/globals/TextToggled.vue";
import Calendar from "../../components/calendar/Calendar.vue";
import LinksBlock from "../../components/globals/LinksBlock.vue";
import Button from "../../components/ui/Button.vue";
import ListIcon from "../../icons/ListIcon.vue";
import {ref} from "@vue/reactivity";
import {useFormatDate} from "../../hooks/useFormatDate";
import Background from "../../components/globals/Background.vue";
import {useCookies} from "vue3-cookies";
import {useEventStore} from "../../stores/events-store";
import {storeToRefs} from "pinia";
import {computed} from "@vue/runtime-core";
import {useAxiosToken} from "../../hooks/useAxiosToken";
import {useSurveyStore} from "../../stores/survey-store";
import TeacherPopup from "../../components/popups/TeacherPopup.vue";
import ContactsList from "../../components/info/ContactsList.vue";
import GlobeIcon from "../../icons/GlobeIcon.vue";
import FormPopup from "../../components/popups/FormPopup.vue";
import DownloadIcon from "../../icons/DownloadIcon.vue";
import useDownloadPdf from "../../hooks/useDownloadPdf";
//store
const eventStore = useEventStore();
const {event, is_teacher_popup_visible} = storeToRefs(eventStore);
const surveyStore = useSurveyStore();
const {session_content_survey_to_fill} = storeToRefs(surveyStore);
const {cookies} = useCookies();
const router = useRouter();
const route = useRoute();
const slug = ref(null);
const loading = ref(true);
const after_loading = ref(false);
const start_date = ref(null);
const end_date = ref(null);
const event_dates = ref([]);
const user_token = ref(null);
const user_type = ref(null);
const session_content_id = ref(null);
const is_form_popup_visible = ref(false);
const toggleFormPopup = (value) => {
  is_form_popup_visible.value = value;
};
function stopLoading() {
  setTimeout(() => {
    loading.value = false;
    setTimeout(() => {
      after_loading.value = true;
    }, 200);
  }, 500);
}
function fillSurvey() {
  const session_content_id =
      session_content_survey_to_fill.value.session_contents[0];
  localStorage.setItem("session_content_id", session_content_id);
  router.push({
    name: "contenuto-id-survey",
    params: {
      id: session_content_id,
    },
  });
}
const getEvent = async () => {
  loading.value = true;
  try {
    await eventStore.storeEventsSlugToEvent(slug.value);
    stopLoading();
  } catch (error) {
    console.log(error, "error");
    stopLoading();
  }
  try {
    await surveyStore.storeSessionContentSurveyToFill(event.value.id);
    localStorage.setItem("session_content_survey_to_fill", JSON.stringify(session_content_survey_to_fill.value.session_contents));
    stopLoading();
  } catch (error) {
    console.log(error, "error storeSessionContentSurveyToFill");
    stopLoading();
  }
  start_date.value = useFormatDate(event.value.start_datetime);
  end_date.value = useFormatDate(event.value.end_datetime);
  localStorage.setItem("background", event.value.background);
  localStorage.setItem("event", JSON.stringify(event.value));
  event_dates.value = [
    {
      title: `${start_date.value.week_word}, ${start_date.value.date_number} ${start_date.value.month_word} ${start_date.value.year}`,
      valid: true,
    },
    {
      title: `${end_date.value.week_word}, ${end_date.value.date_number} ${end_date.value.month_word} ${end_date.value.year}`,
      valid: false,
    },
  ];
};
function resetLocalStorage() {
  localStorage.removeItem("preview");
  localStorage.removeItem("event");
  localStorage.removeItem("background");
  localStorage.removeItem("session_content_id");
  // localStorage.removeItem("session_content");
  localStorage.removeItem("session_content_object");
  localStorage.removeItem("televote_id");
  localStorage.removeItem("teacher_survey_answer_visibility");
  localStorage.removeItem("current_checkboxes_lStorage");
  localStorage.removeItem("slider_images");
  localStorage.removeItem("drag_list");
  localStorage.removeItem("list_1");
  localStorage.removeItem("list_2");
  localStorage.removeItem("list_3");
  localStorage.removeItem("list_4");
}
function formatDateWithWeek(date) {
  const week = useFormatDate(date).week_word;
  const day = useFormatDate(date).date_number;
  const month_word = useFormatDate(date).month_word;
  const year = useFormatDate(date).year;
  return `${week}, ${day} ${month_word} ${year}`;
}
const is_student = computed(() => {
  return user_type.value === "D";
});
const is_teacher = computed(() => {
  return user_type.value === "R";
});
const is_agent = computed(() => {
  return user_type.value === "A";
});
const has_filled_surveys = computed(() => {
  return session_content_survey_to_fill.value?.session_contents.length > 0;
});
async function init() {
  loading.value = true;
  if (!user_token.value) {
    await router.push({name: "home"});
  } else {
    await getEvent();
  }
}
onMounted(() => {
  resetLocalStorage();
  user_token.value = cookies.get("userToken");
  user_type.value = cookies.get("user_type");
  useAxiosToken(user_token.value);
  slug.value = route.params.slug;
  init();
});
</script>
<template>
  <transition appear>
    <Background :background_image="event.background" v-if="!loading">
      <div class="event-details">
        <transition appear>
          <BaseLayout>
            <template v-slot:left>
              <Logo v-if="event.logo" :src="event.logo"/>
            </template>
            <template v-slot:middle>
              <Block :small="true">
                <template v-slot:header>
                  <div>
                    <h2 class="block__subtitle">Prossimi Eventi</h2>
                  </div>
                  <div class="block__survey_finish">
                    <Button
                        @click="fillSurvey"
                        v-if="is_student && has_filled_surveys"
                        color="contrast"
                        :small="true"
                        :style="{'margin-left': 'auto'}"
                    >
                      <ListIcon/>
                      <span>Completa la survey</span>
                    </Button>
                  </div>
                  <Button @click="useDownloadPdf(event)" :small="true" color="contrast">
                    <DownloadIcon/>
                    <span>Scarica il programma</span>
                  </Button>
                </template>
                <template v-slot:default>
                  <div v-if="event.sessions_list && event.sessions_list.length">
                    <div
                        v-for="session_list in event.sessions_list"
                        :key="session_list.id"
                    >
                      <ProgramaItem
                          v-if="
                          session_list.session_status !== 0 &&
                          session_list.visible === 1
                        "
                          :id="session_list.id"
                          :key="session_list.id"
                          :title="''"
                          :date="formatDateWithWeek(session_list.session_date)"
                          :hours="`${session_list.session_start_time} - ${session_list.session_end_time}`"
                          :professor="session_list.teacher"
                          :address="
                          session_list.address ? session_list.address : null
                        "
                      />
                      <div
                          v-if="
                          session_list.session_status !== 0 &&
                          session_list.visible === 1 &&
                          session_list.session_content_list &&
                          session_list.session_content_list.length
                        "
                      >
                        <ProgramaItem
                            v-for="item in session_list.session_content_list"
                            :key="item.id"
                            :id="item.id"
                            :title="item.title"
                            :date="item.date"
                            :hours="`${item.content_start_time} - ${item.content_end_time}`"
                            :professor="item.teacher"
                            :address="session_list.room"
                            :with_button="item.has_slide"
                            :status="item.session_status"
                            :event_id="event.id"
                            :teacher_survey_answer_visibility="item.teacher_survey_answer_visibility"
                        />
                      </div>
                    </div>
                  </div>
                </template>
              </Block>
            </template>
            <template v-slot:right>
              <Block>
                <template v-slot:header>
                  <div>
                    <h2 v-if="event.title" class="event-details__title block__title">
                      <img v-if="is_teacher" src="/images/teacher.svg" alt="">
                      <img v-if="is_agent" src="/images/agent.svg" alt="">
                      <span>{{ event.title }}</span>
                    </h2>
                    <p v-if="event.subtitle" class="block__text">
                      {{ event.subtitle }}
                    </p>
                  </div>
                </template>
                <template v-slot:default>
                  <TextToggled v-if="event.description">{{
                      event.description
                    }}
                  </TextToggled>
                </template>
              </Block>
              <Calendar v-if="event_dates.length" :items="event_dates"/>
              <div class="event-details__links-block">
                <LinksBlock
                    :show_survey="is_student"
                    :survey_link="`/evento/${slug}/survey`"
                    :repository_link="`/evento/${slug}/repository`"
                />
              </div>
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
        </transition>
      </div>
      <TeacherPopup
          v-if="is_teacher_popup_visible"
          @emit_hide="is_teacher_popup_visible = false"
      />
      <Transition>
        <FormPopup
            v-if="!loading && is_form_popup_visible"
            @close_form_popup="toggleFormPopup(false)"
            :event_id="event.id"
        />
      </Transition>
    </Background>
  </transition>
</template>
<style lang="scss" scoped>
.block__survey_finish {
  margin-left: auto;
  margin-right: 1.6rem;
}
.event-details {
  padding: 6.4rem;
  @media screen and (max-width: 1200px) {
    padding: 3.2rem 1.6rem;
  }
  &__title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    img {
      position: relative;
      top: 0.2rem;
      margin-right: 1rem;
      flex: 0 0 2.4rem;
    }
  }
  &__links-block {
    margin-bottom: 3.2rem;
  }
}
</style>