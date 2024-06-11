import { ref } from 'vue'
import { defineStore } from 'pinia'
export const useLoadingStore = defineStore('loading', () => {
    const loading_status = ref('');
    const setLoadingStatus = (status) => {
        loading_status.value = status;
    }
    return {
        loading_status,
        setLoadingStatus
    }
})
