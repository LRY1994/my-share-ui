<template>
<div>
<el-form :model="form" ref="form1" class="form" size="mini"
    :rules="rules"
    label-width="123px"
    label-position="left">
        <el-form-item label="请选择类型" prop="wsTypeId">
            <el-radio-group v-model="form.wsTypeId" @change="changeType">
              <el-radio-button v-for="(item,index) in fbTypeList"
              :label="item.wsTypeId"
              :key="index"
              >{{item.name}}</el-radio-button>
            </el-radio-group>
        </el-form-item>
   </el-form>

    <div v-loading="!dfItems.length">
      <dynamic-form v-if="dfItems.length"
        ref="form2" class="form" size="mini"
        label-width="123px"
        :items="dfItems"
        :config="dfConfig">
        <template slot="associatedWorkOrder" slot-scope="{item, form}">
          <associate-ws  v-model="form[item.property]"
          :item="item"
          :worksheet-id="worksheetId"></associate-ws>
        </template>
      </dynamic-form>
    </div>

    <el-form :model="form" ref="form3" class="form" size="mini"
    :rules="rules"
    label-width="123px"
    label-position="left">
        <el-form-item label="请输入验证码：" prop="code" >
          <el-input v-model="form.code" placeholder="请输入验证码"
           style="width:30%"
           @blur="verifyImageCode"
           :class="{'verify-code':code.invalid}"></el-input>
          <img class="img-ver-code" :src="code.url" @click="setCodeUrl" />
          <div v-if="code.invalid" class="el-form-item__error">{{code.err}}</div>
        </el-form-item>
        <el-form-item prop="checked">
          <el-checkbox v-model="form.checked">我已知晓建议内容不允许包含敏感信息。</el-checkbox>
        </el-form-item>
        <el-form-item >
            <el-button type="primary" :disabled="!form.checked" style=" width:100%;"
               @click="validate">提交建议</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
import DynamicForm from '../DynamicForm/index.vue';
import formMixin from './mixin/form.mixin';
import codeMixin from './mixin/code.mixin';
import AssociateWs from './AssociateWs.vue';
import Vue from 'vue'
export default {
  props: {
    userProperty: { type: Object },
  },
  mixins: [formMixin, codeMixin],
  components: {
    DynamicForm,
    AssociateWs,
  },
  data() {
    return {
      http$:this.$root.http$,

      fbTypeList: [],

      worksheetId: '',

      form: {
        wsTypeId: '', // 类型ID
        code: '',
        checked: false,
      },

      rules: {
        wsTypeId: [{ required: true, message: '请选择类型', trigger: 'blur' }],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { validator: this.validateCode, trigger: 'blur' },
        ],
      },
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      await this.getFeedbackTypes();
      this.checkHasDraft();
      this.setCodeUrl();
    },
    // 查看有无草稿
    checkHasDraft() {
      this.http$.worksheet.userListAdvice().then((res) => {
        if (res.isExist === 'true' || res.isExist === true) { // 如果有
          this.form.wsTypeId = res.wsTypeId;
          this.worksheetId = res.worksheetId;
          this.setDfItems(res);
        } else { // 如果没有
          this.form.wsTypeId = this.fbTypeList[0].wsTypeId;// 默认第一种类型
          this.createWorksheet(this.form.wsTypeId);
        }
      });
    },
    // 创建新单子
    createWorksheet(wsTypeId) {
      this.http$.worksheet.userFromAdvice({ wsTypeId }).then((res) => {
        this.worksheetId = res.worksheetId;
        this.setDfItems(res);
      });
    },
    // 获取类型
    getFeedbackTypes() {
      return this.http$ .worksheet.userWorkflowListType({ domain: 'advice' })
        .then((res) => {
          this.fbTypeList = res.list;
        });
    },
    // 更改类型
    changeType(val) {
      this.http$.worksheet.userUpdateAdviceType({
        worksheetId: this.worksheetId,
        wsTypeId: val,
      });
    },
    // 提交工单
    submit() {
      this.http$.worksheet.userFlowSubmit({ worksheetId: this.worksheetId })
        .then(() => {
          this.$message.success('提交成功！');
          setTimeout(() => {
            this.$emit('close');
          }, 3000);
        })
        .catch(() => {
          this.$message.error('提交失败，请稍后重试！');
        });
    },
    // 提交前校验
    async validate() {
      const p1 = await this.verifyImageCode();
      const p2 = this.$refs.form1.validate();
      const p3 = this.$refs.form2.validateAsync()
        .then(res => Promise.resolve(res))
        .catch(err => Promise.reject(err));
      const p4 = this.$refs.form3.validate();

      Promise.all([p1, p2, p3, p4]).then((arr) => {
        const flag = arr.findIndex(value => value === false);
        if (flag < 0) {
          this.submit();
        } else {
          this.$message.error('请按要求填写信息！');
        }
      }).catch(e => console.log(e));
    },
  },
};
</script>

<style lang="scss" scoped>
.form-dialog{
  .form{
    /deep/ .el-radio-group{
      width:100%;
      .el-radio-button{
        width: 33.33%;
        .el-radio-button__inner,{
          width:100%;
        }
      }
    }
    .img-ver-code{
      vertical-align: bottom;
      padding-left: 10px;
    }
  }
  .verify-code{
      /deep/ .el-input__inner{
        border-color:#f56c6c !important;
      }
    }
}
</style>
