<template>
      <div class="ct-asider-help">
        <div class="img">
          <img src="@/assets/img/asider/feedback.png">
        </div>
        <div class="desc">服务<span class="dot"></span>建议</div>
        <div class="info-panel-wrapper">
          <div class="info-panel">
            <info></info>
          </div>
        </div>
      </div>


</template>

<script>
import Info from './Info.vue';

export default {
  components: {
    Info,
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/_var.scss';
@import '../_var.scss';


  .ct-asider-help {
    height: #{$helper-height}px;
    width: #{$asider-width}px;
    box-shadow: 0px 8px 18px 1.44px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    cursor: pointer;

    .img {
      width: 100%;
      height: #{$asider-width}px;
      background-color: $ct-yellow;

      img {
        position: relative;
        top: 11px; //11 = 48/2 - 26/2
        left: 11px; // 11 = 48/2 - 26/2
      }
    }

    .desc {
      height: #{$helper-height - $asider-width}px;
      writing-mode: vertical-rl;
      text-orientation: upright;
      font-size: 14px;
      line-height: 48px;
      text-align: center;
      color: #2f2f2f;

      .dot {
        display: inline-block;
        width: 4px;
        height: 4px;
        border-radius: 2px;
        background-color: #2f2f2f;
        margin-top: 8px;
        margin-bottom: 8px;
      }
    }

    .info-panel-wrapper {
      width: 306px;
      height: 220px;
      position: absolute;
      right: 48px;
      padding-right: 20px;
      top: #{($helper-height + $margin-top + $asider-width) / 2 - 289/2}px;
      transition: visibility 0s, opacity 0.2s ease-in-out;
      opacity: 0;
      z-index: -1;
      visibility: hidden;
      cursor: default;
      .info-panel {
        background-color: #fff;
        box-shadow: 0px 12px 24px 0px rgba(0, 0, 0, 0.1);
        width: 100%;
        height: 100%;
      }
    }

    &:hover {
      .info-panel-wrapper {
        opacity: 1;
        visibility: visible;
      }
    }
  }


</style>
