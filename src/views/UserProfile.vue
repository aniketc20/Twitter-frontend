<script setup>
import Home from '../assets/home/home.vue';
import LeftPanelVue from '../components/LeftPanel.vue';
import RightPanelVue from '../components/RightPanel.vue';

const user_img = localStorage.getItem("pic")
const user_name = localStorage.getItem("name")

console.log(user_img)
</script>

<template>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<div class="flex h-full">
    <LeftPanelVue/>
    <div class="w-[55%] bg-gray-900">
        <div class="flex flex-col">
            <div class="w-full bg-gray-700 h-36">
            </div>
            <div class="flex w-full bg-gray-700 h-20">
                <img class="w-32 h-32 rounded-full m-4 p-1 bg-black" :src=user_img alt="Rounded avatar">
            </div>
            <div class="flex flex-row-reverse p-4">
                <button class="font-bold">
                <div class="text-white rounded-full hover:bg-gray-600 px-4 py-1 border border-white-200">
                    Edit profile
                </div>
                </button>
            </div>
            <div class="m-4">
                <h1 class="text-white font-bold text-[20px]">
                    {{user_name}}
                </h1>
                <h1 class="text-slate-400">
                    @aniketsab123
                </h1>
            </div>
            <div>
                <div class="flex">
                    <a href="#" class="decoration-white hover:underline ml-4 ">
                        <div class="flex">
                            <div class="text-white text-sm pr-1">
                                <h1 class="font-bold inline">57 
                                <h1 class="inline text-slate-400">Following</h1></h1>
                            </div>
                        </div>
                    </a>
                    <a href="#" class="decoration-white hover:underline">
                        <div class="flex">
                            <div class="ml-4 text-white text-sm pr-1">
                                <h1 class="font-bold inline">8 
                                <h1 class="inline text-slate-400">Followers</h1></h1>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
    <RightPanelVue/>
</div>

</template>