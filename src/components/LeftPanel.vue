<script setup>
import Home from '../assets/home/home.vue';
import router from '../router';
import {useRoute} from 'vue-router';
import HomeIcon from '../assets/leftPanel/HomeIcon.vue';
import HomeIconDark from '../assets/leftPanel/HomeIconDark.vue';

const user_img = localStorage.getItem("pic")
console.log(useRoute().path)
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
                        <h1 class="font-bold bg-gray-600 rounded-full p-3" v-if="useRoute().path=='/home/' ">
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
                <button @click="router.replace('/user-profile/')"  class="hover:bg-blue-500 rounded-full">
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
                </button>
            </div>

            <div>
                <button
                    id="gmail"
                    class="md:w-48 p-3 m-1 ripple ripple-bg-gray-300 shadow-md bg-blue-400 hover:bg-blue-600 text-white rounded-full">
                    <span class="phone:text-[10px] md:text-l">Tweet</span>
                </button>
            </div>

            <div>
                <div class="flex">
                    <img class="w-14 h-14 rounded-full object-cover" :src=user_img alt="Rounded avatar">
                    <div class="flex-col pl-2">
                        <h1 class="text-sm">
                            Aniket Choudhary
                        </h1>
                        <h1 class="text-sm">
                            @aniketsab123
                        </h1>
                    </div>
                </div>
            </div>

        </div>
    </div>

</template>