import { ref } from 'vue'
import { defineStore } from 'pinia'
import { eventApiFromId, eventApiLogin, eventApiRepository, eventApiSlugToId } from "../api/event-api";
export const useEventStore = defineStore('events', () => {
    const event = ref({});
    const event_login = ref({});
    const event_repository = ref({});
    const is_teacher_popup_visible = ref(false);
    const storeEventsSlugToEvent = async (slug) => {
        const data = await eventApiSlugToId(slug);
        const id = data.data.data.data.id;
        const data_from_slug = await eventApiFromId(id);
        event.value = data_from_slug.data.data.data.event;
    }
    const storeEventsId = async (id) => {
        const data_from_slug = await eventApiFromId(id);
        event.value = data_from_slug.data.data.data.event;
    }
    const storeEventsLogin = async (event_id, data_obj) => {
        const data = await eventApiLogin(event_id, data_obj);
        event_login.value = data.data.data;
    }
    const storeEventsRepository = async (event_id) => {
        const data = await eventApiRepository(event_id);
        event_repository.value = data.data.data.data.repository;
    }
    const storeEventsShowTeacherPopup = () => {
        is_teacher_popup_visible.value = true;
    }
    const storeEventsHideTeacherPopup = () => {
        is_teacher_popup_visible.value = false;
    }
    return {
        event,
        storeEventsSlugToEvent,
        storeEventsId,
        event_login,
        storeEventsLogin,
        event_repository,
        storeEventsRepository,
        is_teacher_popup_visible,
        storeEventsShowTeacherPopup,
        storeEventsHideTeacherPopup
    }
})
