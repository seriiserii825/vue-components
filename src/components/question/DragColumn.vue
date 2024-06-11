<script setup>
import RangeBar from "../rangers/RangeBar.vue";
import LightBox from "./LightBox.vue";
const props = defineProps({
  item: {
    type: Object,
    required: true
  },
});
</script>
<template>
  <div class='drag-column'>
    <div class="drag-column__title">{{ item.dragging_box_title }}</div>
    <div class="drag-column__content">
      <div
          v-for="(item, index) in item.answers_stat"
          :key="index"
          class="drag-column__item"
      >
        <LightBox>
          <RangeBar
              :success="item.is_right"
              :percentage="item.percentage"
              :filled="true"
              label="Risposte ricevute"
              :title="item.option_text"
              :value="item.received"
          />
        </LightBox>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.drag-column {
  padding: 3.2rem;
  height: 79rem;
  border: 1px solid #eee;
  border-radius: 1.6rem;
  overflow-y: scroll;
  &__title {
    margin-bottom: 3.2rem;
    font-size: 3.2rem;
    font-weight: 600;
  }
  &__item {
    margin-bottom: 3.2rem;
  }
}
</style>