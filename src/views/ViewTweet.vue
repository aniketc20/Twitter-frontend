<script setup>
import LeftPanelVue from '../components/LeftPanel.vue';
import RightPanelVue from '../components/RightPanel.vue';
import axios from "axios"
import { ref } from 'vue';
import 'emoji-picker-element';


const token = localStorage.getItem("token")
const tweetId = localStorage.getItem("tweetId")
const tweet = ref("")
const user_img = localStorage.getItem("pic")
const newComment = ref("")
const user_email = localStorage.getItem("email")
const user_name = localStorage.getItem("name")
const url = import.meta.env.VITE_API_URL
const tweeterImg = ref("https://picsum.photos/2")

var hide_cross = ref(true)
var emoticon = ref(true)
var alreadyLiked = ref("")
var numOfLikes = ref(0)

const handleEmojiClick = (detail) => {
    newComment.value += detail.detail.emoji.unicode;
}

// setInterval(function(){ 
// axios.defaults.headers.common["Authorization"] = "Bearer " + token
// axios
//     .get(url + `getTweetInfo/`+tweetId)
//     .then((result) => {
//         tweet.value = result.data
//         numOfLikes.value = result.data.likedBy.length;
//         if(result.data.likedBy.includes(user_email)) {
//             numOfLikes.value = result.data.likedBy.length;
//             alreadyLiked.value = true
//         }
//         console.log(result.data)
// })
// }, 5000);

axios.defaults.headers.common["Authorization"] = "Bearer " + token
axios
    .get(url + `getTweetInfo/`+tweetId)
    .then((result) => {
        tweet.value = result.data
        console.log(result.data)
        tweeterImg.value = result.data.userPic
        if(result.data.likedBy.includes(user_email)) {
            numOfLikes.value = result.data.likedBy.length;
            alreadyLiked.value = true
        }
})

const postComment = () => {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token
    console.log(newComment.value)
    axios
      .post(url+tweetId+ `/postComment`,{
        "tweetId": tweetId,
        "comment": newComment.value,
        "commentedBy": user_name,
        "commenterPic": user_img,
        "commenterEmail": user_email,
        "mediaFile": "null"
    })
      .then((result) => {
        console.log(result)
        window.location.href = '/tweet/' + tweetId + '/';
        // window.location.href = '/home/';
      })
}

