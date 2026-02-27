import { createApp } from 'vue'
import "./assets/styles.css"
// import "./assets/orange.css"
import './style.css'
import "./assets/icons.style.less"
import App from './App.vue'
import router from './router'

createApp(App).use(createPinia()).use(router).mount('#app')
