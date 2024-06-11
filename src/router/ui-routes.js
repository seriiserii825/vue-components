import {AppLayoutsEnum} from "../layouts/types";
export const ui_routes = [
    {
        path: '/ui',
        name: 'ui',
        component: () => import('../views/ui/AdminView.vue'),
        meta: {
            layout: AppLayoutsEnum.admin,
        },
    },
    {
        path: '/ui/buttons',
        name: 'button',
        component: () => import('../views/ui/ButtonsView.vue'),
        meta: {
            layout: AppLayoutsEnum.admin,
        },
    },
    {
        path: '/ui/forms',
        name: 'forms',
        component: () => import('../views/ui/FormsView.vue'),
        meta: {
            layout: AppLayoutsEnum.admin,
        },
    },
    {
        path: '/ui/checkbox',
        name: 'checkbox',
        component: () => import('../views/ui/CheckboxView.vue'),
        meta: {
            layout: AppLayoutsEnum.admin,
        },
    },
    {
        path: '/ui/radio',
        name: 'radio',
        component: () => import('../views/ui/RadioView.vue'),
        meta: {
            layout: AppLayoutsEnum.admin,
        },
    },
    {
        path: '/ui/select',
        name: 'select',
        component: () => import('../views/ui/SelectView.vue'),
        meta: {
            layout: AppLayoutsEnum.admin,
        },
    },
    {
        path: '/ui/input',
        name: 'input',
        component: () => import('../views/ui/InputView.vue'),
        meta: {
            layout: AppLayoutsEnum.admin,
        },
    },
    {
        path: '/ui/icons',
        name: 'icons',
        component: () => import('../views/IconsView.vue'),
        meta: {
            layout: AppLayoutsEnum.admin,
        },
    },
]