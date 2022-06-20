import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('/src/views/Login.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('/src/views/Home.vue')
    },
    {
        path: '/posts',
        name: 'posts',
        component: () => import('/src/views/PostView.vue')
    },
    {
        path: '/postDetail/:id',
        name: 'postDetail',
        component: () => import('/src/views/postDetail.vue')
    }
  ]
})

export default router