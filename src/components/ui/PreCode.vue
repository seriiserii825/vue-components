<script setup>
const props = defineProps({
  className: {
    type: String,
    default: "language-html",
  },
});
</script>
<template>
  <pre><code :class="className"><slot></slot></code></pre>
</template>
<style lang="scss" scoped>

</style>
