<template>
<div v-if="dfItems.length && worksheetId">
    <div class="ct-form-item">  
        <label class="ct-form-item-label required">请选择类型:</label>
        <div class="ct-form-item-content">
            <div class="ct-radio-group">
                <label class="ct-radio-button" 
                  v-for="(item,index) in fbTypeList" 
                  :key="index" 
                  :class="{'is-active':form.wsTypeId === item.wsTypeId}">
                      <input type="radio" class="ct-radio-button__orig-radio" 
                      :value="item.wsTypeId"
                      v-model="form.wsTypeId">
                      <span class="ct-radio-button__inner">{{item.name}}</span>
                </label>
            </div>
        </div>
    </div>

    <div class="ct-form-item" v-for="(item, index) in dfItems" :key="index">
            <label class="ct-form-item-label"
            :class="{'required': item.required}">
                {{item.name}}
            </label>
            <div class="ct-form-item-content">
              <input  type="text" 
                        v-if="item.editor === 'input'" 
                        v-model.trim="params[item.property]" 
                        :placeholder="item.placeholder"
                         @blur="handleBlur(item)"
                        :class="{'error': !!item.err}"                        
                        />              

                <textarea 
                        v-if="item.editor === 'textarea'" 
                        v-model.trim="params[item.property]" 
                         :placeholder="item.placeholder"
                        @blur="handleBlur(item)"
                        :class="{'error': !!item.err}"
                        >
                </textarea>

                <template v-if="item.editor === 'filelist'">
                  <label  class="ct-input-file" >
                    <input type="file" class="ct-file__orig-input" @change="uploadFile"/>
                    <span class="ct-file__inner">
                      <span  class="ct-button" style="padding:10px"> 选择附件</span>
                      {{item.note}}
                      </span>
                  </label>
                  <span class="err" style="position: relative;">{{file_error}}</span> 
                  <file-list :file-list="fileList" 
                            :worksheetId="worksheetId" 
                            @remove-done="removeDone"></file-list>

                </template>
                 
                <span class="err">{{item.err}}</span>
            </div>
    </div>

    <div class="ct-form-item">  
        <label class="ct-form-item-label required">请输入验证码:</label>
        <div class="ct-form-item-content">
            <input type="text" 
            v-model="form.code" 
            @blur="verifyImageCode"             
            :class="{'error': code.invalid}"
            style="width:200px"/>
             <img class="img-ver-code" :src="code.url" @click="setCodeUrl" />
             <div v-if="code.invalid" class="err">{{code.err}}</div>
        </div>
    </div>

    <div class="ct-form-item">  
        <label class="ct-form-item-label"></label>
        <div class="ct-form-item-content">
            <input type="checkbox" id="__checkbox__" v-model="form.checked">           
            <label  for="__checkbox__"></label >
            <span @click="form.checked=!form.checked">我已知晓建议内容不允许包含敏感信息。</span>
        </div>
    </div>

    <div class="ct-form-item">  
        <label class="ct-form-item-label"></label>
        <div class="ct-form-item-content">
           <span @click="validate" class="ct-button"
           :class="{'ct-button-disabled':!form.checked}"> 提交建议</span>
        </div>
    </div>

</div>
</template>

<script>
import formMixin from './mixin/form.mixin';
import codeMixin from './mixin/code.mixin';
import FileList from './FileList.vue';

export default {
  props: {
    userProperty: { type: Object },
  },
  mixins: [formMixin, codeMixin],
  components: {
    FileList
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
      //接口获取的表单项
      params:{
        title:'',
        content:'',
        files:[],
        email:'',
        contactNum:'',
        associatedWorkOrder:''
      },

      messageTxt:''
    };
  },
  watch: {
　　'form.wsTypeId'(newValue, oldValue) {
      if(this.worksheetId){
        　this.changeType(newValue);
      }　　
　　}
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
          this.savedInfo = res.info;
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
        this.savedInfo = res.info;
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
    // 提交前校验
    async validate() {
      let v1 =  this.dfItems.map((formItem) => this.check(formItem)).every(item => item === true);
      let v2 = this.verifyImageCode();//验证码
      let v3 = this.form.checked;

      let result = v1 && v2 && v3 ;
      if(result){
        this.beforeSubmit();
      }
    },
   //检查是否都保存了
   beforeSubmit(){
     let str="";
     this.savedInfo.forEach((item)=>{
       if(item.editor!=='filelist'){
         const nowVal = this.params[item.property];
          if(nowVal!=='' && item.value !== nowVal){
             str += `${item.worksheetInfoId},${nowVal};`;
          }
       }      
     });
     if(str===''){
        this.submit();
     }else{
       this.http$.worksheet.userExtendUpdate({
        worksheetId: this.worksheetId,
        param: str,
      }).then(res=>{
        this.submit();
      });
     }
   },
    // 提交工单
    submit() {
      this.http$.worksheet.userFlowSubmit({ worksheetId: this.worksheetId })
        .then(() => {
          this.$ctmessage.success('提交成功！');
          setTimeout(() => {
            this.$emit('close');
          }, 3000);
        })
        .catch(() => {
          this.$ctmessage.error('提交失败，请稍后重试！');
        });
    },
    
  },
};
</script>

<style lang="scss" scoped>
@import './style.scss';
.img-ver-code{
    vertical-align: top;
    padding-left: 10px;
  }

</style>
