export const event_routes = [
    {
        path: '/evento/:slug',
        name: 'event_slug_to_id',
        component: () => import('../views/events/EventoSlugView.vue'),
    },
    {
        path: '/evento/:slug/dettaglio',
        name: 'evento_detaglio',
        component: () => import('../views/events/EventDetails.vue'),
    },
    {
        path: '/evento/:slug/survey',
        name: 'evento-survey',
        component: () => import('../views/events/EventSurveyView.vue'),
    },
    {
        path: '/evento/:slug/repository',
        name: 'evento-repository',
        component: () => import('../views/repository/RepositoryView.vue'),
    },
    {
        path: '/evento/:slug/dettaglio/info',
        name: 'evento-info',
        component: () => import('../views/events/EventInfoView.vue'),
    },
    {
        path: '/event/:slug/contenuto/:session_content_id/info',
        name: 'contenuto-id-info',
        component: () => import('../views/session/TeacherSesssionInfoView.vue'),
    },
    {
        path: '/event/:slug/contenuto/:session_content_id/discenti/info',
        name: 'contenuto-id-discenti-info',
        component: () => import('../views/session/StudentSesssionInfoView.vue'),
    },
]