<script lang="ts" setup>
import { useVuelidate } from "@vuelidate/core";
import { helpers, minLength, required } from "@vuelidate/validators";
import { computed } from "@vue/runtime-core";
import { onMounted, ref } from "vue";
import LockOpen from "../../icons/LockOpen.vue";
import Input from "../ui/Input.vue";
import Button from "../ui/Button.vue";
import Loading from "../globals/Loading.vue";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
import { useRouter } from "vue-router";
import { useEventStore } from "../../stores/events-store";
import { storeToRefs } from "pinia";
import TeacherPopup from "../popups/TeacherPopup.vue";
import {E_Routes} from "../../enum/E_Routes";
const router = useRouter();
const eventsStore = useEventStore();
const { event_login } = storeToRefs(eventsStore);
const props = defineProps({
  event_id: {
    type: Number,
    required: true,
  },
  event_slug: {
    type: String,
    required: true,
  },
});
const is_teacher_popup_visible = ref(false);
const name_field = ref("");
const session_content_id = ref(null);
const error = ref(null);
const loading = ref(false);
const rules = computed(() => {
  return {
    name_field: {
      required,
      minLength: helpers.withMessage("Min length is 3", minLength(3)),
    },
  };
});
const $v = useVuelidate(rules, {
  name_field,
});
async function onSubmit() {
  const result = await $v.value.$validate();
  if (result) {
    try {
      loading.value = true;
      await eventsStore.storeEventsLogin(props.event_id, {
        code: name_field.value,
      });
      if (event_login.value.status === "success") {
        loading.value = false;
        error.value = false;
        const userToken = event_login.value.data.userToken;
        const user_type = event_login.value.data.user_type;
        const session_content = event_login.value.data.session_content;
        session_content_id.value = event_login.value.data.session_content_id;
        localStorage.setItem("session_content_id", session_content_id.value);
        localStorage.setItem("session_content", session_content);
        cookies.set("userToken", userToken, "100d");
        cookies.set("user_type", user_type, "100d");
        if (user_type === "R" && session_content === true) {
          setTimeout(() => {
            is_teacher_popup_visible.value = true;
          }, 1000);
        } else {
          localStorage.removeItem("survey_questions");
          localStorage.removeItem("student_surveys");
          setTimeout(() => {
            router.push({
              name: E_Routes.evento_detaglio,
              params: { slug: props.event_slug },
            });
          }, 1000);
        }
      }
    } catch (e) {
      error.value = "Wrong code";
      loading.value = false;
    }
  } else {
    $v.value.$touch();
  }
}
onMounted(() => {
  //D23UUU
  //R23BZS
  name_field.value = props.event_id === 17 ? "R23EYE" : "D23UUU";
  // name_field.value = props.event_id === 17 ? "R23EYE" : "R23BZS";
  // teacher content
  // name_field.value = props.event_id === 17 ? 'R23EYE' : 'R23VAS';
  // name_field.value = 'R23JZU';
});
</script>
<template>
  <div class="login-form">
    <header class="login-form__header">
      <LockOpen />
      <h2 class="login-form__title">Codice di accesso</h2>
      <p>Inserisci il codice d'accesso per poter accedere all'evento</p>
    </header>
    <div class="login-form__body">
      <p v-if="error" class="login-form--error">
        Codice non autorizzato alla visione del contenuto
      </p>
      <Input
        placeholder="Codice d'accesso"
        v-model:value="$v.name_field.$model"
        :errors="$v.name_field.$errors"
      />
    </div>
    <Loading v-if="loading" />
    <footer class="login-form__footer">
      <Button @click="onSubmit">
        <span>Conferma</span>
      </Button>
      <a class="login-form__privacy" target="_blank" href="/privacy-policy"
        >Privacy Policy</a
      >
    </footer>
  </div>

  <TeacherPopup
    v-if="is_teacher_popup_visible"
    @emit_hide="is_teacher_popup_visible = false"
  />
</template>
<style lang="scss" scoped>
.login-form {
  width: 41.6rem;
  background: white;
  border-radius: 1.6rem;
  border-bottom: 1px solid #d1f4ee;
  &__header {
    padding: 3.2rem;
    text-align: center;
    border-bottom: 1px solid #d1f4ee;
  }
  &__title {
    margin-bottom: 1rem;
    font-size: 2rem;
    font-weight: 600;
  }
  &__body {
    padding: 3.2rem;
    border-bottom: 1px solid #d1f4ee;
  }
  &__footer {
    padding: 3.2rem;
    text-align: center;
    .btn {
      margin-bottom: 1.6rem;
    }
  }
  &__privacy {
    text-decoration: underline;
    &:hover {
      text-decoration: none;
    }
  }
  &--error {
    margin-bottom: 3.2rem;
    text-align: center;
    color: var(--error);
  }
}
</style>