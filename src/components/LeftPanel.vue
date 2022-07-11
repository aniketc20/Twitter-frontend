<script setup>
import Home from '../assets/home/home.vue';
import router from '../router';
import {useRoute} from 'vue-router';
import HomeIcon from '../assets/leftPanel/HomeIcon.vue';
import HomeIconDark from '../assets/leftPanel/HomeIconDark.vue';
import { ref } from "vue"
import { createPopper } from "@popperjs/core";
import axios from "axios"

const user_img = localStorage.getItem("pic")
const user_email = localStorage.getItem("email")
const user_name = localStorage.getItem("name")

const token = localStorage.getItem("token")
const url = import.meta.env.VITE_API_URL

const viewProfile = (selectedUser) => {
    console.log(selectedUser.path[1].id)
    window.location.href = '/'+user_email+'/'
    console.log(selectedUser.path[2].innerText.split('\n')[0])
    localStorage.setItem("clicked-user-email", user_email)
}

var dropdownPopoverShow = ref(false)
var btnDropdownRef = ref("")
var popoverDropdownRef = ref("")

console.log(useRoute().path)
const toggleDropdown = () => {
      if(dropdownPopoverShow.value){
        dropdownPopoverShow.value = false;
      } else {
        dropdownPopoverShow.value = true;
        createPopper(btnDropdownRef.value, popoverDropdownRef.value, {
          placement: "top-end"
        });
      }
}

const logout = () => {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token
    axios
      .post(url+user_email+`/logout`)
      .then((result) => {
        
        console.log(result)
        
        window.location.href = '/';
      })
}
</script>

<template>
    <div class="w-[20%] bg-slate-800">
        <div class="flex flex-col h-screen md:px-6 justify-evenly text-white">
            <div>
                <img class="px-3" src="https://img.icons8.com/color/undefined/twitter--v1.png"/>
            </div>
            <div class="md:text-xl">
                <button @click="router.replace('/home/')" class="hover:bg-blue-500 rounded-full">
                    <div class="flex">
                        <!-- <Home class=" m-1"/> -->
                        <h1 class="font-bold bg-gray-600 rounded-full p-3" v-if="useRoute().path=='/home/' || useRoute().path=='/home' ">
                        <HomeIconDark class="inline m-1"/>
                        <!-- <i class="fa fa-home m-1" style='color:orange' aria-hidden="true"></i> -->
                            Home
                        </h1>
                        <h1 v-else class="p-3">
                        <HomeIcon class="inline m-1"/>
                            Home
                        </h1>
                    </div>
                </button>
            </div>

            <div class="flex md:text-xl">
                <button class="hover:bg-blue-500 rounded-full p-3">
                    <div class="flex">
                        <i class="fa fa-bell-o m-1" aria-hidden="true"></i>Notifications
                    </div>
                </button>
            </div>

            <div class="md:text-xl">
                <button class="hover:bg-blue-500 rounded-full p-3">
                    <div class="flex">
                        <i class="fa fa-comments-o m-1" aria-hidden="true"></i>Messages
                    </div>
                </button>
            </div>

            <div class="md:text-xl">
                <button class="hover:bg-blue-500 rounded-full" @click="viewProfile">
                    <div class="flex" :id="user_email">
                        <h1 class="font-bold bg-gray-600 rounded-full p-3" v-if=" useRoute().path.includes(user_email) ">
                        <i class="fa fa-user m-1" style='color:orange' aria-hidden="true"></i>
                            Profile
                        </h1>
                        <h1 v-else class="p-3">
                        <i class="fa fa-user-o m-1" aria-hidden="true"></i>
                            Profile
                        </h1>
                    </div>
                </button>
                <!-- <button @click="router.replace('user-profile')"  class="hover:bg-blue-500 rounded-full">
                    <div class="flex">
                        <h1 class="font-bold bg-gray-600 rounded-full p-3" v-if="useRoute().path=='/user-profile/' ">
                        <i class="fa fa-user m-1" style='color:orange' aria-hidden="true"></i>
                            Profile
                        </h1>
                        <h1 v-else class="p-3">
                        <i class="fa fa-user-o m-1" aria-hidden="true"></i>
                            Profile
                        </h1>
                    </div>
                </button> -->
            </div>

            <div>
                <button
                    id="gmail"
                    class="md:w-48 p-3 m-1 ripple ripple-bg-gray-300 shadow-md bg-blue-400 hover:bg-blue-600 text-white rounded-full">
                    <span class="phone:text-[10px] md:text-l">Tweet</span>
                </button>
            </div>

                <div class="relative align-middle">
                    <div v-bind:class="{'hidden': !dropdownPopoverShow, 'block': dropdownPopoverShow}" class="bg-gray-700 shadow-slate-500 w-full text-white text-base float-left py-2 list-none text-left rounded shadow-lg" ref="popoverDropdownRef">
                    <div class="text-sm font-normal block w-full whitespace-nowrap bg-transparent">
                        <div class="flex p-1 rounded-full">
                            <img class="w-14 h-14 p-2 rounded-full object-cover" :src=user_img alt="Rounded avatar">
                            <div class="flex-col pl-2 w-full">
                                <h1 class="text-sm font-bold">
                                    {{user_name}}
                                </h1>
                            </div>
                        </div>
                    </div>
                    <a href="#pablo" class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap hover:bg-slate-800">
                        Add an existing Account
                    </a>
                    <div class="h-0 my-2 border border-solid border-t-0 border-slate-800 opacity-25"></div>
                    <a @click="logout" class="text-sm py-2 px-4 font-normal block w-full hover:bg-slate-800 cursor-pointer">
                        Logout
                    </a>
                    </div>
                </div>
            
            <div class="">
                <div class="flex hover:bg-slate-500 rounded-full p-2 cursor-pointer" type="button" @click="toggleDropdown" ref="btnDropdownRef">
                    <img class="w-14 h-14 rounded-full object-cover" :src=user_img alt="Rounded avatar">
                    <div class="flex-col pl-2 w-96">
                        <h1 class="text-sm font-bold">
                            {{user_name}}
                        </h1>
                        <h1 class="text-sm">
                            {{user_email}}
                        </h1>
                    </div>
                </div>
            </div>

        </div>
    </div>

</template>