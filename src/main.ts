import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import './registerServiceWorker'
import router from './router'
import '@/styles/app.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Paginate from "vuejs-paginate-next";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { faHome, faUser, faHeart } from '@fortawesome/free-solid-svg-icons'

library.add(faUserSecret, faHome, faUser, faHeart)

const pinia = createPinia()


createApp(App).use(router).use(pinia).use(Paginate).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
