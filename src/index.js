import { createApp } from 'vue'
import { store } from './_store';
import { router } from './_helpers';
import App from './app/App.vue';
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import Echo from "laravel-echo"
import Pusher from 'pusher-js'

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_WEBSOCKETS_KEY,
    wsHost:import.meta.env.VITE_WEBSOCKETS_SERVER,
    cluster: 'mt1',
    wsPort:6001,
    forceTLS: false,
    disableStats: true
});

const app = createApp(App).use(store).use(router).use(VueSweetalert2)
// setup fake backend

app.mount('#app')