<script setup>
import Home from '../assets/home/home.vue';
import { ref } from "vue"
import axios from "axios"
import router from '../router';
import { useAuthStore } from '../stores/auth';

const user_img = localStorage.getItem("pic")
const user_email = localStorage.getItem("email")
const authStore = useAuthStore()

var users = ref([])

axios
    .get(`http://localhost:8000/v1/followusers/`+user_email)
    .then((result) => {
        for (let i = 0; i < result.data.length; i++) {
            users.value.push(result.data[i]);
        } 
    console.log(users.value)
})

const viewProfile = (selectedUser) => {
    //router.push({ path: '/clicked-user-profile', query: { user: selectedUser.path[1].id } })
    //router.push({ name: 'clicked-user-profile', params: { user: selectedUser.path[1].id } })
    window.location.href = '/clicked-user-profile/'
    console.log(selectedUser.path[2].innerText.split('\n')[0])
    localStorage.setItem("clicked-user", selectedUser.path[1].id)
    // localStorage.setItem("clicked-user-name", selectedUser.path[2].innerText.split('\n')[0])
    // localStorage.setItem("clicked-user-img", selectedUser.path[0].src)
    // authStore.setClickedUser(selectedUser.path[1].id, selectedUser.path[0].src)
}
</script>

<template>
    <div class="w-[30%] bg-slate-800 h-screen">
        <div class="flex flex-col items-center">
            <div class="w-full px-6 pt-2">
                <span class="absolute flex items-center p-2">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </span>
                <input type="search" name="q" class="p-2 text-sm w-full text-white bg-gray-600 rounded-full pl-10 focus:outline-none focus:bg-white focus:text-gray-900" placeholder="Search Twitter" autocomplete="off">
            </div>
            <div class="flex flex-col bg-slate-700 rounded-xl mt-4 text-white">
                <h1 class="font-extrabold p-2 text-[20px]">
                    Users to follow
                </h1>
                <div v-for="user in users.length" class="flex w-full justify-center">
                <button class="rounded-full" @click="viewProfile" :id="users[user-1].email">
                    <img :src="users[user-1].pic" class="w-14 h-14 rounded-full object-cover ml-2">
                </button>
                <div class="mt-4 p-2">
                    {{users[user-1].name}}
                </div>
                <div>
                    <button
                    id="postTweet"
                    @click="postTweet"
                    class="m-4 p-2 md:w-20 ripple ripple-bg-gray-300 shadow bg-blue-500 hover:bg-blue-600 text-white rounded-full">
                    <span class="">Follow</span>
                    </button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>