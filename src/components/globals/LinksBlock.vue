<script setup>
import Button from "../ui/Button.vue";
import ListIcon from "../../icons/ListIcon.vue";
import RepositoryIcon from "../../icons/RepositoryIcon.vue";

const props = defineProps({
  survey_link: {
    type: String,
    required: true
  },
  show_survey: {
    type: Boolean,
    required: true
  },
  repository_link: {
    type: String,
    required: true
  },
});
</script>
<template>
  <div class='links-block'>
    <div v-if="show_survey" class="links-block__btn">
      <Button
          color="contrast"
          :router_link="survey_link"
      >
        <ListIcon/>
        <span>Survey</span>
      </Button>
    </div>
    <div class="links-block__btn">
      <Button
          color="contrast"
          :router_link="repository_link"
      >
        <RepositoryIcon/>
        <span>Repository</span>
      </Button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.links-block {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 3.2rem;
  padding: 3.2rem;
  background: #ffffff;
  border-radius: 1.6rem;
}
</style>