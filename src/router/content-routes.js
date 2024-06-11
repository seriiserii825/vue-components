import {AppLayoutsEnum} from "../layouts/types";
export const content_routes = [
    {
        path: '/contenuto/:id/repository',
        name: 'session-repository',
        component: () => import('../views/repository/SessionRepositoryView.vue'),
    },
    {
        path: '/contenuto/:id/survey',
        name: 'contenuto-id-survey',
        component: () => import('../views/survey/SurveyStudentView.vue'),
    },
    {
        path: '/contenuto/:id',
        name: 'contenuto-id',
        component: () => import('../views/ContenutoView.vue'),
    },
    {
        path: '/contenuto/:id/discenti',
        name: 'contenuto-id-discenti',
        component: () => import('../views/StudentView.vue'),
    },
    {
        path: '/contenuto/:id/televoto/risultati',
        name: 'televote-results-id',
        component: () => import('../views/televote/TelevoteList.vue'),
        meta: {
            layout: AppLayoutsEnum.televote,
        },
    },
    {
        path: '/contenuto/:id/televoto/nuovo',
        name: 'televote-new-id',
        component: () => import('../views/televote/TelevoteNew.vue'),
    },
    {
        path: '/contenuto/:session_content_id/televoto/:televote_id/risposte',
        name: 'televote-risposte',
        component: () => import('../views/televote/TelevoteAnswer.vue'),
        meta: {
            layout: AppLayoutsEnum.televote,
        },
    },
    {
        path: '/contenuto/:session_content_id/televoto/:televote_id/risposte/dettaglio',
        name: 'televote-risposte-dettaglio',
        component: () => import('../views/televote/TelevoteAnswerDetail.vue'),
        meta: {
            layout: AppLayoutsEnum.televote,
        },
    },
    {
        path: '/contenuto/:session_content_id/televoto/:televote_id',
        name: 'televote-student',
        component: () => import('../views/televote/TelevoteStudent.vue'),
        meta: {
            layout: AppLayoutsEnum.televote,
        },
    },
]