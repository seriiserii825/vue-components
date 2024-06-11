import {axiosInstance} from "../axios/axios-instance";
export async function sessionContentApiById(session_id, current_page, preview) {
    const data = await axiosInstance.get(`/session_content/${session_id}?current_page=${current_page}&preview=${preview}`, {
        error_alert: "contentApiById"
    });
    return {data: data};
}
export async function sessionContentPagesApiById(session_id) {
    const data = await axiosInstance.get(`session_content/${session_id}/pages`, {
        error_alert: "sessionContentPagesApiById"
    });
    return {data: data};
}
export async function sessionContentStartTimerApiById(session_content_id, payload) {
    const question_id = await payload.question_id;
    const data = await axiosInstance.post(`session_content/${session_content_id}/question/start_timer`, {
        question: question_id
    }, {
        error_alert: "sessionContentStartTimerApiById"
    });
    return {data: data};
}
export async function sessionContentStart(session_content_id, payload) {
    const preview = await payload.preview;
    await axiosInstance.get(`session_content/${session_content_id}/start?preview=${preview} `, {
        error_alert: "sessionContentStart"
    });
}
export async function sessionContentQuestionRecievedAnswersApiById(session_id, payload) {
    const question_id = await payload.question_id;
    const data = await axiosInstance.post(`session_content/${session_id}/question/received_answers`, {
        question: question_id
    }, {
        error_alert: "sessionContentQuestionRecievedAnswersApiById"
    });
    return {data: data};
}
export async function sessionContentUpdateTimer(session_id, payload) {
    const {question_id, countdown} = await payload;
    const data = await axiosInstance.post(`session_content/${session_id}/question/update_timer `, {
        question: question_id,
        countdown: countdown
    }, {
        error_alert: "sessionContentUpdateTimer"
    });
    return {data: data};
}
export async function sessionContentAnswerQuestionSelectImage(session_content_id, payload) {
    const {question_id, option_id} = await payload;
    const data = await axiosInstance.post(`session_content/${session_content_id}/answer_question/selectimage`, {
        question: question_id,
        option: option_id
    }, {
        error_alert: "sessionContentUpdateTimer"
    });
    return {data: data};
}
export async function sessionContentQuestionAnswerYesNo(session_id, payload) {
    const {question_id} = await payload;
    const data = await axiosInstance.get(`session_content/${session_id}/question/answers/yesno?question=${question_id}`, {
        error_alert: "sessionContentQuestionAnswerYesNo"
    });
    return {data: data};
}
export async function sessionContentShowAnswer(session_id, payload) {
    const {question_id, preview} = await payload;
    const data = await axiosInstance.post(`session_content/${session_id}/question/show_answer `, {
        question: question_id,
        show: preview
    }, {
        error_alert: "sessionContentShowAnswer"
    });
    return {data: data};
}
export async function sessionContentShowAnswerGet(session_id, payload) {
    const {question_id, show} = await payload;
    const data = await axiosInstance.get(`session_content/${session_id}/question/show_answer?question=${question_id}&show=${show}`, {
        error_alert: "sessionContentShowAnswerGet"
    });
    return {data: data};
}
export async function sessionContentAnswersMultipleAnswers(session_id, payload) {
    const {question_id} = await payload;
    const data = await axiosInstance.get(`session_content/${session_id}/question/answers/multipleanswer?question=${question_id}`, {
        error_alert: "sessionContentAnswersMultipleAnswers"
    });
    return {data: data};
}
export async function sessionContentAnswerQuestionMultipleAnswer(session_id, payload) {
    const {question_id, option} = await payload;
    const data = await axiosInstance.post(`session_content/${session_id}/answer_question/multipleanswer`, {
        question: question_id,
        option: option
    }, {
        error_alert: "sessionContentAnswerQuestionMultipleAnswer"
    });
    return {data: data};
}
export async function sessionContentQuestionAnswersSelectImage(session_id, payload) {
    const {question_id} = await payload;
    const data = await axiosInstance.get(`session_content/${session_id}/question/answers/selectimage?question=${question_id}`, {
        error_alert: "sessionContentQuestionAnswersSelectImage"
    });
    return {data: data};
}
export async function sessionContentQuestionRemainigTime(session_id, payload) {
    const {question_id, preview} = await payload;
    const data = await axiosInstance.post(`session_content/${session_id}/question/remaining_time `, {
        question: question_id,
        preview: preview
    }, {
        error_alert: "sessionContentQuestionRemainigTime"
    });
    return {data: data};
}
export async function sessionContentQuestionAnswersDragginganswer(session_id, payload) {
    const {question_id} = await payload;
    const data = await axiosInstance.get(`session_content/${session_id}/question/answers/dragginganswer?question=${question_id}`, {
        error_alert: "sessionContentQuestionAnswersDragginganswer"
    });
    return {data: data};
}
export async function sessionContentCodes(session_id) {
    const data = await axiosInstance.get(`session_content/${session_id}/codes`, {
        error_alert: "sessionContentCodes"
    });
    return {data: data};
}
export async function sessionContentAnswerQuestionYesNo(session_id, payload) {
    const {question_id, answer} = await payload;
    const data = await axiosInstance.post(`session_content/${session_id}/answer_question/yesno`, {
        question: question_id,
        answer: answer
    }, {
        error_alert: "sessionContentAnswerQuestionYesNo"
    });
    return {data: data};
}
export async function sessionContentRegisterPartecipant(session_id) {
    const data = await axiosInstance.post(`session_content/${session_id}/register_participant`, {}, {
        error_alert: "sessionContentRegisterPartecipant"
    });
    return {data: data};
}
export async function sessionContentAnswerQuestionDraggingAnswer(session_content_id, payload) {
    const {question_id, option_id, box_number} = await payload;
    const data = await axiosInstance.post(`session_content/${session_content_id}/answer_question/dragginganswer`, {
        question: question_id,
        option: option_id,
        box: box_number
    }, {
        error_alert: "sessionContentAnswerQuestionDraggingAnswer"
    });
    return {data: data};
}
export async function sessionContentQuestionAnswerSent(session_id, payload) {
    const {question} = await payload;
    const data = await axiosInstance.get(`session_content/${session_id}/question/answers/sent?question=${question}`, {
        error_alert: "sessionContentQuestionAnswerSent"
    });
    return {data: data};
}
export async function sessionContentRepository(session_id) {
    const data = await axiosInstance.get(`session_content/${session_id}/repository`, {
        error_alert: "sessionContentRepository"
    });
    return {data: data};
}
