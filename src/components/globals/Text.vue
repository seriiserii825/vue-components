<script setup>
const props = defineProps({
  text: {
    type: String,
    required: false
  },
});
</script>
<template>
  <div class='text' v-html="text"></div>
</template>
<style lang="scss">
.text {
  h3 {
    margin-bottom: 3rem;
    font-size: 3.2rem;
    font-weight: 600;
  }
  p {
    margin-bottom: 3rem;
  }
  ul {
    list-style-type: disc;
    li {
      margin-bottom: 1.6rem;
      margin-left: 2rem;
      padding-left: 0.6rem;
    }
  }
}
</style>