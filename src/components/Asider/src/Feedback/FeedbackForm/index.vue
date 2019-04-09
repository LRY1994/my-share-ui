<template>
<div>
  <ct-dialog 
  class="fb-dialog"
  width="50%" 
  top="0"
  @before-close="dialogVisible = true">
  <template v-slot:header>
      <div  class="title">
        <span class="head">建议与反馈</span>
        <span class="account">
            <span>当前登录账号：{{userProperty.name}}</span>
        </span>
      </div>
  </template>

      <p class="tip">温馨提示：技术支持、系统故障、咨询服务、投诉建议，请提交工单向天翼云客服寻求支持。
        <a href="/ctyun/services-request">立即提交工单</a>
      </p>

      <p class="theme-color" style="text-align:center;margin:14px;">我们正聆听你的声音...</p>


      <form-body :user-property="userProperty" @close="closeDialog"></form-body>

  </ct-dialog>

  <!--关闭提示-->
  <ct-dialog v-show="dialogVisible" 
  :innerZindex="2002"
  :outerZindex="2001"
  @before-close="dialogVisible=false">
    <div style="margin-bottom:20px;">您宝贵的建议还没有提交哦，确定要关闭吗？</div>
    <template v-slot:footer>
      <span class="ct-button blank" @click="dialogVisible=false">手快点错了</span>
      <span class="ct-button" @click="closeDialog">确定关闭</span>
    </template>

  </ct-dialog>
</div>
</template>

<script>
import CtDialog from '@/components/Dialog/index.vue';
import FormBody from './FormBody/index.vue';
export default {
  props: {
    userProperty: { type: Object },
  },
  components: {
    FormBody,CtDialog
  },
  data() {
    return {
      http$:this.$root.http$,
      dialogVisible: false,
    };
  },

  methods: {
    closeDialog() {
       this.dialogVisible = false;
       this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/_var.scss';
.fb-dialog /deep/ .ct-model-body{
      padding-bottom: 30px;
      padding-left:50px;
      padding-right:50px;
    
}   
   .theme-color{
      color:$ct-yellow;
    }
    .tip{
      font-size: 11px;
      background-color:$ct-yellow;
      border-radius: 4px;
      color:#fff;
      padding:8px 5px ;
      a{
        color:inherit;
      }
    }

  .title{
    .head{
      font-weight: 700;
      font-size: 14px;
    }
    .account{
      float:right;
      font-size:12px;
      position:relative;
      right:40px;
      color: #909399;
      top: 4px;
    }
  }

//提交按钮
.ct-button{
    width:90px;
    font-size: 12px;
    background-color:$ct-yellow;
    border-color: $ct-yellow;
    color: #fff;
    border-radius:4px;
    padding: 7px 15px;
    box-sizing: border-box;
    cursor: pointer;
    display: inline-block;
    font-weight: 500;
    line-height: 20px;
    margin: 0;
    outline: none;
    text-align: center;
    transition: .1s;
    white-space: nowrap;
    margin:0 5px;
}
.blank{
  background: #fff;
  border:1px solid #dcdfe6;
  color:#606266;
}

</style>
