<script setup>
import {onMounted} from "vue";
import {useRouter} from "vue-router";
const router = useRouter();

onMounted(() => {
  setTimeout(() => {
    router.push({name: 'home'});
  }, 1000);
});
</script>
<template>
<div class='e-404'>
  <h3>Not found...</h3>
</div>
</template>
<style lang="scss" scoped>
.e-404 {
  h3 {
    font-size: 5rem;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    color: white;
  }
}
</style>