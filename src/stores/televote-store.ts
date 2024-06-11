import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
    televoteAnswerstApi,
    televoteIdtApi,
    televoteListApi,
    televoteNewApi,
    televoteOptionAnswer,
    televoteStartApi
} from "../api/televote-api";
import {I_TelevoteStore} from "../interfaces/I_TelevoteStore";
export const useTelevoteStore = defineStore('televote', () => {
    const televote_new_store = ref({});
    const televote_store = ref<I_TelevoteStore>();
    const televote_answers = ref({});
    const televote_list = ref(null);
    const storeTelevoteNewRepository = async (session_content_id, data_obj) => {
        const data = await televoteNewApi(session_content_id, data_obj);
        televote_new_store.value = data.data.data.data;
    }
    const storeTelevoteStart = async (session_content_id, televote_id) => {
        await televoteStartApi(session_content_id, televote_id);
    }
    const storeTelevoteId = async (session_content_id, televote_id) => {
        const data = await televoteIdtApi(session_content_id, televote_id);
        televote_store.value = data.data.data.data.televote;
    }
    const storeTelevoteAnswers = async (session_content_id, televote_id) => {
        const data = await televoteAnswerstApi(session_content_id, televote_id);
        televote_answers.value = data.data.data.data.televote;
    }
    const storeTelevoteList = async (session_content_id) => {
        const data = await televoteListApi(session_content_id);
        televote_list.value = data.data.data.data.televotes;
    }
    const storeTelevoteOptionAnswer = async (session_content_id, payload) => {
        await televoteOptionAnswer(session_content_id, payload);
    }
    return {
        televote_new_store,
        storeTelevoteNewRepository,
        storeTelevoteStart,
        televote_store,
        storeTelevoteId,
        televote_answers,
        storeTelevoteAnswers,
        televote_list,
        storeTelevoteList,
        storeTelevoteOptionAnswer
    }
})
