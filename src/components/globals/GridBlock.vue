<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  checked: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <div class="grid-block">
    <div
      v-for="item in items"
      :key="item.id"
      class="grid-block__item"
      :class="{
        'grid-block__item--active': item[checked],
      }"
    >
      <span>{{ item[title] }}</span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.grid-block {
  display: flex;
  flex-wrap: wrap;
  margin: 0 - 0.8rem;
  &__item {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 0 0.8rem 1.6rem;
    padding: 1.6rem;
    flex: 0 0 calc(50% - 1.6rem);
    font-size: 16px;
    font-weight: 600;
    color: #464f69;
    border: 2px solid #d1f4ee;
    border-radius: 16px;
    &--active {
      color: var(--accent);
      border-color: var(--accent);
    }
  }
}
</style>