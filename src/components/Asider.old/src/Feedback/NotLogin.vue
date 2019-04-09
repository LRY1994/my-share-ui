<template>
 <el-dialog title="建议与反馈"
 :visible.sync="dialogVisible"
 :before-close="close"
 class="dialog"
 width="30%">
   <div class="content">
     <p >我们正聆听你的声音...</p>
     <div class="picture" />
     <p >登录后可以更好跟踪反馈进度！</p>
     <p><a href="/ctyun/signin"><span class="button">前往登录</span></a></p>
   </div>
 </el-dialog>


</template>

<script>
export default {
  data() {
     return {
       dialogVisible: true,
     };
   },
  methods: {
    close() {
        this.dialogVisible = false;
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/_var.scss';
 .dialog{
   /deep/ .el-dialog__body{
     padding-top:0;
   }
  .picture{
    background: url('~@/assets/img/asider/not-login.jpg') no-repeat;
    width:214px;
    height:150px;
    margin:0 auto;
  }
  .content{
    text-align:center;
    .picture{
      background: url('~@/assets/img/asider/not-login.jpg') no-repeat;
      width:214px;
      height:150px;
      margin:0 auto;
    }
    p{
      color:$ct-yellow;
      margin:14px;
      .button{
        background-color:$ct-yellow;
        color:#fff;
        padding: 15px;
        width:180px;
        display: inline-block;
        border-radius: 4px;
        a{
            color: inherit;
            text-decoration: none;
        }
      }
    }
    span:hover{
      cursor: pointer;
    }

  }
 }

</style>
