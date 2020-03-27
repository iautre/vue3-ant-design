import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Post from './views/Post.vue'
import Page from './views/Page.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/page/:page',
      name: 'pagination',
      component: Home
    },
    //{
    //  path: '/about',
    //  name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
     // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    //},
    {
      path: '/login.html',
      name: 'login',
      component: Login
    },
    {
      path: '/:post_id.html',
      name: 'post',
      component: Post
    },
    {
      path: '/:page_id',
      name: 'page',
      component: Page
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
