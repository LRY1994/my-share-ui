/**
* @author: linruiyu;
* @date: 2019-3-14;
* @description: 幻灯片
*/
<template>
  <div class="carousel" >
    <carousel ref="carousel"
      :banner-height="bannerHeight"
      :banner-list="bannerList"
      @handleMouseover="handleMouseover"
      @handleMouseout="handleMouseout"
    >
    </carousel>
    <!--多于1个才显示圆圈-->
    <indicator ref="indicator"
      v-if="bannerList.length>1"
      :length="bannerList.length"
      :increment="increment"
      @change="handleIndicatorChange"
      @next="handleIndicatorNext">
    </indicator>

  </div>
</template>

<script type="text/javascript">
import Indicator from './Indicator.vue';
import Carousel from './Carousel.vue';

export default {
  name: 'CtBanner',
  props: {
    bannerHeight: {
      type: Number,
      default: () => 560,
    },
    increment: {
      type: Number,
      default: () => 1.5,
    },
    bannerList: {
      type: Array,
      required: true,
    },
  },
  components: {
    Indicator, Carousel,
  },

  methods: {
    // 鼠标移入，暂停
    handleMouseover() {
      if (this.bannerList.length === 0) return;
      if (this.$refs.indicator) this.$refs.indicator.pause();
    },
    // 鼠标移出，继续
    handleMouseout() {
      if (this.bannerList.length === 0) return;
      if (this.$refs.indicator) this.$refs.indicator.resume();
    },
    // 点击圆圈切换对应的幻灯片
    handleIndicatorChange(index) {
      if (this.$refs.carousel) this.$refs.carousel.changeIndex(index);
    },
    // 切换到下一张
    handleIndicatorNext() {
      if (this.$refs.carousel) this.$refs.carousel.next();
    },
  },
};
</script>

<style lang="scss" scoped>
.carousel{
  position: relative;
}
</style>
