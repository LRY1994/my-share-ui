/**
* @author: xuzhongyong;
* @date: 2019-3-14;
* @description: 转动的小圆圈
*/
<template>
  <div class="indicator">
    <div class="indicator-list">
      <div
        v-for="i in length"
        :key="i"
        class="indicator-item"
        :style="{width: radius * 2 + 'px', height: radius * 2 + 'px'}"
      >
        <canvas
          :ref="`indicator-bkg-${i}`"
          :width="radius * 2"
          :height="radius * 2"
        ></canvas>
        <canvas
          :ref="`indicator-front-${i}`"
          :width="radius * 2"
          :height="radius * 2"
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
    increment: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      radius: 12,
      lineWidth: 4,
      currentIndex: 0,
      animateObjDict: null,
      currentAngle: 0,
    };
  },
  mounted() {
    this.initCanvasList();
    this.startDrawFromIndex(0);
  },
  methods: {
    initCanvasList() {
      for (let i = 0; i < this.length; i += 1) {
        this.initCanvas(this.$refs[`indicator-bkg-${i + 1}`][0]);
        this.initCanvasListener(this.$refs[`indicator-front-${i + 1}`][0], i);
      }
    },
    initCanvasListener(el, index) {
      el.addEventListener('click', () => {
        this.$emit('change', index);
        this.startDrawFromIndex(index);
      }, false);
    },
    initCanvas(el) {
      const context = el.getContext('2d');
      this.drawCircle(el, 'rgba(255, 255, 255, 0.3)', (Math.PI / 180) * 0, (Math.PI / 180) * 360);
      context.save();
    },
    drawCircle(el, color, beginRadian, endRadian) {
      const context = el.getContext('2d');
      context.beginPath();
      context.strokeStyle = color;
      context.lineCap = 'round';
      context.lineWidth = this.lineWidth;
      context.arc(
        this.radius, this.radius, this.radius - (this.lineWidth / 2), beginRadian + (Math.PI / 2),
        endRadian + (Math.PI / 2), false,
      );
      context.stroke();
      context.closePath();
    },
    draw() {
      const canvas = this.$refs[`indicator-front-${this.currentIndex + 1}`][0];
      this.clearFrontCanvas(this.currentIndex);
      this.drawCircle(canvas, '#fff', 0, (this.currentAngle * Math.PI) / 180);

      this.animateObjDict = requestAnimationFrame(this.draw);

      this.currentAngle += this.increment;

      if (this.currentAngle >= 360) {
        this.clearFrontCanvas(this.currentIndex);
        this.currentIndex = (this.currentIndex + 1) % this.length;
        this.currentAngle = 0;
        this.$emit('next');
      }
    },
    clearFrontCanvas(index) {
      const canvas = this.$refs[`indicator-front-${index + 1}`][0];
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
    },
    startDrawFromIndex(index) {
      if (this.animateObjDict) {
        window.cancelAnimationFrame(this.animateObjDict);
      }
      this.clearFrontCanvas(this.currentIndex);
      this.currentAngle = 0;
      this.currentIndex = index;
      this.draw();
    },
    pause() {
      if (this.animateObjDict) {
        window.cancelAnimationFrame(this.animateObjDict);
      }
    },
    resume() {
      this.draw();
    },
  },

  beforeDestroy() {
    if (this.animateObjDict) {
      window.cancelAnimationFrame(this.animateObjDict);
    }
  },
};
</script>

<style lang="scss" scoped>

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
    height: 24px;
    width: 24px;

    &:last-of-type {
      margin-right: 0px;
    }

    canvas {
      position: absolute;
      top: 0;
      left: 0;
      cursor: pointer;
    }
  }
}
</style>
