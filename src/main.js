import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
import vue3videoPlay from "vue3-video-play";
import "vue3-video-play/dist/style.css";

const app = createApp(App)
app.use(vue3videoPlay);
app.use(router).mount('#app')
