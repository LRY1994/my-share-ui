import Vue from 'vue';
import CtAsider from './components/Asider/index';

import Message from '@/components/Message/index.js';
import Feedback from './components/Asider/src/Feedback/main.js';
import '@/assets/css/icon.css';

Vue.prototype.$ctmessage = Message;


const components = [
  CtAsider
];

let SELECTOR$= null ;

const install = function (Vue,options) {
  if(options && options.container){  
    SELECTOR$ = options.container ; 
  }
  components.map(component => Vue.component(component.name, component));
};
export { 
  SELECTOR$,
  Feedback
};

export default {
  install,
};
