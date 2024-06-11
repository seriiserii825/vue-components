<script setup>
const emits = defineEmits(["emit_start_survey"]);
import Button from "../ui/Button.vue";

function startSurvey() {
  emits("emit_start_survey");
}
</script>
<template>
  <div class='start-survey'>
    <h2 class="start-survey__title">La seguente indagine è del tutto anonima e verrà utilizzata per migliorare la
      qualità dei prossimi
      eventi</h2>
    <Button class="btn" :small="true" @click="startSurvey">Inizia</Button>
  </div>
</template>
<style lang="scss" scoped>
.start-survey {
  align-self: center;
  margin: 0 auto;
  max-width: 71rem;
  text-align: center;
  &__title {
    margin-bottom: 3.2rem;
  }
}
</style>