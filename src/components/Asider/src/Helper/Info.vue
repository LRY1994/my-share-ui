<template>
  <div class="info-wrapper">
    <div class="icon-tip unclickable">
      <div class="img-block">
        <img src="@/assets/img/asider/ask.png">
      </div>
      <div>
        <div class="title">服务咨询</div>
        <div class="desc highlight">400-810-9889</div>
      </div>
    </div>
    <div class="icon-tip" @click="goTo('/ctyun/aiocc-ocs',true)">
       <div class="img-block">
        <img src="@/assets/img/asider/service.png">
      </div>
      <div>
        <div class="title">智能客服</div>
        <div class="desc">7*24小时不间断售后保障</div>
      </div>

    </div>
    <div class="icon-tip" @click="mounteFeedback">
      <div class="img-block">
        <img src="@/assets/img/asider/advice.png">
      </div>
      <div>
        <div class="title" >建议与反馈</div>
        <div class="desc">天翼云与您共创优质云平台</div>
      </div>
    </div>
  </div>
</template>
<script >
import Feedback from '../Feedback/feedback.js';
export default {
  methods: {
    mounteFeedback(){
      Feedback.init();
    },
    goTo(link, _blank) {
      if (link === undefined || link === '') return;

      if (_blank) {
        window.open(link);
      } else {
        window.location.href = link;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/_var.scss';
.info-wrapper {
  padding: 16px;
  color: #2f2f2f;
  line-height: 16px;

  .strong-title {
    font-size: 16px;
    color: $ct-yellow;
    font-weight: bold;
  }

  .icon-tip {
    margin-top: 20px;
    white-space: nowrap;
    &:hover {
        color: $ct-yellow;
        cursor: pointer;
        .desc {
          color:inherit;
        }
    }
    & > div {
      display: inline-block;
    }

    .img-block {
      margin-right: 17px;
    }

    .title {
      font-size: 14px;
      line-height: 14px;
    }

    .desc {
      font-size: 12px;
      margin-top: 10px;
      line-height: 12px;
      color: #7a7c81;
    }

    .highlight {
      color: $ct-yellow;
    }

    .multiple-line {
      line-height: 20px;
      margin-top: 6px;
    }
  }

  img {
    display: block;
  }

  .unclickable{
    &:hover{
      cursor:default !important;
      .title{
        color: #2f2f2f !important;
      }
    }
  }


}
</style>
