import {axiosInstance} from "../axios/axios-instance";
export async function eventApiSlugToId(slug) {
    const data = await axiosInstance.get('/events/slug_to_id?slug=' + slug, {
        error_alert: "eventApiSlugToId"
    });
    return {data: data};
}
export async function eventApiFromId(id) {
    const data = await axiosInstance.get('/events/' + id, {
        error_alert: "eventApiFromId"
    });
    return {data: data};
}
export async function eventApiLogin(event_id, data_obj) {
    const {code, agent} = data_obj;
    const agent_url = agent ? '?agent=' + agent : '';
    const data = await axiosInstance.post('/events/' + event_id + '/login' + agent_url, {
        code: code
    }, {
        error_alert: "eventApiLogin"
    });
    return {data: data};
}
export async function eventApiRepository(event_id) {
    const data = await axiosInstance.get('/events/' + event_id + '/repository', {
        error_alert: "eventApiRepository"
    });
    return {data: data};
}
