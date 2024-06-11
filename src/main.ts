import {createApp} from 'vue';
import {createPinia} from 'pinia';

import App from './App.vue';
import router from './router';

import './assets/scss/my.scss';

import vClickOutside from "click-outside-vue3"

/* import the fontawesome core */
import {library} from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

/* import specific icons */
import {
    faCartShopping,
    faCircleXmark,
    faEnvelope,
    faHouse,
    faMagnifyingGlassPlus,
    faPenToSquare,
    faTrashCan,
    faUser,
    faUserSecret,
    faAngleUp,
    faAngleDown,
    faGlobe
} from '@fortawesome/free-solid-svg-icons';
import {addErrorHandler} from "./axios/axios-instance";
import {useAlertStore} from "./stores/alert-store";

library.add(
    faUserSecret,
    faMagnifyingGlassPlus,
    faHouse,
    faUser,
    faEnvelope,
    faCircleXmark,
    faPenToSquare,
    faTrashCan,
    faCartShopping,
    faAngleUp,
    faAngleDown,
    faGlobe
);

const app = createApp(App);


app.use(createPinia());
app.use(vClickOutside);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router);
app.mount('#app');

const alertStore = useAlertStore()

addErrorHandler((error) => {
    const config = error.response.config;
    console.log(config, 'config')
    if ('error_alert' in config) {
        console.log(config.error_alert, 'config.error_alert')
        console.log(error.response.data, 'error.response.data')
        // alertStore.storeAlertSet({
        //     type: "error",
        //     text: "Server error: " + config.error_alert
        // });
        // return false;
    }
    return Promise.reject(error);
});
