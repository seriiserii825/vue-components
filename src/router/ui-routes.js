import {AppLayoutsEnum} from "../layouts/types";
export const ui_routes = [
    {
        path: '/',
        name: 'ui',
        component: () => import('../views/ui/AdminView.vue'),
        meta: {
            layout: AppLayoutsEnum.admin,
        },
    },
    {
        path: '/buttons',
        name: 'button',
        component: () => import('../views/ui/ButtonsView.vue'),
        meta: {
            layout: AppLayoutsEnum.admin,
        },
    },
    {
        path: '/forms',
        name: 'forms',
        component: () => import('../views/ui/FormsView.vue'),
        meta: {
            layout: AppLayoutsEnum.admin,
        },
    },
    {
        path: '/checkbox',
        name: 'checkbox',
        component: () => import('../views/ui/CheckboxView.vue'),
        meta: {
            layout: AppLayoutsEnum.admin,
        },
    },
    {
        path: '/radio',
        name: 'radio',
        component: () => import('../views/ui/RadioView.vue'),
        meta: {
            layout: AppLayoutsEnum.admin,
        },
    },
    {
        path: '/select',
        name: 'select',
        component: () => import('../views/ui/SelectView.vue'),
        meta: {
            layout: AppLayoutsEnum.admin,
        },
    },
    {
        path: '/input',
        name: 'input',
        component: () => import('../views/ui/InputView.vue'),
        meta: {
            layout: AppLayoutsEnum.admin,
        },
    },
    {
        path: '/icons',
        name: 'icons',
        component: () => import('../views/IconsView.vue'),
        meta: {
            layout: AppLayoutsEnum.admin,
        },
    },
]
