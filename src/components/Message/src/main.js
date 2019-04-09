import Vue from 'vue';
import Main from './main.vue';

let MessageConstructor = Vue.extend(Main);

let instance;

const Message = function(options) {
  options = options || {};
  if (typeof options === 'string') {
    options = {
      message: options
    };
  }
 
  instance = new MessageConstructor({
    data: options
  }).$mount();
  document.body.appendChild(instance.$el);
};
['success', 'warning', 'info', 'error'].forEach(type => {
  Message[type] = options => {
    if (typeof options === 'string') {
      options = {
        message: options
      };
    }
    options.type = type;
    return Message(options);
  };
});


export default Message;
