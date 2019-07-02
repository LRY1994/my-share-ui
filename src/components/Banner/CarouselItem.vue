/**
* @author: linruiyu;
* @date: 2019-6-18;
* @description:
* 图片都作backgroundImage，使用
    {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-position: center;
      background-size: cover;
    }
*/
<template>
<!--动图模式-->
<div v-if="option === 'gif'" style="height:100%">
  <div class="carousel-item-container"
    :class="{'carousel-gif':isActive }"
    :style="{ backgroundColor: this.data.bgColor||'#fff'}"
    @click="goTo(data.href)">
         <!--背景-->
        <div :style="getBackground()" class="carousel-item-bg"> 
             <!--内容-->
                <div class="carousel-main">
                  <div  class="carousel-item-text" :class="{'text-slideIn':isActive }">                 
                      <h4 class="title"     v-html="data.title||''"></h4>
                      <p class="subtitle"   v-html="data.subtitle||''"></p>
                      <span class="button"  v-if="data.note && data.note.trim()" v-html="data.note||''"></span>
                    </div>                                 
                </div>                  
                <div v-if="data.imgDark"  class="dark-img"   :style="{backgroundImage: `url('${getFile(data.imgDark)}')`}"></div>                
                <div v-if="data.imgLight" class="light-img"  :style="{backgroundImage: `url('${getFile(data.imgLight)}')`}"></div>           
        </div>
    </div>
</div>

<!--以前的模式-->
<div v-else  style="height:100%">
    <div class="carousel-item-container"
    :style="{ backgroundColor:this.data.bgColor||'#fff'}"
    :class="{'front-slideIn':isActive && data.textFileId,
             'bg-slideIn'   :isActive && !data.textFileId   }"
    @click="goTo(data.href)">
         <!--背景-->
        <div :style="getBackground()" class="carousel-item-bg"></div> 
        <!--前置文字图-->
        <div v-if="data.textFileId" class="carousel-item-front"  
        :style="{backgroundImage : `url('${getFile(data.textFileId)}')`}"> </div>        
        
    </div>
</div>

</template>

<script>

export default {
  props: {
    data: {
      type: Object,
    },
    isActive: {
      type: Boolean,
    },
  },
  data(){
    return{
      option:''
    }
  },
  methods: {
    getFile(fileId) {
      return `/gw/cms/material/icon/GetByFileId?fileId=${fileId} `;
    },
    getBackground() {
      this.option = this.data.option;
      if(! this.data.bgFileId) return{};
      
      switch (this.option) {
        case 'repeat': return {
          background: `url('${this.getFile(this.data.bgFileId)}') repeat`,
        };
        case 'gif':
        case 'full': return {
          backgroundImage: `url('${this.getFile(this.data.bgFileId)}')`,
        };
        default: return {};
      }
    },
    goTo(link) {
      if (link === undefined || link === '') return;
      window.open(link);
    },
  },
};
</script>

<style lang="scss" >
@import '@/assets/css/mixin/_index.scss';
@import './effect.scss';
.carousel-item-container{
    height: 100%;    
    cursor: pointer;
    .carousel-item-bg{
        height: 100%; 
        @include background-center();
    }
}
/**
* 以前的模式
* 有前景图的时候，背景直接切换，前景图动画
* 没有前景图的时候，背景动画
* 动画效果：从右往左切入
*/
.carousel-item-container{
      .carousel-item-front {
            height: 100%;
            @include background-center();
      }
      &.front-slideIn .carousel-item-front{ @include slide-left-to-right(); }     
      &.bg-slideIn .carousel-item-bg { @include slide-left-to-right(); }
}


/**
* 动图模式
* 文字部分从下往上切入
* 亮图循环更改opcaity
*/

.carousel-item-container{
  &.carousel-gif{ @include  gif();}
  .carousel-main{
    margin-left:12%;
    margin-right: 12%;
    height: 100%;
  
    .carousel-item-text{   
      position: relative;   
      top: 33%;
      text-align: left;
      z-index: 10;
      width:48%;
      &.text-slideIn{ @include slide-bottom-to-up();}
      
      .title{
        font-size: 46px;
        color: #FFFFFF;
        white-space: nowrap;
      }
      .subtitle{
        font-size: 20px;
        color: #FFFFFF;
        margin:8px 0 49px 0;
      }
      .button{
        @include link-more-button-size();
        color: #FFFFFF;
        background-color: #FA8334;
        display: inline-block;
      }
    }
  }
  .light-img,.dark-img{
     @include background-center();
  }
  .light-img{ opacity:0}

}


</style>
