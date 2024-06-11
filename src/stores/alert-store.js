import {defineStore} from "pinia";
import {ref} from "@vue/reactivity";

export const useAlertStore = defineStore('alert', () => {
    const messages = ref([]);
    const unique_id = ref(0);
    const storeAlertSet = async (item) => {
        unique_id.value += unique_id.value;
        item.id = unique_id.value;
        messages.value.push(item);
        setTimeout(() => {
            removeAlert(item.id);
        }, 5000);
    }
    const removeAlert = (id) => {
        messages.value = messages.value.filter(item => item.id !== id);
    }
    return {messages, storeAlertSet};

})
