import { createApp } from 'vue'
import Vue3MobileDetection from "vue3-mobile-detection";
import App from './App.vue'

createApp(App)
  .use(Vue3MobileDetection)
  .mount('#app');
