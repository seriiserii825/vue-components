<script setup>
import {app_url} from "../../data/app-config";
import {onMounted} from "vue";
import {ref} from "@vue/reactivity";
import axios from "axios";

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})
const file_path = ref(null);

function downloadFile() {
  const download_file_array = file_path.value.split('/');
  const file_name = download_file_array[download_file_array.length - 1];
  axios({
    url: file_path.value,
    method: 'GET',
    responseType: 'blob',
  }).then((response) => {
    let fileURL = window.URL.createObjectURL(new Blob([response.data]));
    let fURL = document.createElement('a');

    fURL.href = fileURL;
    fURL.setAttribute('download', file_name);
    document.body.appendChild(fURL);

    fURL.click();
  });
}

onMounted(() => {
  file_path.value = props.item.filepath;
});

</script>
<template>
  <div class='repository-item'>
    <h3 class="repository-item__title">{{ item.title }}</h3>
    <a :href="file_path" target="_blank" class="repository-item__view">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 7C6 7 2 16 2 16C2 16 6 25 16 25C26 25 30 16 30 16C30 16 26 7 16 7Z" stroke="#464F69"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path
            d="M16 21C18.7614 21 21 18.7614 21 16C21 13.2386 18.7614 11 16 11C13.2386 11 11 13.2386 11 16C11 18.7614 13.2386 21 16 21Z"
            stroke="#464F69" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </a>
    <a :href="file_path" @click.prevent="downloadFile" :download="file_path"
       class="repository-item__download">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.75 13.75L16 19L21.25 13.75" stroke="#464F69" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round"/>
        <path d="M16 5V19" stroke="#464F69" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round"/>
        <path
            d="M27 19V26C27 26.2652 26.8946 26.5196 26.7071 26.7071C26.5196 26.8946 26.2652 27 26 27H6C5.73478 27 5.48043 26.8946 5.29289 26.7071C5.10536 26.5196 5 26.2652 5 26V19"
            stroke="#464F69" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </a>
  </div>
</template>
<style lang="scss" scoped>
.repository-item {
  display: flex;
  align-items: center;
  padding: 5.2rem 0;
  width: 100%;
  border-bottom: 1px solid #D1F4EE;
  &__title {
    margin-right: auto;
  }
  &__view {
    margin-right: 7rem;
  }
}
</style>