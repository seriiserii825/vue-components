import {createRouter, createWebHistory} from 'vue-router';
import {loadLayoutMiddleware} from './middleware/loadLayout.middelware';
import {AppLayoutsEnum} from '../layouts/types';
import {ui_routes} from "./ui-routes";
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        ...ui_routes,
        {
            path: '/:any(.*)',
            component: () => import('../views/E404.vue'),
            meta: {
                layout: AppLayoutsEnum.error,
            },
        },
    ],
});
router.beforeEach(loadLayoutMiddleware);
export default router;
