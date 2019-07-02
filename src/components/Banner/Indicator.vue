<template>
  <div class="indicator">
    <div class="indicator-list">
      <div
        v-for="i in length"
        :key="i"
        class="indicator-item"
        @click ="handleClick(i-1)"
        
      >
        <canvas
          :ref="`indicator-bkg-${i-1}`"
          :width="rectWidth"
          :height="rectHeight"
        ></canvas>
        <canvas
          :ref="`indicator-front-${i-1}`"
          :width="rectWidth"
          :height="rectHeight"
        ></canvas>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  props: {
    length: {
      type: Number,
      required: true,
    },
    timeout: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      rectHeight: 4,
      rectWidth:32,
      currentWidth: 0,

      currentIndex: 0,
      timer: null,
     
    };
  },
  mounted() {
    this.init();
    this.playAt(0);
    this.play();
  },
  computed: {
    //requestAnimationFrame一般刷新频率60Hz
    increment(){
      let tmp =  this.rectWidth/this.timeout/60;
      return tmp.toFixed(3) - 0;
    }
  },
  methods: {
    playAt(index) {     
      this.clearFront(this.currentIndex);//清除上一个
      this.currentWidth = 0;
      this.currentIndex = index;
    },
    play() {  
      this.clearFront(this.currentIndex);//没有这一句会有卡顿的感觉

      //当前个绘制
      const canvas = this.$refs[`indicator-front-${this.currentIndex}`][0];    
      this.drawRect(canvas, '#FA8334',  this.currentWidth );
      //递增宽度
      this.currentWidth += this.increment;
      //若宽度到顶了，通知切换图片
      if (this.currentWidth >= this.rectWidth) {
        this.clearFront(this.currentIndex);
        this.currentIndex = (this.currentIndex + 1) % this.length;
        this.currentWidth = 0;
        this.$emit('next');
      }
      this.clearTimer();
      this.timer = requestAnimationFrame(this.play);

    },  
    //前景清空
    clearFront(index) {
      const canvas = this.$refs[`indicator-front-${index}`][0];
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
    }, 



    //画背景
    init() {
      for (let i = 0; i < this.length; i += 1) {
        let el = this.$refs[`indicator-bkg-${i}`][0];
        const context = el.getContext('2d');
        this.drawRect(el, 'rgba(255, 255, 255, 0.3)', this.rectWidth);
        context.save();
      }
    },
  
    //canvas画矩形
    drawRect(el, color, rectWidth) {
      const context = el.getContext('2d');
      context.fillStyle = color;
      context.fillRect(0,0,rectWidth, this.rectHeight);

    },
    //鼠标移入暂停
    pause() {
      this.clearTimer();    
    },
    //鼠标移出恢复
    resume() {
      this.play();
    },
    //清除定时器
    clearTimer(){
      this.timer && window.cancelAnimationFrame(this.timer);    
    },
    //点击事件
    handleClick(index){
      this.$emit('change', index);
      this.playAt(index);
    },

  },

  beforeDestroy() {
     this.clearTimer(); 
  },
};
</script>

<style lang="scss">

.indicator{
  position: absolute;
  bottom: 20px;
  color: #fff;
  text-align: center;
  width: 100%;
  z-index: 10;

  .indicator-item {
    position: relative;
    display: inline-block;
    margin-right: 30px;
    height: 32px;
    width: 32px; 
    cursor: pointer;
    &:last-of-type {  margin-right: 0px; }
    canvas {
      position: absolute;
      bottom: 50%;
      left: 0;   
    }
  }
}
</style>
