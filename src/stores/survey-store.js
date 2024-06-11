import { ref } from 'vue'
import { defineStore } from 'pinia'
import { eventSurveyAnswer, sessionContentIsSurveyAvailable, sessionContentSurvey, sessionContentSurveyAnswer, sessionContentSurveyList, sessionContentSurveyStartApi, sessionContentSurveyToFill, surveyApiGetAll } from "../api/survey-api";

export const useSurveyStore = defineStore('survey', () => {
    const survey = ref({});
    const is_survey_empty = ref(true);
    const session_content_survey_to_fill = ref(null);
    const store_session_content_survey = ref(null);
    const store_session_content_survey_list = ref(null);
    const store_session_content_is_survey_available = ref(null);
    const storeSurveyGetAll = async (id) => {
        const data = await surveyApiGetAll(id);
        survey.value = data.data.data.data.survey;
    }
    const storeSessionContentSurveyToFill = async (id) => {
        const data = await sessionContentSurveyToFill(id);
        session_content_survey_to_fill.value = data.data.data.data;
    }
    const storeSessionContentSurvey = async (session_content_id) => {
        const data = await sessionContentSurvey(session_content_id);
        store_session_content_survey.value = data.data.data.data.survey;
    }

    const storeSessionContentSurveyStart = async (session_content_id, payload) => {
        await sessionContentSurveyStartApi(session_content_id, payload);
    }

    const storeSessionContentSurveyList = async (session_content_id, payload) => {
        const data = await sessionContentSurveyList(session_content_id, payload);
        store_session_content_survey_list.value = data.data.data.data.survey_questions;
    }

    const storeSessionContentIsSurveyAvailable = async (session_content_id) => {
        const data = await sessionContentIsSurveyAvailable(session_content_id);
        store_session_content_is_survey_available.value = data.data.data.data.session_content;
    }

    const storeSessionContentSurveyAnswer = async (session_content_id, payload) => {
        await sessionContentSurveyAnswer(session_content_id, payload);
    }

    const storeEventSurveyAnswer = async (event_id, payload) => {
        await eventSurveyAnswer(event_id, payload);
    }

    const setSurveyEmpty = (value) => {
        is_survey_empty.value = value;
    }

    return {
        survey,
        storeSurveyGetAll,
        session_content_survey_to_fill,
        storeSessionContentSurveyToFill,
        store_session_content_survey,
        storeSessionContentSurvey,
        storeSessionContentSurveyStart,
        storeSessionContentSurveyList,
        store_session_content_survey_list,
        store_session_content_is_survey_available,
        storeSessionContentIsSurveyAvailable,
        storeSessionContentSurveyAnswer,
        storeEventSurveyAnswer,
        is_survey_empty,
        setSurveyEmpty
    }
})
