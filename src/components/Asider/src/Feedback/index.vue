/**
* @author: linruiyu;
* @date: 2019-3-14;
* @description: 建议反馈提交模块
*/
<template>
  <div>

    <feedback-form v-if="isLoggedIn===true"
    :user-property="userProperty"
    @close="close"></feedback-form>

    <not-login v-if="isLoggedIn===false" 
    @close="close"></not-login>

  </div>
</template>


<script>
import FeedbackForm from './FeedbackForm/index.vue';
import Feedback from './main.js';
import NotLogin from './NotLogin.vue';
export default {
  props:['http$'],
  data() {
    return {
      isLoggedIn: '',
      userProperty: {
        name: '',
        email: '',
        phone: '',
      },
    };
  },
  mounted() {   
    this.getIsLoggedIn();
  },
  components: {
    FeedbackForm,
    NotLogin,
  },
  methods: {
    getIsLoggedIn() {
     this.http$.auth.current().then((res) => {
        this.isLoggedIn = res.isLoggedIn;
        if (res.property) {
          this.userProperty.name = res.property.name;
          this.userProperty.email = res.property.email;
          this.userProperty.phone = res.property.mobile;
        }
      });
    },
    close() {
      Feedback.destroy();
    },
  },
};
</script>
