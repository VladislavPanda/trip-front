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
//import datePicker from 'vue-bootstrap-datetimepicker';

createApp(App)
    .use(store)
    .use(router)
    //.use(datePicker)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount('#app')