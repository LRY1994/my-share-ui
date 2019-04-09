<template>
   <el-dialog
   :visible.sync="dialogVisible"
   :before-close="handleClose"
   class="form-dialog"
   top="0vh"
   >
 
     <div slot="title" class="title">
      <span class="head">建议与反馈</span>
      <span class="account">
          <span>当前登录账号：{{userProperty.name}}</span>
      </span>
    </div>


    <p class="tip">温馨提示：技术支持、系统故障、咨询服务、投诉建议，请提交工单向天翼云客服寻求支持。
      <a href="/ctyun/services-request">立即提交工单</a>
    </p>

    <p class="theme-color" style="text-align:center;margin:14px;">我们正聆听你的声音...</p>


    <form-body :user-property="userProperty" ></form-body>

</el-dialog>
</template>

<script>

import FormBody from './Form.vue';
export default {
  props: {
    userProperty: { type: Object },
  },
  components: {
    FormBody
  },
  data() {
    return {
      dialogVisible: true,
    };
  },

  methods: {
    closeDialog() {
       this.dialogVisible = false;
       this.$emit('close');
    },
    handleClose() {
      this.$confirm('您宝贵的建议还没有提交哦，确定要关闭吗？', {
        confirmButtonText: '确定关闭',
        cancelButtonText: '手快点错了',
      })
        .then(() => {
          this.closeDialog();
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/_var.scss';
 .form-dialog{
   .theme-color{
      color:$ct-yellow;
    }
    .tip{
      font-size: 0.8em;
      background-color:$ct-yellow;
      border-radius: 4px;
      color:#fff;
      padding:8px 5px ;
      a{
        color:inherit;
      }
    }
  /deep/ .el-dialog__body{
    padding-left:50px;
    padding-right: 50px;
    padding-top:0;
  }
  .title{
    .head{
      font-weight: 700;
      font-size: 14px;
    }
    .account{
      float:right;
      font-size:0.8em;
      position:relative;
      right:40px;
      color: #909399;
      top: 4px;
    }
  }
 }
</style>
