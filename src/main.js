import Vue from 'vue'
import App from './App.vue'
import {BootstrapVue, IconsPlugin} from "bootstrap-vue";

import '@/css/app.scss' // custom css
Vue.config.productionTip = false


Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

let v = new Vue({
  render: h => h(App),
})

v.$mount('#app')