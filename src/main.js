import Vue from 'vue';
import App from './App.vue';
import output from './function';
import { data, secondData } from './data';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

output(data);
output(secondData);
