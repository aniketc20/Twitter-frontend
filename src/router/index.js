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
      path: '/:id/',
      name: 'user-profile',
      component: () => import('/src/views/UserProfile.vue')
    },
    {
      path: '/:id/followers/',
      name: 'followers',
      component: () => import('/src/views/UserFollowers.vue')
    },
    {
      path: '/:id/following/',
      name: 'following',
      component: () => import('/src/views/UserFollowing.vue')
    }
  ]
})

export default router