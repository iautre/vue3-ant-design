import {
    createRouter,
    createWebHashHistory,
    createWebHistory,
} from 'vue-router'

// 创建路由
const router = createRouter({
    // 创建路由模式 history模式--createWebHashHistory 哈希模式--createWebHistory
    history: createWebHistory(),
    // 配置路由规则
    routes: [
        { path: '/', component: () => import('../views/Home.vue') },
        { path: '/login.html', component: () => import('../views/Login.vue') },
        { path: '/page/:page', component: () => import('../views/Home.vue') },
        { path: '/:id.html', component: () => import('../views/Post.vue') },
        { path: '/:slug', component: () => import('../views/Page.vue') },
    ],
    scrollBehavior(to, from, savedPosition) {
        // always scroll to top
        return { top: 0 }
    },
})

// 导出路由
export default router
