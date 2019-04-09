/**
* @author: linruiyu;
* @date: 2019-3-14;
* @description: 幻灯片item
*/
<template>
    <div class="carousel-item-container"
    :style="{backgroundColor:this.data.bgColor}"
    :class="{'front-animation':isActive && data.textFileId,
             'bg-animation'   :isActive && !data.textFileId   }"
    @click="goTo(data.href)">
         <!--背景-->
        <div :style="getBackground()" class="carousel-item-bg">
            <!--前置文字图-->
            <div v-if="data.textFileId" class="carousel-item-front">
                <img :src="getFile(data.textFileId)"/>
            </div>
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
  methods: {
    getFile(fileId) {
      return `/gw/cms/material/icon/GetByFileId?fileId=${fileId} `;
    },
    getBackground() {
      switch (this.data.option) {
        case 'repeat': return {
          background: `url(${this.getFile(this.data.bgFileId)}) repeat`,
        };
        case 'full': return {
          background: `url(${this.getFile(this.data.bgFileId)}) no-repeat center center`,
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

<style lang="scss" scoped>
.carousel-item-container{
    height: 100%;
    .carousel-item-bg{
        height: 100%;
        &:hover{
            cursor: pointer;
        }

        .carousel-item-front {
            height: 100%;
            width:1170px;
            margin: 0 auto;
            z-index: 0;
            img {
                width: 100%;
            }
        }
    }
}
//有前景图的时候，背景直接切换，前景图动画
.front-animation{
    .carousel-item-front{
        animation: text-slide .8s cubic-bezier(.4,0,.2,1) 0s 1;
    }
}
//没有前景图的时候，背景动画
.bg-animation{
    .carousel-item-bg{
        animation: text-slide .8s cubic-bezier(.4,0,.2,1) 0s 1;
    }
}


@keyframes text-slide {
    0% {
        opacity: 0;
        transform: translate3d(20px,0,0)
    }

    to {
        opacity: 1;
        transform: translateZ(0)
    }
}
</style>
