<script setup>
import {useVuelidate} from '@vuelidate/core'
import {email, helpers, required} from '@vuelidate/validators'
import {computed} from "@vue/runtime-core";
import {ref} from "@vue/reactivity";
import Input from "../ui/Input.vue";
import Form from "../ui/Form.vue";
import Textarea from "../ui/Textarea.vue";
import Checkbox from "../ui/Checkbox.vue";
import Button from "../ui/Button.vue";
import {axiosInstance} from "../../axios/axios-instance";
import Loading from "../globals/Loading.vue";

const emits = defineEmits(['close_form_popup']);
const props = defineProps({
  event_id: {
    type: Number,
    required: true
  }
});

const loading = ref(false);
const privacy_selected = ref(false);
const name_field = ref('');
const surname_field = ref('');
const email_field = ref('');
const tel_field = ref('');
const message_field = ref('');

function closeFormPopup() {
  emits('close_form_popup');
}

const rules = computed(() => {
  return {
    name_field: {
      required: helpers.withMessage('Il campo è richiesto.', required),
    },
    surname_field: {
      required: helpers.withMessage('Il campo è richiesto.', required),
    },
    email_field: {
      required: helpers.withMessage('Il campo è richiesto.', required),
      email: helpers.withMessage('Fields must be an email!!!!', email)
    },
    message_field: {
      required: helpers.withMessage('Il campo è richiesto.', required),
    },
  }
});

const $v = useVuelidate(rules, {
  name_field,
  surname_field,
  email_field,
  message_field
});

const onSubmit = async () => {
  const result = await $v.value.$validate()
  if (result) {
    loading.value = true;
    const data = {
      name: name_field.value,
      surname: surname_field.value,
      email: email_field.value,
      phone: tel_field.value,
      message: message_field.value,
    };
    try {
      const response = await axiosInstance.post(`/events/${props.event_id}/info_email`, data);
      if (response.data.status === "success") {
        loading.value = false;
        closeFormPopup();
      }
    } catch (e) {
      loading.value = false;
      console.log(e);
    }
  } else {
    $v.value.$touch();
  }
}
</script>
<template>
  <div class='form-popup'>
    <div class="form-popup__body">
      <Form v-click-outside="closeFormPopup" title="Richiedi informazioni">
        <div class="form__group">
          <Input
              placeholder="Nome"
              v-model:value="$v.name_field.$model"
              :errors="$v.name_field.$errors"
          />
        </div>
        <div class="form__group">
          <Input
              placeholder="Cognome"
              v-model:value="$v.surname_field.$model"
              :errors="$v.surname_field.$errors"
          />
        </div>
        <div class="form__group">
          <Input
              placeholder="Email"
              v-model:value="$v.email_field.$model"
              :errors="$v.email_field.$errors"
          />
        </div>
        <div class="form__group">
          <Input
              placeholder="Telefono"
              v-model:value="tel_field"
          />
        </div>
        <div class="form__group">
          <Textarea
              placeholder="Messaggio"
              v-model:value="$v.message_field.$model"
              :errors="$v.message_field.$errors"
          />
        </div>
        <div class="form__privacy">
          <Checkbox
              value="checkbox"
              label="Cliccando su invia dichiari di aver preso visione e di accettare la nostra privacy policy"
              name="checkbox"
              id="checkbox"
              v-model:checked="privacy_selected"
              :privacy="true"
          />
        </div>
        <Loading v-if="loading"/>
        <Button
            @click="onSubmit"
            color="accent"
            :disabled="privacy_selected === false"
        >
          <span>Invia</span>
        </Button>
      </Form>
    </div>
  </div>
</template>
<style lang="scss">
.form-popup {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  &__body {
    position: relative;
    width: 100%;
    max-width: 41.6rem;
    padding: 3.2rem;
    background: #FFFFFF;
    border-radius: 1.6rem;
  }
  .form__privacy {
    margin-bottom: 2rem;
    .checkbox label {
      height: auto;
    }
  }
}
</style>