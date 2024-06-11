import {ref} from 'vue'
import {defineStore} from 'pinia'
import {
    sessionContentAnswerQuestionMultipleAnswer,
    sessionContentAnswerQuestionYesNo,
    sessionContentAnswersMultipleAnswers,
    sessionContentApiById, sessionContentCodes,
    sessionContentPagesApiById, sessionContentQuestionAnswersDragginganswer,
    sessionContentQuestionAnswersSelectImage,
    sessionContentQuestionAnswerYesNo,
    sessionContentQuestionRecievedAnswersApiById,
    sessionContentQuestionRemainigTime,
    sessionContentShowAnswer,
    sessionContentShowAnswerGet,
    sessionContentStart,
    sessionContentStartTimerApiById,
    sessionContentUpdateTimer,
    sessionContentAnswerQuestionSelectImage,
    sessionContentRegisterPartecipant,
    sessionContentAnswerQuestionDraggingAnswer,
    sessionContentQuestionAnswerSent, sessionContentRepository
} from "../api/content-api";
export const useSessionContentStore = defineStore('session_content', () => {
    const session_content = ref({});
    const session_content_pages = ref([]);
    const session_content_codes = ref([]);
    const session_content_question_received_answers = ref(null);
    const session_content_question_answer_yes_no = ref(null);
    const session_content_answers_multiple_answers = ref(null);
    const session_content_question_answers_select_image = ref(null);
    const session_content_update_timer = ref(null);
    const session_content_question_remaining_time = ref(null);
    const session_content_question_answer_dragging_answer = ref(null);
    const session_content_answer_question_yes_no = ref(null);
    const session_content_question_show_answer_get = ref(null);
    const session_content_answer_question_multipleanswer = ref(null);
    const session_content_answer_question_dragging_answer = ref(null);
    const session_content_question_answer_sent = ref(false);
    const session_content_repository = ref(false);
    const storeSessionContent = async (session_content_id, current_page, preview) => {
        const data = await sessionContentApiById(session_content_id, current_page, preview);
        session_content.value = data.data.data.data.session_content;
    }
    const storeSessionContentPages = async (session_content_id) => {
        const data = await sessionContentPagesApiById(session_content_id);
        session_content_pages.value = data.data.data;
    }
    const storeSessionContentStartTimer = async (session_content_id, payload) => {
        await sessionContentStartTimerApiById(session_content_id, payload);
    };
    const storeSessionContentStart = async (session_content_id, payload) => {
        await sessionContentStart(session_content_id, payload);
    };
    const storeSessionContentQuestionReceivedAnswers = async (session_content_id, payload) => {
        const data = await sessionContentQuestionRecievedAnswersApiById(session_content_id, payload);
        session_content_question_received_answers.value = data.data.data.data.number_of_answer;
    };
    const storeSessionContentUpdateTimer = async (session_content_id, payload) => {
        const data = await sessionContentUpdateTimer(session_content_id, payload);
        session_content_update_timer.value = data.data.data;
    };
    const storeSessionContentQuestionAnswerYesNo = async (session_content_id, payload) => {
        const data = await sessionContentQuestionAnswerYesNo(session_content_id, payload);
        session_content_question_answer_yes_no.value = data.data.data.data;
        // console.log(session_content_question_answer_yes_no.value, 'session_content_question_answer_yes_no.value');
    };
    const storeSessionContentShowAnswer = async (session_content_id, payload) => {
        await sessionContentShowAnswer(session_content_id, payload);
    };
    const storeSessionContentShowAnswerGet = async (session_content_id, payload) => {
        const data = await sessionContentShowAnswerGet(session_content_id, payload);
        session_content_question_show_answer_get.value = data.data.data.data.show;
    };
    const storeSessionContentAnswersMultipleAnswers = async (session_content_id, payload) => {
        const data = await sessionContentAnswersMultipleAnswers(session_content_id, payload);
        session_content_answers_multiple_answers.value = data.data.data.data;
    };
    const storeSessionContentQuestionAnswersSelectImage = async (session_content_id, payload) => {
        const data = await sessionContentQuestionAnswersSelectImage(session_content_id, payload);
        session_content_question_answers_select_image.value = data.data.data.data.answers_stat;
    };
    const storeSessionContentQuestionRemainingTime = async (session_content_id, payload) => {
        const data = await sessionContentQuestionRemainigTime(session_content_id, payload);
        session_content_question_remaining_time.value = data.data.data.data;
    };
    const storeSessionContentQuestionAnswerDraggingAnswer = async (session_content_id, payload) => {
        const data = await sessionContentQuestionAnswersDragginganswer(session_content_id, payload);
        session_content_question_answer_dragging_answer.value = data.data.data.data;
    };
    const storeSessionContentCodes = async (session_content_id) => {
        const data = await sessionContentCodes(session_content_id);
        session_content_codes.value = data.data.data.data;
    };
    const storeSessionContentAnswerQuestionYesNo = async (session_content_id, payload) => {
        const data = await sessionContentAnswerQuestionYesNo(session_content_id, payload);
        session_content_answer_question_yes_no.value = data.data.data;
    };
    const storeSessionContentAnswerQuestionMultipleAnswer = async (session_content_id, payload) => {
        const data = await sessionContentAnswerQuestionMultipleAnswer(session_content_id, payload);
        session_content_answer_question_multipleanswer.value = data.data.data.status;
    };
    const storeSessionContentAnswerQuestionSelectImage = async (session_content_id, payload) => {
        await sessionContentAnswerQuestionSelectImage(session_content_id, payload);
    };
    const storeSessionContentRegisterPartecipant = async (session_content_id) => {
        await sessionContentRegisterPartecipant(session_content_id);
    };
    const storeSessionContentAnswerQuestionDraggingAnswer = async (session_content_id, payload) => {
        await sessionContentAnswerQuestionDraggingAnswer(session_content_id, payload);
    };
    const storeSessionContentQuestionAnswerSent = async (session_content_id, payload) => {
        const data = await sessionContentQuestionAnswerSent(session_content_id, payload);
        session_content_question_answer_sent.value = data.data.data.data.answer_sent;
    };
    const storeHideAnswerGet = () => {
        session_content_question_show_answer_get.value = false;
    }
    const storeSessionContentRepository = async (session_content_id) => {
        const data = await sessionContentRepository(session_content_id);
        console.log(data, 'data')
        session_content_repository.value = data.data.data.data.repository;
    };
    return {
        session_content,
        storeSessionContent,
        session_content_pages,
        storeSessionContentPages,
        storeSessionContentStartTimer,
        session_content_question_received_answers,
        storeSessionContentQuestionReceivedAnswers,
        session_content_update_timer,
        storeSessionContentUpdateTimer,
        storeSessionContentShowAnswer,
        session_content_question_answer_yes_no,
        storeSessionContentQuestionAnswerYesNo,
        session_content_answers_multiple_answers,
        storeSessionContentAnswersMultipleAnswers,
        session_content_question_answers_select_image,
        storeSessionContentQuestionAnswersSelectImage,
        storeSessionContentStart,
        session_content_question_remaining_time,
        storeSessionContentQuestionRemainingTime,
        storeSessionContentQuestionAnswerDraggingAnswer,
        session_content_question_answer_dragging_answer,
        session_content_codes,
        storeSessionContentCodes,
        storeSessionContentAnswerQuestionYesNo,
        session_content_answer_question_yes_no,
        session_content_question_show_answer_get,
        storeHideAnswerGet,
        storeSessionContentShowAnswerGet,
        session_content_answer_question_multipleanswer,
        storeSessionContentAnswerQuestionMultipleAnswer,
        storeSessionContentAnswerQuestionSelectImage,
        storeSessionContentRegisterPartecipant,
        session_content_answer_question_dragging_answer,
        storeSessionContentAnswerQuestionDraggingAnswer,
        session_content_question_answer_sent,
        storeSessionContentQuestionAnswerSent,
        storeSessionContentRepository,
        session_content_repository
    }
})
