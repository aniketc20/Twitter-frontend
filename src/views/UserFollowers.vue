<script setup>

import LeftPanelVue from '../components/LeftPanel.vue';
import RightPanelVue from '../components/RightPanel.vue';
import { ref } from "vue"
import axios from "axios"
import {useRoute} from 'vue-router';

const result = useRoute().path.match(/\/.+?\//g);
const email = (result[0].slice(1, -1));
const followers = ref([])
const token = localStorage.getItem("token")
const loggenInUser = localStorage.getItem("email")
const url = import.meta.env.VITE_API_URL

axios.defaults.headers.common["Authorization"] = "Bearer " + token
axios
    .get(url+email+`/followers/`)
    .then((result) => {
        followers.value = result.data
        console.log(followers.value)
})

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
            .post(url + `unfollow`, {
                "follower": loggenInUser,
                "following": user.path[1]['id']
            })
            .then((result) => {
                console.log(result)
            })
    }
}

const viewProfile = (selectedUser) => {
    console.log(selectedUser.path[1].id)
    window.location.href = '/'+selectedUser.path[1].id+'/'
    console.log(selectedUser.path[2].innerText.split('\n')[0])
    localStorage.setItem("clicked-user-email", selectedUser.path[1].id)
}
</script>
<template>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<div class="flex h-full">
    <LeftPanelVue/>
        <div class="w-[55%] bg-gray-900">
        <div class="flex flex-col rounded-xl mt-4 text-white">
            <div v-for="user in followers" class="flex w-full mt-4">
            <div>
                <button class="rounded-full" @click="viewProfile" :id="user.email">
                    <img :src="user.pic" class="w-14 h-14 rounded-full object-cover ml-2">
                </button>
            </div>
            <div class="w-full">
                <div class="flex justify-between">
                    <div class="ml-4 font-bold">
                        <h1 class="text-[16px]">
                            {{user.name}}
                        </h1>
                        <h1 class="text-[10px] text-slate-300">
                            {{user.email}}
                        </h1>
                    </div>
                    <div v-if="user.message!='Logged in user' " class="mr-4" :id="user.email">
                        <button
                        :id="user.email"
                        @click="followUser"
                        class="p-1 md:w-20 ripple ripple-bg-gray-300 shadow bg-blue-500 hover:bg-blue-600 text-white rounded-full">
                        <span class="text-sm" :id="user.email+`message`">{{user.message}}</span>
                        </button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>

    <RightPanelVue/>
</div>
</template>