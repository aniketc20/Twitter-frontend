<script setup>
import Home from '../assets/home/home.vue';
import LeftPanelVue from '../components/LeftPanel.vue';
import RightPanelVue from '../components/RightPanel.vue';
import axios from "axios"
import { ref } from "vue"
import { createToast } from "mosha-vue-toastify"
import "mosha-vue-toastify/dist/style.css"
import 'emoji-picker-element';
import { Picker } from 'emoji-picker-element';

const user_img = localStorage.getItem("pic")
const user_email = localStorage.getItem("email")
const tweet = ref("")
const picker = new Picker();
const token = localStorage.getItem("token")


var emoticon = ref(true)
var openGif = ref(false)
var gifs = ref([])
var gifKeyword = ref("")
var gif_img = ref(null)
var hide_cross = ref(true)
var tweets = ref([])

// url Async requesting function
function httpGetAsync(theUrl, callback)
{
    // create the request object
    var xmlHttp = new XMLHttpRequest();

    // set the state change callback to capture when the response comes in
    xmlHttp.onreadystatechange = function()
    {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        {
            callback(xmlHttp.responseText);
        }
    }

    // open as a GET call, pass in the url and set async = True
    xmlHttp.open("GET", theUrl, true);

    // call send with no params as they were passed in on the url string
    xmlHttp.send(null);

    return;
}

// callback for the top 8 GIFs of search
function tenorCallback_search(responsetext)
{
    // Parse the JSON response
    var response_objects = JSON.parse(responsetext);

    var top_10_gifs = response_objects["results"];

    console.log(top_10_gifs)
    // load the GIFs -- for our example we will load the first GIFs preview size (nanogif) and share size (gif)

    for (let i = 0; i < top_10_gifs.length; i++) {
        gifs.value.push(top_10_gifs[i]);
    } 
    return;

}


// function to call the trending and category endpoints
function grab_data()
{
    // set the apikey and limit
    var apikey = "AIzaSyAvUqsn1erfcQVjSpOtLPkJqUhz5o6t4rg";
    var clientkey = "twitter";
    var lmt = 10;
    openGif.value = true
    console.log(gifKeyword.value)
    // test search term
    var search_term = gifKeyword.value;
    if(gifKeyword.value=="") {
        var url = "https://tenor.googleapis.com/v2/featured?key=" + apikey + "&client_key=" + clientkey;
    }
    // using default locale of en_US
    else {
        var url = "https://tenor.googleapis.com/v2/search?q=" + search_term + "&key=" +
        apikey +"&client_key=" + clientkey + "&limit=" + lmt;;
    }
    gifs.value = [];
    httpGetAsync(url,tenorCallback_search);

    // data will be loaded by each call's callback
    return;
}


// SUPPORT FUNCTIONS ABOVE
// MAIN BELOW

