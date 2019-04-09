<template>
  <transition name="fade">
    <div 
    :class="[
        'ct-message',
         type  ? `ct-message--${ type }` : 'ct-message--info',
      ]">
      <i :class="typeClass" ></i>{{message}}
    </div>
    
  </transition>
</template>

<script >
  export default {
    data() {
      return {
        message: '',
        type:'',
        duration: 3000,
        timer: null,
      };
    },
    
    computed: {
      typeClass() {
        let type = this.type||'info';
        return  `el-icon-${type}`
      }
    },
    methods: {
      destroyElement() {
        this.$destroy(true);
        this.$el.parentNode.removeChild(this.$el);
      },

      clearTimer() {
        clearTimeout(this.timer);
      },

      startTimer() {
        if (this.duration > 0) {
          this.timer = setTimeout(() => {
           
              this.destroyElement();
            
          }, this.duration);
        }
      },
    },
    mounted() {
      this.startTimer();
    },
    beforeDestroy() {
      this.clearTimer();
    }
  };
</script>

<style lang="scss" scoped>

.fade-enter-active, 
.fade-leave-active {
  transition: all 1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -100%);
}
.ct-message{
  position: fixed;
  min-width:200px;
  top:20px;
  left:50%;
  transform: translateX(-50%);
  border-radius:4px;
  z-index:2019;
  padding: 15px 20px;
  i{
    padding-right:10px;
  }
}
.ct-message--error {
  background-color: #fef0f0;
  border-color: #fde2e2;
  color: #f56c6c;
}

.ct-message--info {
  border-color:#ebeef5;
  background-color:#edf2fc;
  color:#909399
}

.ct-message--success{
  background-color:#f0f9eb;
  border-color:#e1f3d8;
  color:#67c23a;
}
    
.ct-message--warning{
  background-color:#fdf6ec;
  border-color:#faecd8;
  color:#e6a23c;
}


</style>