import {ref} from 'vue'
import {defineStore} from 'pinia'
export const usePopupStore = defineStore('popup', () => {
    const mini_popup = ref(false);
    const mini_popup_title = ref('');
    const image_popup = ref("");
    const showMiniPopup = (title) => {
        mini_popup.value = true;
        mini_popup_title.value = title;
    }
    const hideMiniPopup = () => {
        mini_popup.value = false;
        mini_popup_title.value = '';
    }
    const showImagePopup = (image) => {
        image_popup.value = image;
    };
    return {
        mini_popup,
        mini_popup_title,
        showMiniPopup,
        hideMiniPopup,
        image_popup,
        showImagePopup
    }
})
