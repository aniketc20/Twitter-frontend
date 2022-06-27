import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
import vue3videoPlay from "vue3-video-play";
import "vue3-video-play/dist/style.css";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import 'vue-universal-modal/dist/index.css'
import VueUniversalModal from 'vue-universal-modal'

const app = createApp(App)
app.use(vue3videoPlay);
app.use(router).mount('#app')
app.use(VueUniversalModal, {
  teleportTarget: '#modals'
})// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvUqsn1erfcQVjSpOtLPkJqUhz5o6t4rg",
  authDomain: "twitter-44ef3.firebaseapp.com",
  projectId: "twitter-44ef3",
  storageBucket: "twitter-44ef3.appspot.com",
  messagingSenderId: "907942685085",
  appId: "1:907942685085:web:e1725e3ca97fd8c5306774",
  measurementId: "G-KFL42C0L9F"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
