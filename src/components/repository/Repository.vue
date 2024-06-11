<script setup>
import BackBtn from "../globals/BackBtn.vue";
import RepositoryItem from "./RepositoryItem.vue";
import {useRouter} from "vue-router";
const router = useRouter();
const props = defineProps({
  items: {
    type: Array,
    required: true
  }
});
function goBack() {
  router.go(-1);
}
</script>
<template>
  <div class="repository">
    <header class="repository__header">
      <div class="repository__back">
        <BackBtn @click="goBack"/>
      </div>
      <h2 class="repository__title">File e documenti </h2>
      <div></div>
    </header>
    <div class="repository__list">
      <RepositoryItem
          v-for="item in items"
          :key="item.id"
          :item="item"
      />
    </div>
  </div>
</template>
<style lang="scss">
.repository {
  padding-top: 6.4rem;
  width: 100%;
  align-self: self-start;
  @media screen and (max-width: 992px) {
    padding-top: 14rem;
    width: calc(100% - 6.4rem);
  }
  &__header {
    margin-bottom: 12rem;
  }
  &__title {
    text-align: center;
  }
  &__back {
    position: absolute;
    top: 4.8rem;
    left: 6.4rem;
  }
  &__list {
    margin: 0 auto;
    width: 78.4rem;
    border-top: 1px solid #D1F4EE;
    @media screen and (max-width: 992px) {
      width: 100%;
    }
  }
}
</style>