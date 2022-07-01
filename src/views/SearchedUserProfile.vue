<script setup>

import LeftPanelVue from '../components/LeftPanel.vue';
import RightPanelVue from '../components/RightPanel.vue';
import { ref } from "vue"
import axios from "axios"

const user_img = ref("https://media.istockphoto.com/photos/natural-black-suede-texture-for-design-or-background-picture-id1390028500?k=20&m=1390028500&s=612x612&w=0&h=YJsfd-uRWmlUP2a_Dzq5w9g6sReulvQ_GFIVuNkFgpA=")
const user_name = ref("")
const user_mail = ref("")
const followers = ref("")
const following = ref("")
const tweets = ref([])

axios
    .get(`http://localhost:8000/v1/getUserTweets/`+localStorage.getItem("clicked-user"))
    .then((result) => {
        tweets.value = result.data.tweets;
        user_img.value = result.data.user_details[1]
        user_name.value = result.data.user_details[0]
        user_mail.value = result.data.user_details[2]
        followers.value = result.data.followers[0]
        following.value = result.data.following[0]
        console.log(result.data, tweets.value, localStorage.getItem("clicked-user"))
})

</script>

<template>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<div class="flex h-full">
    <LeftPanelVue/>
    <div class="w-[55%] bg-gray-900">
        <div class="flex flex-col h-screen overflow-auto text-white">
            <div class="w-full bg-gray-700 h-56">
                <div class="flex pt-36 justify-between">
                    <img class="w-32 h-32 rounded-full m-4 p-1 bg-black object-cover" :src=user_img alt="Rounded avatar">
                </div>
            </div>
            <div class="mt-20 m-4">
                <h1 class="text-white font-bold text-[20px]">
                    {{ user_name }}
                </h1>
                <h1 class="text-slate-400">
                    {{user_mail }}
                </h1>
            </div>

            <div>
                <div class="flex">
                    <a href="#" class="decoration-white hover:underline ml-4 ">
                        <div class="flex">
                            <div class="text-white text-sm pr-1">
                                <h1 class="font-bold inline">{{ following }} {{ following.length }}
                                <h1 class="inline text-slate-400">Following</h1></h1>
                            </div>
                        </div>
                    </a>
                    <a href="#" class="decoration-white hover:underline">
                        <div class="flex">
                            <div class="ml-4 text-white text-sm pr-1">
                                <h1 class="font-bold inline">{{ followers }} {{ followers.length }}
                                <h1 class="inline text-slate-400">Followers</h1></h1>
                            </div>
                        </div>
                    </a>
                </div>
            </div>

            <div class="mt-6 border-t-[0.1px] border-blue-200">
            <!-- Feed -->
            <div v-for="tweet in tweets.length" class="flex p-3 border-b-[0.1px] border-blue-200">
                <img class="w-14 h-14 rounded-full object-cover" :src=tweets[tweet-1].userPic  alt="Rounded avatar">
                <div class="flex flex-col pl-3 w-full">
                    <div class="flex">
                        <h1 class="font-bold">
                            {{ tweets[tweet-1].tweetedBy }}
                        </h1>
                        <h1 class="text-slate-400 ml-1">
                            • {{ (new Date(tweets[tweet-1].createdAt)).toString().substring(4, 10) }},
                            {{ (new Date(tweets[tweet-1].createdAt)).toString().substring(11, 15) }} 
                        </h1>
                    </div>

                    <!-- Tweet -->
                    <div>
                        {{ tweets[tweet-1].tweet }}
                    </div>

                    <div class="flex">
                        <img :src="tweets[tweet-1].mediaFile" class="rounded-2xl mt-4" alt="">
                        <!-- {{ tweets[tweet-1].mediaFile }} -->
                    </div>
                    <!-- Tweet ends -->
                </div>
            </div>
        </div>
        </div>
    </div>
    <RightPanelVue/>
</div>

</template>