const postLike = (tweetId) => {
    var element = document.getElementById('like')
    const cssObj = window.getComputedStyle(element, null);
    if(cssObj.getPropertyValue("color")=='rgb(255, 0, 0)') {
        element.style.color = 'white'
        numOfLikes.value = numOfLikes.value - 1
    }
    else {
        element.style.color = 'red'
        numOfLikes.value = numOfLikes.value + 1
    }
    axios.defaults.headers.common["Authorization"] = "Bearer " + token
    axios
        .post(url+tweetId.path[0].accessKey+`/`+user_email)
        .then((result) => {
            console.log(result.data.likedBy)
            //numOfLikes.value = result.data.likedBy.length
    })
}
</script>
<template>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<div class="flex h-full">
    <LeftPanelVue/>
        <div class="w-[55%] bg-gray-900 ">
            <div class="flex-col h-screen text-white overflow-auto">
                <div class="flex pl-6 pt-6">
                    <img class="w-14 h-14 rounded-full object-cover" :src=tweeterImg alt="Rounded avatar">
                    <div class="flex-col pl-2 text-white">
                        <h1 class="font-bold">
                            {{tweet.tweetedBy}}
                        </h1>
                        <h1 class="text-sm">
                            {{tweet.email}}
                        </h1>
                    </div>
                </div>
                <div class="p-6">
                    <h1 class="text-white text-2xl">
                        {{ tweet.tweet }}
                    </h1>
                </div>
                <div v-if="tweet.mediaFile!=''" class="border-1 border-b">
                    <img class="rounded-2xl w-[90%] m-auto mb-2" :src="tweet.mediaFile" alt="">
                    <div class="flex p-6 items-center">
                            <i class="fa fa-comment" aria-hidden="true"></i>
                            <h1 class="pl-2">{{ tweet.numOfComments }}</h1>
                            <div @click="postLike" v-if="alreadyLiked" :accesskey="tweet.tweetId" id="likeDiv" class="flex ml-6 cursor-pointer items-center justify-center hover:bg-blue-500 transition ease-in-out delay-50 rounded-full w-7 h-7">
                            <i class="fa fa-heart" :accesskey="tweet.tweetId" id="like" aria-hidden="true" style="color: red;"></i>
                            </div>
                            <div @click="postLike" v-if="!alreadyLiked" :accesskey="tweet.tweetId" id="likeDiv" class="flex ml-6 cursor-pointer items-center justify-center hover:bg-blue-500 transition ease-in-out delay-50 rounded-full w-7 h-7">
                                <i class="fa fa-heart rounded-full" :accesskey="tweet.tweetId" id="like" aria-hidden="true" style="color: whitesmoke;"></i>
                            </div>
                            <h1 class="pl-2">{{ numOfLikes }}</h1>
                        </div>
                </div>

                <div class="p-3">
                    <div class="flex">
                        <img class="w-14 h-14 rounded-full object-cover" :src=user_img alt="Rounded avatar">
                        <textarea v-model="newComment" id="tweet" type="text" placeholder="What's happening?" class="p-3 w-full text-xl outline-0 bg-gray-900"></textarea>
                    </div>
                </div>

                <div class="p-3">
                <div class="flex flex-row-reverse mt-2 justify-between items-center content-end">
                    <div>
                        <button
                        id="postTweet"
                        :disabled="newComment.length < 1 && gif_img==null"
                        @click="postComment"
                        class="w-20 p-1 ripple ripple-bg-gray-300 shadow bg-blue-500 hover:bg-blue-700 text-white rounded-full">
                        <span class="">Reply</span>
                    </button>
                    </div>
                    <hr class="ml-16 mr-6">
                    <div class="p-3 flex justify-center">

                        <div class="image ">
                            <div class="overlay">
                                
                            <button @click="deleteGIF" :hidden="hide_cross" class="rounded-full m-2 bg-gray-700 hover:bg-gray-800 w-6">
                                <i class="fa fa-times" aria-hidden="true"></i>
                            </button>
                            </div>
                            <img class="rounded-2xl m-auto" :src="gif_img" alt="">
                        </div>
                    </div>

                    <div class="flex ml-12 justify-evenly w-48 items-center">
                        <div @click="insertPic" class="flex cursor-pointer items-center justify-center hover:bg-slate-600 transition ease-in-out delay-50 rounded-full w-7 h-7">
                            <input @change="insertPic" type="file" id="file-upload" hidden="true" />
                            <label for="file-upload" class="cursor-pointer">
                                <i class="fa fa-picture-o" style="color:rgb(29, 155, 240)" aria-hidden="true"></i>
                            </label>
                        </div>
                        <div class="flex cursor-pointer items-center justify-center hover:bg-slate-600 transition ease-in-out delay-50 rounded-full w-7 h-7">
                            <button @click="grab_data()">
                                <i class="fa fa-file-video-o" style="color:rgb(29, 155, 240)" aria-hidden="true"></i>
                            </button>
                        </div>
                        <div class="flex cursor-pointer items-center justify-center hover:bg-slate-600 transition ease-in-out delay-50 rounded-full w-7 h-7">
                            <i class="fa fa-bar-chart" style="color:rgb(29, 155, 240)" aria-hidden="true"></i>
                        </div>
                        <div class="flex cursor-pointer items-center justify-center hover:bg-slate-600 transition ease-in-out delay-50 rounded-full w-7 h-7">
                            <i class="fa fa-smile-o" style="color:rgb(29, 155, 240)" aria-hidden="true" @click="emoticon=(!emoticon)"></i>
                        </div>
                    </div>
                </div>
            </div>
            <hr class="">
                <div class="flex h-0 rounded-xl">
                    <emoji-picker @emojiClick="handleEmojiClick" :hidden=emoticon class="m-auto dark shadow-gray-700 shadow-lg">
                    </emoji-picker>
                </div>
                <!-- Comments -->
                
                <div v-for="comment in tweet.comments" class="flex p-3 w-full border-b-[0.1px] border-blue-200 cursor-pointer hover:bg-gray-700">
                    <div>
                        <img class="w-14 h-14 rounded-full object-cover" :src=comment.commenterPic  alt="Rounded avatar">
                    </div>
                    <div class="flex flex-col pl-3 w-full">
                        <div class="flex">
                            <h1 class="font-bold">
                                {{ comment.commentedBy }}
                            </h1>
                            <h1 class="text-slate-400 ml-2">
                                {{ comment.commenterEmail }}
                            </h1>
                            <!-- <h1 class="text-slate-400 ml-1">
                                • {{ (new Date(tweets[tweet-1].createdAt)).toString().substring(4, 10) }},
                                {{ (new Date(tweets[tweet-1].createdAt)).toString().substring(11, 15) }} 
                            </h1> -->
                        </div>

                        <!-- Tweet -->
                        <div>
                            {{ comment.comment }}
                        </div>
                        
                        <!-- <div class="flex">
                            <img :src="tweets[tweet-1].mediaFile" class="rounded-2xl mt-4" alt="">
                        </div> -->
                            <!-- Tweet ends -->
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
.image {
  position: relative;
  display: inline-block;
}

.overlay {
  position: absolute;
  right: 0;
  z-index: 5;
}

emoji-picker {
  --num-columns: 6;
  
  --input-border-radius: 2rem;
}
</style>