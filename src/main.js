import Vue from 'vue';
import HTTP from './config/http';
import alogic_http from 'alogic-http'
import CtAsider from './components/Asider/index';
import CtBanner from './components/Banner/index';
import Message from '@/components/Message/index.js'
import '@/assets/css/icon.css';

let instance = alogic_http.instance;
instance.init({ service :HTTP.SERVICE });
instance.generateServiceFactory();

const HTTP$ = instance.serviceHooks;
let SELECTOR$= null ;

Vue.prototype.$ctmessage = Message;

const components = [
  CtAsider,
  CtBanner,
];

const install = function (Vue,options) {
  if(options && options.container){  
    SELECTOR$ = options.container ; 
  }
  components.map(component => Vue.component(component.name, component));
};
export { HTTP$ ,SELECTOR$};
export default {
  install,
  SERVICE:HTTP.SERVICE,
  CtAsider,
  CtBanner,
};
