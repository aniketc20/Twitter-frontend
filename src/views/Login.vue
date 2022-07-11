<script setup>
import Bird from '../assets/login/bird.vue';
import Google from '../assets/login/Google.vue';
import Apple from '../assets/login/Apple.vue';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import axios from "axios"
import router from '../router';

const provider = new GoogleAuthProvider()
const url = import.meta.env.VITE_API_URL

async function GoogleSignIn() {
  const auth = getAuth()
  signInWithPopup(auth, provider)
    .then((result) => {
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

<div class="flex">
  <div class="bg-[url('https://abs.twimg.com/sticky/illustrations/lohp_en_1302x955.png')] h-screen w-[40%] flex items-center justify-center">
    <Bird class="md:w-48"/>
  </div>
  <div class="w-[60%] m-6">
    <div class="flex flex-col h-full justify-evenly items-center justify-center">
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
</style>
