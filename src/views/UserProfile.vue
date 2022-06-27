<script setup>
import Home from '../assets/home/home.vue';
import LeftPanelVue from '../components/LeftPanel.vue';
import RightPanelVue from '../components/RightPanel.vue';
import { ref } from "vue"
import axios from "axios"

const user_img = localStorage.getItem("pic")
const user_name = localStorage.getItem("name")
const user_email = localStorage.getItem("email")

var profile_pic = ref(user_img)
var openModal = ref(false)
var tweets = ref([])

axios
    .get(`http://localhost:8000/v1/getUserTweets`)
    .then((result) => {
        for (let i = 0; i < result.data.length; i++) {
            tweets.value.push(result.data[i]);
        } 
    console.log(tweets.value)
})
const capturePic = () => {
    // profile_pic.value = reader.readAsDataURL(event.target.files[0])
    const preview = document.getElementById('user-new-pic');
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();
    reader.addEventListener("load", function () {
        // convert image file to base64 string
        // preview.src = reader.result;
        profile_pic.value = reader.result;
        //user_img.value = reader.result
        console.log(reader.result)
    }, false);
    if (file) {
        reader.readAsDataURL(file);
    }
}

const updateProfile = () => {
    //axios.defaults.headers.common["Authorization"] = "Bearer " + token
    axios
      .post(`http://localhost:8000/v1/updateProfile`,{
        picUrl: profile_pic.value,
        email: user_email
    })
      .then((result) => {
        console.log(result)
    })
}
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
                    <button @click="openModal=true" class="font-bold mt-24 my-12 mx-4">
                    <div class="text-white rounded-full hover:bg-gray-600 px-4 py-1 border border-white-200">
                        Edit profile
                    </div>
                    </button>
                </div>
            </div>
            
            <div class="mt-20 m-4">
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

            <div class="mt-6 border-t">
            <!-- Feed -->
            <div v-for="tweet in tweets.length" class="flex p-3 border-b">
                <img class="w-14 h-14 rounded-full object-cover" :src=tweets[tweet-1].userPic  alt="Rounded avatar">
                <div class="flex flex-col pl-3 w-full">
                    <div>
                        <h1 class="font-bold">
                            {{ tweets[tweet-1].userName }}
                        </h1>
                    </div>

                    <!-- Tweet -->
                    <div>
                        {{ tweets[tweet-1].tweet }}
                    </div>
                    <!-- <div class="mt-4">
                        <iframe class="rounded-md md:w-full md:h-[315px]" 
                            src="https://www.youtube.com/embed/pba_YmWDAIU" 
                            title="YouTube video player" frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                        </iframe>
                    </div> -->
                    <!-- Tweet ends -->
                </div>
            </div>
        </div>
        </div>
    </div>
    <RightPanelVue/>
</div>

<Modal
    v-model="openModal"
  >
    <div class="modal bg-white w-[45%] h-full rounded-xl">
        <div class="flex justify-between">
            <div class="p-4 font-bold text-[18px]">
                Edit Profile
            </div>
            <div class="p-4">
                <button @click="openModal=false" class="rounded-full hover:bg-gray-300 w-6">
                    <i class="fa fa-times" aria-hidden="true"></i>
                </button>
            </div>
        </div>
        <div class="bg-gray-700 h-56">
            <div class="flex pt-40 justify-between">
                <div class="image-upload p-1 ml-4 w-20 h-20 rounded-full">
                    <input @change="capturePic" ref="profilePic" type="file" id="file-upload" class="ml-5 mt-5 p-1 w-8 h-8 opacity-50 bg-gray-100 rounded-full hover:opacity-75" />
                    <label for="file-upload">
                        <i class="fa fa-camera ml-5 mt-11 p-1 absolute z-10 w-6 h-6 opacity-50 bg-gray-100 rounded-full hover:opacity-75" aria-hidden="true">
                        </i>
                    </label>
                    <img id="user-new-pic" :src="profile_pic" alt="" class="absolute object-cover mt-6 w-16 h-16 rounded-full z-0">
                    <!-- <input type="file" class="ml-5 mt-5 p-1 w-8 h-8 opacity-50 bg-gray-100 rounded-full hover:opacity-75">
                        <i class="fa fa-camera" aria-hidden="true"></i> -->
                    
                </div>
            </div>
        </div>
        <div class="flex flex-col mt-12">
            <div class="m-4 grid">
                    <div>
                        Name
                    </div>
                    <div>
                        <input type="text" :value="user_name" class="border border-gray-400 rounded-md p-2">
                    </div>
            </div>
            <div class="m-4 grid">
                <div>
                    Bio
                </div>
                <div>
                    <input type="text" class="border border-gray-400 rounded-md p-2">
                </div>
            </div>
            <div class="m-1 ml-4">
                <button @click="updateProfile" class="text-white bg-black rounded-full hover:bg-gray-700 px-4 py-1 border border-white-200">
                Save
            </button>
            </div>
        </div>
      <!-- <button @click="openModal=false">
        close
      </button> -->
    </div>
  </Modal>
</template>
<style scoped >
.image-upload > input
{
    display: none;
}
.image-upload i
{
    cursor: pointer;
}

</style>