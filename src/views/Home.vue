<script setup>
import Home from '../assets/home/home.vue';

</script>

<template>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<div class="flex h-full">
    <div class="w-[20%] bg-slate-800">
        <div class="flex flex-col h-screen md:px-6 justify-evenly text-white">
            <div>
                <img class="px-3" src="https://img.icons8.com/color/undefined/twitter--v1.png"/>
            </div>
            <div class="md:text-xl">
                <button class="hover:bg-blue-500 rounded-full p-3">
                    <div class="flex">
                        <Home class=" m-1"/>Home
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
                <button class="hover:bg-blue-500 rounded-full p-3">
                    <div class="flex">
                        <i class="fa fa-user-o m-1" aria-hidden="true"></i>Profile
                    </div>
                </button>
            </div>

            <div>
                <button
                    id="gmail"
                    @click="GoogleSignIn"
                    class="md:w-48 p-3 m-1 ripple ripple-bg-gray-300 shadow-md bg-blue-400 hover:bg-blue-600 text-white rounded-full">
                    <span class="phone:text-[10px] md:text-l">Tweet</span>
                </button>
            </div>

            <div>
                <div class="flex">
                    <img class="w-14 h-14 rounded-full" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Rounded avatar">
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
    <div class="w-[55%] bg-gray-900">
        <div class="flex flex-col h-screen text-white">
            <div class="p-3">
                <h1 class="font-bold md:text-lg">
                    Home
                </h1>
            </div>
            <div class="p-3">
                <div class="flex">
                    <img class="w-14 h-14 rounded-full" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Rounded avatar">
                    <textarea type="text" placeholder="What's happening?" class="p-3 w-full text-xl outline-0 bg-gray-900"></textarea>
                </div>
            </div>
            <hr class="ml-16 mr-6">
            <div class="p-3">
                <div class="flex flex-row-reverse mt-2 justify-between items-center content-end">
                    <div>
                        <button
                        id="gmail"
                        @click="Tweet"
                        class="w-20 p-1 ripple ripple-bg-gray-300 shadow bg-blue-400 hover:bg-blue-600 text-white rounded-full">
                        <span class="">Tweet</span>
                    </button>
                    </div>
                    <div class="flex ml-12 justify-evenly w-48">
                        <div>
                            <i class="fa fa-picture-o" aria-hidden="true"></i>
                        </div>
                        <div>
                            <i class="fa fa-file-video-o" aria-hidden="true"></i>
                        </div>
                        <div>
                            <i class="fa fa-bar-chart" aria-hidden="true"></i>
                        </div>
                        <div>
                            <i class="fa fa-smile-o" aria-hidden="true"></i>
                        </div>
                        <div>
                            <i class="fa fa-calendar" aria-hidden="true"></i>
                        </div>
                        <div>
                            <i class="fa fa-map-marker" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="border-y p-3">
                <div class="flex py-3">
                    <img class="w-14 h-14 rounded-full" src="https://pbs.twimg.com/profile_images/1428049246956097536/JEm1SO_s_400x400.jpg" alt="Rounded avatar">
                    <div class="flex flex-col pl-3 w-full">
                        <div>
                            <h1 class="font-bold">
                                YouTube India
                                @YouTubeIndia
                            </h1>
                        </div>

                        <!-- Tweet -->
                        <div>
                            Coke Studio Season 10| Ranjish Hi Sahi| Ali Sethi
                        </div>
                        <div class="mt-4">
                            <iframe class="rounded-md md:w-full md:h-[315px]" 
                            src="https://www.youtube.com/embed/pba_YmWDAIU" 
                            title="YouTube video player" frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen></iframe>
                       </div>
                       <!-- Tweet ends -->
                    </div>
                </div>
            </div>
        </div>
    </div>
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
</div>
</template>