<script setup lang="ts">
import Home from '../assets/home/home.vue';
import LeftPanelVue from '../components/LeftPanel.vue';
import RightPanelVue from '../components/RightPanel.vue';
import axios from "axios"
import { ref } from "vue"
import { createToast } from "mosha-vue-toastify"
import "mosha-vue-toastify/dist/style.css"
import 'emoji-picker-element';

const user_img = localStorage.getItem("pic")
const user_email = localStorage.getItem("email")
const tweet = ref("")

var emoticon = ref(true)


const postTweet = () => {
    //axios.defaults.headers.common["Authorization"] = "Bearer " + token
    console.log(tweet.value)
    axios
      .post(`http://localhost:8000/v1/tweet`,{
        tweet: tweet.value,
        user: user_email
    })
      .then((result) => {
        console.log(result)
        tweet.value = ''
        tweetPosted();
      })
}

const tweetPosted = () => {
  createToast(
    { description: "Tweet Posted" },
    {
      position: "top-center",
      type: "info",
      toastBackgroundColor: "#2e4fa3",
      hideProgressBar: true,
    }
  )
}

const handleEmojiClick = (detail) => {
    tweet.value += detail.detail.emoji.unicode;
}
</script>

<template>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<div class="flex h-full">
    <LeftPanelVue/>
    <div class="w-[55%] bg-gray-900">
        <div class="flex flex-col h-screen text-white overflow-auto">
            <div class="p-3">
                <h1 class="font-bold md:text-lg">
                    Home
                </h1>
            </div>
            <div class="p-3">
                <div class="flex">
                    <img class="w-14 h-14 rounded-full object-cover" :src=user_img alt="Rounded avatar">
                    <textarea v-model="tweet" id="tweet" type="text" placeholder="What's happening?" class="p-3 w-full text-xl outline-0 bg-gray-900"></textarea>
                </div>
            </div>
            <hr class="ml-16 mr-6">
            <div class="p-3">
                <div class="flex flex-row-reverse mt-2 justify-between items-center content-end">
                    <div>
                        <button
                        id="postTweet"
                        :disabled="tweet.length < 1"
                        @click="postTweet"
                        class="w-20 p-1 ripple ripple-bg-gray-300 shadow bg-blue-500 hover:bg-blue-600 text-white rounded-full">
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
                            <emoji-picker @emojiClick="handleEmojiClick" :hidden=emoticon class="absolute z-10 mt-10">

                            </emoji-picker>
                            <!-- <VuemojiPicker @emojiClick="handleEmojiClick" :hidden=emoticon class="absolute z-10 mt-10" /> -->
                            <i class="fa fa-smile-o cursor-pointer" aria-hidden="true" @click="emoticon=(!emoticon)"></i>
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
            <div class="border-t">
                <!-- Feed -->
                <div class="flex p-3 border-b">
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

                <div class="flex p-3">
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
    <RightPanelVue/>
</div>

</template>
<style scoped>
button:disabled {
  border: 1px solid #999999;
  background-color: transparent;
  color: white;
  box-shadow: none;
}
</style>