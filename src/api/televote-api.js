import { axiosInstance } from "../axios/axios-instance";
export async function televoteNewApi(session_content_id, data_obj) {
    const data = await axiosInstance.post(`session_content/${session_content_id}/televote/add `, data_obj, {
        error_alert: "televoteNewApi"
    });
    return { data: data };
}
export async function televoteStartApi(session_content_id, televote_id) {
    await axiosInstance.post(`session_content/${session_content_id}/televote/${televote_id}/start `, {}, {
        error_alert: "televoteStartApi"
    });
}
export async function televoteIdtApi(session_content_id, televote_id) {
    const data = await axiosInstance.get(`session_content/${session_content_id}/televote/${televote_id}`, {
        error_alert: "televoteIdtApi"
    });
    return { data: data };
}

export async function televoteAnswerstApi(session_content_id, televote_id) {
    const data = await axiosInstance.get(`session_content/${session_content_id}/televote/${televote_id}/answers`, {
        error_alert: "televoteAnswerstApi"
    });
    return { data: data };
}
export async function televoteListApi(session_content_id) {
    const data = await axiosInstance.get(`session_content/${session_content_id}/televote/list`, {
        error_alert: "televoteListApi"
    });
    return { data: data };
}

export async function televoteOptionAnswer(session_content_id, payload) {
    const { televote_option_id, televote_id } = payload;
    const data = await axiosInstance.post(`session_content/${session_content_id}/televote/${televote_id}/option/answer`, {
        televote_option_id: televote_option_id
    }, {
        error_alert: "televoteOptionAnswer"
    });
    return { data: data };
}