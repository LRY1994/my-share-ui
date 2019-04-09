import Vue from 'vue';
import feedbackVue from './index.vue';
import { _VUE_ } from '@/main.js';
let instance;

let feedbackConsturctor = Vue.extend(feedbackVue);


const initInstance = () => {
  const el = document.createElement('div')
  el.id="__feedback_"
  document.body.appendChild(el);
//   instance = new feedbackConsturctor().$mount();
   instance = new feedbackConsturctor({
	//！！！依赖库手动挂载的节点的__proto__跟主项目的__proto__不是同一个，会导致断链
	propsData:{
		http$ : _VUE_.prototype.http$
	}}).$mount();
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