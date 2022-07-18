<script setup>
import Bird from '../assets/login/bird.vue';
import Google from '../assets/login/Google.vue';
import Apple from '../assets/login/Apple.vue';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import axios from "axios"
import router from '../router';
import { ref } from "vue"

const provider = new GoogleAuthProvider()
const url = import.meta.env.VITE_API_URL

var showLoading = ref(false)
async function GoogleSignIn() {
  const auth = getAuth()
  signInWithPopup(auth, provider)
    .then((result) => {
      showLoading.value = true
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result)
      // The signed-in user info.
      const user = result.user
      const full_name = user.displayName
      const email = user.email
      const pic = user.photoURL
      axios
        .post(url, {
          name: result.user.displayName,
          email: result.user.email,
          picUrl: result.user.photoURL,
        })
        .then((result) => {
          localStorage.setItem("name", result.data.name)
          localStorage.setItem("email", result.data.email)
          localStorage.setItem("pic", result.data.pic)
          localStorage.setItem("token", result.headers['twitter-user-token'])
          router.push('home')
          //window.location.push('home')
          console.log(result)
        })
    })
}
</script>

<template>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<div class="flex">
  <div class="bg-[url('https://abs.twimg.com/sticky/illustrations/lohp_en_1302x955.png')] h-screen w-[40%] flex items-center justify-center">
    <Bird class="md:w-48"/>
  </div>
  <div class="w-[60%] m-6">
    <div v-show="showLoading" class="flex flex-col justify-center items-center h-full">
      <!-- <div>
          <i class="fa fa-circle-o-notch fa-spin" style="font-size:64px"></i>
      </div> -->
      <h1 class=" md:text-[20px]">
        Logging In  
        <div class="snippet" data-title=".dot-flashing">
          <div class="stage">
            <div class="dot-flashing"></div>
          </div>
        </div>
      </h1>
    </div>
    <div v-show="!showLoading" class="flex flex-col h-full justify-evenly items-center justify-center">
      <div>
        <h1 class="font-bold md:text-[60px]">
          Happening now <img class="inline" src="https://img.icons8.com/color/48/undefined/twitter--v1.png"/>
        </h1>
      </div>

      <div class="flex flex-col items-center justify-center">
      <div>
        <h1 class="font-bold md:text-[30px]">
          Join Twitter today.
        </h1>
      </div>
      <div>
        <button
          id="gmail"
          @click="GoogleSignIn"
          class="mt-5 w-80 p-1 ripple ripple-bg-gray-300 shadow phone:h-10 desktop:h-12 hover:bg-blue-300 border border-gray text-black rounded-full">
          <Google class="h-8 mr-2 phone:w-4 tablet:w-8 desktop:w-8 inline rounded-full" />
            <span class="phone:text-[10px] tablet:text-l desktop:text-l">Continue with Google</span>
        </button>
      </div>

      <div>
        <button
          id="gmail"
          @click="GoogleSignIn"
          class="mt-5 w-80 p-1 ripple ripple-bg-gray-300 shadow phone:h-10 desktop:h-12 hover:bg-gray-200 border border-gray-200 text-black font-bold rounded-full">
          <Apple class="mr-3 inline" />
            <span class="phone:text-[10px] tablet:text-l desktop:text-l">Sign up with Apple</span>
        </button>
      </div>
      <!-- <div> -->
        <div class="hr-lines mt-5 w-full ml-[0%]"> <span class="ml-[48%]"> or  </span></div>
      <!-- </div> -->
      <div>
         <h1 class="font-bold mt-2 p-2">
          Already have an account?
         </h1>
      </div>
      <div>
      <button
          id="gmail"
          @click="GoogleSignIn"
          class="mt-5 w-80 p-1 ripple ripple-bg-gray-300 shadow-md phone:h-10 desktop:h-12 bg-blue-400 hover:bg-blue-600 text-white rounded-full">
            <span class="phone:text-[10px] tablet:text-l desktop:text-l">Sign in</span>
        </button>

      </div>
    </div>
  </div>
    </div>
</div>
</template>
<style scoped>
  .hr-lines:before{
  content:"";
  display: block;
  height: 1px;
  width: 43%;
  position: absolute;
  top: 50%;
  left: 0;
  background: rgba(27, 27, 1, 0.142);
}
.hr-lines{
  position: relative;
}
.hr-lines:after{
  content:" ";
  height: 1px;
  width: 43%;
  background: rgba(27, 27, 1, 0.142);
  display: block;
  position: absolute;
  top: 50%;
  right: 0%;
}

  .stage {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 2rem 0;
    margin: 0 -5%;
    overflow: hidden;
  }


/* 
Dots flashing
*/
 
.dot-flashing {
  position: relative;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #9880ff;
  color: #9880ff;
  animation: dotFlashing 1s infinite linear alternate;
  animation-delay: .5s;
}

.dot-flashing::before, .dot-flashing::after {
  content: '';
  display: inline-block;
  position: absolute;
  top: 0;
}

.dot-flashing::before {
  left: -15px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #9880ff;
  color: #9880ff;
  animation: dotFlashing 1s infinite alternate;
  animation-delay: 0s;
}

.dot-flashing::after {
  left: 15px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #9880ff;
  color: #80f9ff;
  animation: dotFlashing 1s infinite alternate;
  animation-delay: 1s;
}

@keyframes dotFlashing {
  0% {
    background-color: #9880ff;
  }
  50%,
  100% {
    background-color: #ebe6ff;
  }
}
</style>
