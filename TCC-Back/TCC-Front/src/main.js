import Vue from 'vue'
import './plugins/axios'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import VueSweetalert2 from 'vue-sweetalert2';
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

import 'sweetalert2/dist/sweetalert2.min.css';


Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueSweetalert2);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
