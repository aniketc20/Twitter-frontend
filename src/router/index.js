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
      path: '/user-profile/',
      name: 'user-profile',
      component: () => import('/src/views/UserProfile.vue')
    },
    {
      path: '/clicked-user-profile/',
      name: 'clicked-user-profile',
      component: () => import('/src/views/SearchedUserProfile.vue')
    }
  ]
})

export default router