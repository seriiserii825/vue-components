<script setup>
import { storeToRefs } from "pinia";
import LockOpen from "../../icons/LockOpen.vue";
import Loading from "../globals/Loading.vue";
import Button from "../ui/Button.vue";
import { onMounted, ref } from "vue";
import { computed } from "@vue/runtime-core";
import { helpers, minLength, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useEventStore } from "../../stores/events-store";
import Input from "../ui/Input.vue";
import { useRouter } from "vue-router";
import { useCookies } from "vue3-cookies";
const eventsStore = useEventStore();
const { event_login } = storeToRefs(eventsStore);
const emits = defineEmits(["emit_hide"]);
const { cookies } = useCookies();
const router = useRouter();
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
const name_field = ref("");
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
function hidePopup() {
  emits("emit_hide");
}
async function onSubmit() {
  const result = await $v.value.$validate();
  if (result) {
    try {
      loading.value = true;
      await eventsStore.storeEventsLogin(props.event_id, {
        code: name_field.value,
        agent: 1,
      });
      if (event_login.value.status === "success") {
        loading.value = false;
        error.value = false;
        const userToken = event_login.value.data.userToken;
        const user_type = event_login.value.data.user_type;
        // const session_content_id = event_login.value.data.session_content_id;
        // localStorage.setItem('session_content_id', session_content_id);
        cookies.set("userToken", userToken, "100d");
        cookies.set("user_type", user_type, "100d");
        if (user_type === "A") {
          router.push({
            name: "evento_detaglio",
            params: { slug: props.event_slug },
          });
        } else {
          error.value = "Attenzione il codice inserito non è valido";
        }
      }
    } catch (e) {
      console.log(e, "e");
      error.value = "Attenzione il codice inserito non è valido";
      loading.value = false;
    }
  } else {
    $v.value.$touch();
  }
}
onMounted(() => {
  // student
  //D23UUU
  // name_field.value = props.event_id === 17 ? 'R23EYE' : 'D23UUU';
  // name_field.value = props.event_id === 17 ? 'R23EYE' : 'R23BZS';
  name_field.value = props.event_id === 17 ? "R23EYE" : "A23YQW";
  // name_field.value = 'R23JZU';
});
</script>
<template>
  <div class="login-form-container">
    <div class="login-form">
      <header class="login-form__header">
        <LockOpen />
        <h2 class="login-form__title">Codice di accesso</h2>
        <p>Inserisci il codice d'accesso per poter accedere all'evento</p>
      </header>
      <div class="login-form__body">
        <p v-if="error" class="login-form--error">{{ error }}</p>
        <Input
          placeholder="Codice d'accesso"
          v-model:value="$v.name_field.$model"
          :errors="$v.name_field.$errors"
          type="password"
        />
      </div>
      <Loading v-if="loading" />
      <footer class="login-form__footer">
        <Button @click="onSubmit">
          <span>Conferma</span>
        </Button>
        <Button
          color="contrast"
          text_color="red"
          :red_color="true"
          @click="hidePopup"
        >
          <span>Annulla</span>
        </Button>
        <a class="login-form__privacy" target="_blank" href="/privacy-policy"
          >Privacy Policy</a
        >
      </footer>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.login-form-container {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(8px);
  z-index: 1000;
}
.login-form {
  width: 41.6rem;
  background: white;
  border-radius: 1.6rem;
  border-bottom: 1px solid #d1f4ee;
  box-shadow: 0 0 1.6rem rgba(0, 0, 0, 0.1);
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