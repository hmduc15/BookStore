import { createRouter, createWebHistory } from 'vue-router';

import { AuthRoutes, DefaultRoutes, ErrorRoutes } from './default-routes';
import DefaultLayout from "../layouts/DefaultLayout.vue"
import BlankLayout from '@/layouts/BlankLayout.vue';
import { moduleUser } from '@/store/pinia/module/moduleUser';
import commonFuntion from '@/common/commonFuntion';
import { moduleContext } from '@/store/pinia/store';
import role from '@/common/enum/role';
import { getCurrentInstance } from 'vue';

const routes = [
    {
        path: '/',
        name: 'dashboard',
        component: DefaultLayout,
        meta: {},
        children: DefaultRoutes('dashboard'),
    },
    {
        path: '/auth',
        name: 'auth',
        component: BlankLayout,
        meta: {},
        children: AuthRoutes('auth'),
    },
    {
        path: '/error',
        name: 'error',
        component: BlankLayout,
        meta: {},
        children: ErrorRoutes('error'),
    },
    {
        // Redirect to 404 page, if no match found
        path: '/:pathMatch(.*)*',
        component: () => import(/*webpackChunkName:'pages'*/ '@/views/extra-pages/errors/Error404.vue'),
        meta: {
            anonymous: true,
        },
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    linkActiveClass: '',
    linkExactActiveClass: 'active'
});
router.afterEach(() => {
    setTimeout(() => {
        commonFuntion.unmask();
    }, 300);
})

router.beforeEach((to, from, next) => {

    commonFuntion.mask();
    const auth = moduleUser();
    const isAuthenticated = auth.isAuthenticated();


    const isAdmin = moduleContext().getContext.isAdmin;
    let roleRouter = to.meta.role;

    if (!isAdmin && roleRouter && roleRouter.includes(role.Admin)) {
        // this.$toast.error("Bạn không có quyền truy cập!");
        setTimeout(() => {
            router.go(-1); // Navigate back to the previous route after 1 second
        }, 100);
        commonFuntion.unmask();
        return;
    }

    document.title = to.meta?.name;

    if (to.meta.requiresAuth && !isAuthenticated) {
        next({ path: "/auth/sign-in", query: { redirect: to.fullPath } }); // Redirect to login page if the route requires authentication but the user is not authenticated
    } else {
        next(); // Proceed to the next route
    }

    window.scrollTo(0, 0)

    // moi lan redirect thi luu lai path, de lan sau vao den dung trang khi tat
    if (to.path && !(to.path == "/auth/sign-in" || to.path == "/auth/sign-up")) {
        // localStorage.setItem('bookstore_current_path', to.pathlogout);
    }

})



export default router;