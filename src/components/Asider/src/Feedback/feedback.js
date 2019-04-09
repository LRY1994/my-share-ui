import Vue from 'vue';
import { HTTP$ } from '@/main.js'
import feedbackVue from './index.vue';
let instance;

let feedbackConsturctor = Vue.extend(feedbackVue);


const initInstance = () => {
  const el = document.createElement('div')
  el.id="__feedback_"
  document.body.appendChild(el);
  instance = new feedbackConsturctor({
	  propsData:{
		  http$:HTTP$
	  }
  }).$mount();
  el.appendChild(instance.$el);
};

const init = () => {
	destroy();
	if(!instance){
		initInstance();
	}
}
const destroy = () => {
	if(instance){
		const el = document.querySelector('#__feedback_');
		document.body.removeChild(el);
		instance = null;
	}
}

export default {
	init,
	destroy
}