import { axiosInstance } from "../axios/axios-instance";

export async function surveyApiGetAll(event_id) {
    const data = await axiosInstance.get('/events/' + event_id + '/survey', {
        error_alert: "surveyApiGetAll"
    });
    return { data: data };
}

export async function sessionContentSurveyToFill(event_id) {
    const data = await axiosInstance.get('/events/' + event_id + '/session_content_survey_to_fill', {
        error_alert: "surveyApiSessionContent"
    });
    return { data: data };
}

export async function sessionContentSurvey(session_content_id) {
    const data = await axiosInstance.get(`/session_content/${session_content_id}/survey`, {
        error_alert: "sessionContentSurvey"
    });
    return { data: data };
}

export async function sessionContentSurveyStartApi(session_content_id, payload) {
    const { survey } = await payload;
    const data = await axiosInstance.post(`/session_content/${session_content_id}/survey/start`,
        { survey: survey },
        { error_alert: "surveyStartApi" });
    return { data: data };
}

export async function sessionContentSurveyList(session_content_id, payload) {
    const { survey } = await payload;
    const data = await axiosInstance.get(`/session_content/${session_content_id}/survey_answer/list?survey=${survey}`, {
        error_alert: "sessionContentSurveyList"
    });
    return { data: data };
}

export async function sessionContentIsSurveyAvailable(session_content_id) {
    const data = await axiosInstance.get(`/session_content/${session_content_id}/is_survey_available`, {
        error_alert: "sessionContentIsSurveyAvailable"
    });
    return { data: data };
}


export async function eventSurveyAnswer(event_id, payload) {
    const { question, answer } = await payload;
    const data = await axiosInstance.post(`/events/${event_id}/survey_answer`,
        { question: question, answer: answer },
        { error_alert: "eventSurveyAnswer" });
    return { data: data };
}

export async function sessionContentSurveyAnswer(session_content_id, payload) {
    const { question, answer } = await payload;
    const data = await axiosInstance.post(`/session_content/${session_content_id}/survey_answer`,
        { question: question, answer: answer },
        { error_alert: "sessionContentSurveyAnswer" });
    return { data: data };
}