const postTweet = () => {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token
    console.log(tweet.value)
    axios
      .post(`http://localhost:8000/v1/tweet`,{
        tweet: tweet.value,
        mediaFile: gif_img.value,
        user: user_email
    })
      .then((result) => {
        gif_img.value = null
        hide_cross.value = true
        console.log(result)
        tweet.value = ''
        tweetPosted();
        window.location.href = '/home/';
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

const selectGif = (selectedGif) => {
    console.log(selectedGif.path[1].id)
    gif_img.value = selectedGif.path[1].id
    openGif.value=false
    hide_cross.value = false
}

const deleteGIF = () => {
    gif_img.value = null
    hide_cross.value = true
}

const insertPic = () => {
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();
    reader.addEventListener("load", function () {
        // convert image file to base64 string
        gif_img.value = reader.result;
        console.log(reader.result)
        hide_cross.value = false
    }, false);
    if (file) {
        reader.readAsDataURL(file);
    }
}
axios.defaults.headers.common["Authorization"] = "Bearer " + token
axios
    .get(`http://localhost:8000/v1/`+user_email+`/feed/`)
    .then((result) => {
        tweets.value = result.data;
        console.log(tweets.value)
})

</script>

<template>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<div class="flex h-full">
    <LeftPanelVue/>
    <div class="w-[55%] bg-gray-900 ">
        <div class="flex-col h-screen text-white overflow-auto">
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
            <hr class="ml-16 mr-6">
            <div class="p-3">
                <div class="flex flex-row-reverse mt-2 justify-between items-center content-end">
                    <div>
                        <button
                        id="postTweet"
                        :disabled="tweet.length < 1 && gif_img==null"
                        @click="postTweet"
                        class="w-20 p-1 ripple ripple-bg-gray-300 shadow bg-blue-500 hover:bg-blue-600 text-white rounded-full">
                        <span class="">Tweet</span>
                    </button>
                    </div>
                    <div class="flex ml-12 justify-evenly w-48">
                        <div>
                            <input @change="insertPic" type="file" id="file-upload" hidden="true" />
                            <label for="file-upload">
                                <i class="fa fa-picture-o cursor-pointer" aria-hidden="true"></i>
                            </label>
                            <!-- <i class="fa fa-picture-o" aria-hidden="true"></i> -->
                        </div>
                        <div>
                            <button @click="grab_data()">
                                <i class="fa fa-file-video-o" aria-hidden="true"></i>
                            </button>
                        </div>
                        <div>
                            <i class="fa fa-bar-chart" aria-hidden="true"></i>
                        </div>
                        <div>
                            <i class="fa fa-smile-o cursor-pointer" aria-hidden="true" @click="emoticon=(!emoticon)"></i>
                        </div>
                        <!-- <div>
                            <i class="fa fa-calendar" aria-hidden="true"></i>
                        </div>
                        <div>
                            <i class="fa fa-map-marker" aria-hidden="true"></i>
                        </div> -->
                    </div>
                </div>
            </div>
            <div class="border-t h-screen">
                <!-- <Modal :hidden="emoticon" @click="emoticon=true"> -->
                <div class="flex h-0 rounded-xl">
                    <emoji-picker @emojiClick="handleEmojiClick" :hidden=emoticon class="m-auto dark shadow-gray-700 shadow-lg">
                    </emoji-picker>
                </div>
                <!-- </Modal> -->
                <!-- Feed -->
           <div v-for="tweet in tweets.length" class="flex p-3 border-b-[0.1px] border-blue-200">
                <img class="w-14 h-14 rounded-full object-cover" :src=tweets[tweet-1].userPic  alt="Rounded avatar">
                <div class="flex flex-col pl-3 w-full">
                    <div class="flex">
                        <h1 class="font-bold">
                            {{ tweets[tweet-1].tweetedBy }}
                        </h1>
                        <h1 class="text-slate-400 ml-2">
                            {{ tweets[tweet-1].user }}
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
<Modal v-model="openGif">
    <div class="flex-col bg-gray-700 w-[45%] h-[600px] fixed rounded-2xl overflow-scroll">
        <div class="flex m-2">
            <div class="w-full">
            <span class="flex absolute items-center p-2">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
            </span>
            <input v-model="gifKeyword" @input="grab_data" type="search" id="searchGif" name="q" class="p-2 text-sm w-full items-center text-white bg-gray-600 rounded-full pl-10 focus:outline outline-2 focus:outline-blue-500 focus:text-white-900" placeholder="Search for GIFs" autocomplete="off">
            </div>
            <div class="pl-2 pt-1">
                <button @click="openGif=false" class="rounded-full hover:bg-gray-300 w-6">
                    <i class="fa fa-times" aria-hidden="true"></i>
                </button>
            </div>
        </div>
        <div class="flex flex-wrap justify-center">
            <div v-for="gif in gifs.length">
            <button @click="selectGif" :id="gifs[gif-1].media_formats.gif.url">
                <img :src="gifs[gif-1].media_formats.gif.url" class="w-48 h-48 p-0.5" alt="">
            </button>
            </div>
        </div>
    </div>
</Modal>
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