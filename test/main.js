import Vue from 'vue';
import http from 'alogic-http';
import HTTP from '@/config/http';
import App from './App.vue';
import CtAsider from '@/components/Asider';
import Message from '@/components/Message/index.js'


Vue.prototype.$ctmessage = Message;

// 测试
Vue.use(http, {
  service: HTTP.SERVICE,
});

Vue.use(CtAsider);

new Vue({
  render: h => h(App),
}).$mount('#app');
