import Vue from 'vue';
import App from './App.vue';
import router from './router';
// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import store from './store';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
