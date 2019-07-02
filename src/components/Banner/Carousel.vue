/** 
in-active : z-index: -1;
active    : z-index: 8;
 */
<template>
  <div class="carousel-list" ref="wrapper">
    <div class="carousel-item"
    v-for="(item,index) in bannerList"
    :key="index"
    :class="{'is-active':currentIndex === index}"
    @mouseover="handleMouseover"
    @mouseout="handleMouseout">
      <carousel-item :data="item"  :is-active="currentIndex === index"></carousel-item>
    </div>
  </div>
</template>

<script type="text/javascript">
import CarouselItem from './CarouselItem.vue';

export default {
  props: {
    bannerList: {
      type: Array,
    },
  },
  components: { CarouselItem },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    handleMouseover() {
      this.$emit('handleMouseover');
    },
    handleMouseout() {
      this.$emit('handleMouseout');
    },
    changeIndex(index) {
      this.currentIndex = index;
    },
    next() {
      if (this.currentIndex < this.bannerList.length - 1) {
        this.currentIndex += 1;
      } else {
        this.currentIndex = 0;
      }
    },
  },
};
</script>

<style lang="scss" >

.carousel-list{
  position: relative;
  text-align: center;
  width: 100%;
  height: 100%;
  .carousel-item {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;

    &.is-active {
      z-index: 8;
    }
  }
}
</style>
