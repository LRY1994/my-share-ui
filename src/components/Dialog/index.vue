<template>
<div>
<div class="ct-model-wrapper" :style=" { 'z-index': innerZindex}">
    <div class="ct-modal" :style="{ width: width ,
                                    top:top!== undefined ? top:'50%',
                                    transform:top === undefined?'translateY(-50%)':''
                                  }">
        <div class="ct-model-header"> 

            <span v-if ="title" class="ct-model-header-title">{{title}}</span>  

            <slot name="header" v-else></slot>

            <a class="ct-model-header-close" @click="close">×</a>
        </div>
        <div class="ct-model-body">
          <slot ></slot>
        </div>
        <div class="ct-model-footer">
            <slot name="footer"></slot>
        </div>
    </div>
</div>
<div class="v-modal"  :style=" { 'z-index': outerZindex}"></div>
</div>
</template>

<script>
export default {
  name:'ct-dialog',
    props:{
        title:{
            type:String,
        },
        width:{
            type:String,
            default:'30%'           
        },
        top:{
          type:String,
        },
        innerZindex:{
          type:Number,
          default:2001
        },
        outerZindex:{
          type:Number,
          default:2000
        }
    },
    data(){
      return{
          maxH: window.innerHeight-30,
          top_copy:this.top
      }
    },
  methods: {
    close() {
      this.$emit('before-close');
    },
  },
};
</script>

<style lang="scss" scoped>
@import './style.scss';
.top-50{
  top: 50%;
  transform: translate(-50% -50%)
}

</style>
