import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"
import { FontAwesomeIcon } from './plugins/font-awesome'
import axios from 'axios'
import Paginate from 'vuejs-paginate'
import "./assets/dist/css/adminlte.css"
import { Bar } from 'vue-chartjs'
import { Pie } from 'vue-chartjs'
/*import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primevue/resources/themes/saga-blue/theme.css';*/

createApp(App)
    .use(store)
    .use(router)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount('#app')