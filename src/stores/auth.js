import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    clicked_user: null,
    clicked_user_img: null
  }),
  getters: {
    isAuthenticated() {
      return !!this.user;
    }
  },
  actions: {
    setClickedUser(userEmail, userImg) {
      this.clicked_user = userEmail
      this.clicked_user_img = userImg
    },
  }
})