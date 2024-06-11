<script setup>
import {useVuelidate} from '@vuelidate/core'
import {email, helpers, minLength, required, sameAs} from '@vuelidate/validators'
import {computed} from "@vue/runtime-core";
import {onMounted, ref} from "vue";

import SectionHeader from "../../components/globals/SectionHeader.vue";
import Input from "../../components/ui/Input.vue";
import Button from "../../components/ui/Button.vue";
import PreCode from "../../components/ui/PreCode.vue";
import usePrism from "../../hooks/usePrism";

const name_field = ref('');
const email_field = ref('');
const password_field = ref('');
const confirm_password_field = ref('');
const frontend_field = ref('');

function mustIncludeFrontend(value) {
  return value.includes('frontend');
}

const rules = computed(() => {
  return {
    name_field: {
      required,
      minLength: helpers.withMessage('Min length is 3', minLength(3))
    },
    email_field: {
      required,
      email: helpers.withMessage('Fields must be an email!!!!', email)
    },
    password_field: {
      required,
      minLength: helpers.withMessage('Min length is 6', minLength(6))
    },
    confirm_password_field: {
      required,
      minLength: helpers.withMessage('Min length is 6', minLength(6)),
      sameAsPassword: helpers.withMessage('Passwords must match', sameAs(password_field))
    },
    frontend_field: {
      required,
      mustIncludeFrontend: helpers.withMessage('Must include frontend', mustIncludeFrontend)
    },
  }
});

const $v = useVuelidate(rules, {
  name_field,
  email_field,
  password_field,
  confirm_password_field,
  frontend_field
});

function onSubmit() {
  $v.value.$touch();
}


const code_js = `
function mustIncludeFrontend(value) {
  return value.includes('frontend');
}

const rules = computed(() => {
  return {
    name_field: {
      required,
      minLength: helpers.withMessage('Min length is 3', minLength(3))
    },
    email_field: {
      required,
      email: helpers.withMessage('Fields must be an email!!!!', email)
    },
    password_field: {
      required,
      minLength: helpers.withMessage('Min length is 6', minLength(6))
    },
    confirm_password_field: {
      required,
      minLength: helpers.withMessage('Min length is 6', minLength(6)),
      sameAsPassword: helpers.withMessage('Passwords must match', sameAs(password_field))
    },
    frontend_field: {
      required,
      mustIncludeFrontend: helpers.withMessage('Must include frontend', mustIncludeFrontend)
    },
  }
});

const $v = useVuelidate(rules, {
  name_field,
  email_field,
  password_field,
  confirm_password_field,
  frontend_field
});

function onSubmit() {
  $v.value.$touch();
}
`;

const code_html = `
    <Input
        label="Min length"
        placeholder="placeholder..."
       v-model:value="$v.name_field.$model"
        :errors="$v.name_field.$errors"
    />
    <br><br>
    <Input
        label="Email"
        placeholder="Email..."
        v-model:value="$v.email_field.$model"
        :errors="$v.email_field.$errors"
    />
    <br><br>
    <Input
        label="Password"
        v-model:value="$v.password_field.$model"
        :errors="$v.password_field.$errors"
        type="password"
    />
    <br><br>
    <Input
        label="Confirm Password"
        v-model:value="$v.confirm_password_field.$model"
        :errors="$v.confirm_password_field.$errors"
        type="password"
    />
    <br><br>
    <Input
        label="Must include frontend"
        v-model:value="$v.frontend_field.$model"
        :errors="$v.frontend_field.$errors"
        type="text"
    />
    <br><br><br><br>
    <Button
        label="Submit"
        @click="onSubmit"
    />
`;

onMounted(() => {
  usePrism();
});
</script>
<template>
  <div class='input-view'>
    <SectionHeader title="Input"/>
    <Input
        label="Min length"
        placeholder="placeholder..."
        v-model:value="$v.name_field.$model"
        :errors="$v.name_field.$errors"
    />
    <br><br>
    <Input
        label="Email"
        placeholder="Email..."
        v-model:value="$v.email_field.$model"
        :errors="$v.email_field.$errors"
    />
    <br><br>
    <Input
        label="Password"
        v-model:value="$v.password_field.$model"
        :errors="$v.password_field.$errors"
        type="password"
    />
    <br><br>
    <Input
        label="Confirm Password"
        v-model:value="$v.confirm_password_field.$model"
        :errors="$v.confirm_password_field.$errors"
        type="password"
    />
    <br><br>
    <Input
        label="Must include frontend"
        v-model:value="$v.frontend_field.$model"
        :errors="$v.frontend_field.$errors"
        type="text"
    />
    <br><br><br><br>
    <Button
        label="Submit"
        @click="onSubmit"
    />

    <br><br><br><br><br><br>
    <SectionHeader title="Code"/>
    <PreCode class-name="language-javascript">{{ code_js }}</PreCode>
    <br><br><br>
    <PreCode>{{ code_html }}</PreCode>
  </div>
</template>