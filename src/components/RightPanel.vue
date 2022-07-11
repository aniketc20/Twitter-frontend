<script setup>
import Home from '../assets/home/home.vue';
import { ref } from "vue"
import axios from "axios"
import router from '../router';
import { useAuthStore } from '../stores/auth';

const user_img = localStorage.getItem("pic")
const user_email = localStorage.getItem("email")
const authStore = useAuthStore()
const token = localStorage.getItem("token")
const loggenInUser = localStorage.getItem("email")
const url = import.meta.env.VITE_API_URL

var users = ref([])
var showLoading = ref(true)

axios.defaults.headers.common["Authorization"] = "Bearer " + token
axios
    .get(url + `followusers/`+user_email, showLoading.value=false)
    .then((result) => {
        for (let i = 0; i < result.data.length; i++) {
            users.value.push(result.data[i]);
        }
        showLoading.value=true
    console.log(users.value)
})

const viewProfile = (selectedUser) => {
    window.location.href = '/'+selectedUser.path[1].id+'/'
    localStorage.setItem("clicked-user-email", selectedUser.path[1].id)
    console.log(selectedUser.path[1].id)
}
const followUser = (user) => {
    var followORunFollow = document.getElementById(user.path[1].id+`message`);
    console.log(followORunFollow.textContent)
    if(followORunFollow.textContent=="Follow") {
        followORunFollow.textContent = "Unfollow"
        axios
            .post(url + `follow`, {
                "follower": loggenInUser,
                "following": user.path[1]['id']
            })
            .then((result) => {
                console.log(result)
            })
    }
    else {
        followORunFollow.textContent = "Follow"
        axios
            .post(` http://localhost:8000/v1/unfollow`, {
                "follower": loggenInUser,
                "following": user.path[1]['id']
            })
            .then((result) => {
                console.log(result)
            })
    }
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
            <div class="flex flex-col bg-slate-700 rounded-xl mt-4 w-[90%] text-white">
                <h1 class="font-extrabold p-2 text-[20px]">
                    Users to follow
                </h1>
                <div class="flex justify-center">
                    <div :hidden="showLoading">
                    <i class="fa fa-circle-o-notch fa-spin" style="font-size:24px"></i>
                </div>
                </div>
                <div v-for="user in users.length" class="flex w-full mt-4">
                    <div>
                        <button class="rounded-full" @click="viewProfile" :id="users[user-1].email">
                            <img :src="users[user-1].pic" class="w-14 h-14 rounded-full object-cover ml-2">
                        </button>
                    </div>
                    <div class="flex justify-between w-full">
                        <div class="ml-4">
                            {{users[user-1].name}}
                        </div>
                        <div :id="users[user-1].email">
                            <button
                            :id="users[user-1].email"
                            @click="followUser"
                            class="mr-3 p-1 md:w-20 ripple ripple-bg-gray-300 shadow bg-blue-500 hover:bg-blue-600 text-white rounded-full">
                            <span class="" :id="users[user-1].email+`message`">Follow</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>