/**
* @author: linruiyu;
* @date: 2019-3-2;
* @description: 建议反馈悬浮块
*              
*/
<template>
    <div class="ct-asider">
      <div class="ct-asider-wrap" :style="{bottom: (documentHeight * 0.2) + 'px'}">

        <!--建议与反馈-->
        <helper></helper>

        <!--广告-->
        <advertise ></advertise>

        <!--回到顶部-->
         <div class="goto-top" @click="gotoTop" :class="{hidden: hidden}">
          <img src="@/assets/img/asider/goto-top.png">
        </div>

      </div>
    </div>
</template>

<script >
import Helper from './Helper/index.vue';
import Advertise from './Advertise/index.vue';
import { SELECTOR$ } from '@/main.js';
export default {
  name: 'CtAsider',
  components: {
    Helper,
    Advertise,
  },
  data() {
    return {
      documentHeight: document.body.clientHeight,
      hidden: true,
      EL$:null
    };
  },
  mounted() {   
    if(SELECTOR$!==null) this.EL$ = document.querySelectorAll(SELECTOR$)[0] || null; 
    window.addEventListener('scroll', this.calcGotoTopHidden, true);
  },

  methods: {
    gotoTop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      if( this.EL$) this.EL$.scrollTop = 0;
    },
    calcGotoTopHidden() {
       let scrollTop;
       if( this.EL$) scrollTop =  this.EL$.scrollTop ;
       else{
         scrollTop = window.pageYOffset || 
                      document.body.scrollTop || 
                      document.documentElement.scrollTop;
       }

      if (scrollTop >= 400) {
        this.hidden = false;
      } else {
        this.hidden = true;
      }
    },
  },

};
</script>

<style lang="scss" scoped>
@import '@/assets/css/_var.scss';
@import './_var.scss';

.ct-asider{
    position: absolute;
    right: #{$sticky-right}px;
    top: 0px;
    width: #{$asider-width}px;
    height: 100%;
    z-index: 20;
    .ct-asider-wrap{
      position: fixed;
        //回到顶部
        .goto-top {
          width: #{$asider-width}px;
          height: #{$asider-width}px;
          margin-top: #{$margin-top}px;
          box-shadow: 0px 8px 18px 1.44px rgba(0, 0, 0, 0.1);
          position: relative;
          background-color: #fff;
          opacity: 1;
          cursor: pointer;
          img {
            cursor: pointer;
            position: relative;
            top: 12px; // 12 = 48/2 - 24/2;
            left: 12px; // 12 = 48/2 - 24/2;
          }

          &.hidden {
            opacity: 0;
          }
        }
    }

}
</style>
