<script setup lang="ts">
import { ref } from "vue";
import Radio from "../Form/Radio.vue";

const assistance_options = ref([
  { id: 1, title: "Azienda / Ditta individuale" },
  { id: 2, title: "Persona fisica" },
]);

const selected_option = ref(assistance_options.value[0].id);
</script>

<template>
  <div class="ask-assistance">
    <div class="ask-assistance__wrap">
      <div v-for="item in assistance_options" class="ask-assistance__item">
        <Radio
          :key="item.id"
          :id="item.id"
          :label="item.title"
          name="assistance_type"
          v-model:radio="selected_option" />
      </div>
    </div>
  </div>
</template>
