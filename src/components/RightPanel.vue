<script setup>
import Home from '../assets/home/home.vue';

const user_img = localStorage.getItem("pic")
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
        </div>
    </div>
</template>