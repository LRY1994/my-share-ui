import fileMixin from './file.mixin';

export default {
  mixins: [fileMixin],
  data() {
    return {
      fileList: [],

      dfItems: [],
      dfConfig: [{
        editor: ['*'],
        detail: {
          makeDisabled: false,
          makeDisplay: true,
        },
      }, {
        // 文本形式内容保存
        editor: ['input', 'textarea', 'radio'],
        detail: {
          setter: this.plainSetter,
        },
      }, {
        // 文本形式内容保存
        editor: ['filelist'],
        detail: {
          setter: this.fileSetter,
          getter: this.fileGetter,
          getFileList: this.getFileList,
          beforeUpload: this.beforeUpload,
          handleRemove: this.handleRemove,
        },
      }],

      dfValueArr: [],


    };
  },
  methods: {
    // 设置表单项
    setDfItems(res) {
      this.dfItems = this.setField(res.info);
      this.setDfvalue(this.dfValueArr);
      this.fileList = res.fileList;
    },
    // 这些后台没有对应的字段，为了可配置，自己插入进去
    setField(info) {
      const temp = info;
      for (const i of temp.keys()) {
        
        if(temp[i].value) this.params[temp[i].property] = temp[i].value;
        

        switch (temp[i].property) {
          case 'title': {
            temp[i].placeholder = '建议将会公开，切勿输入敏感信息';
            temp[i].isOption = false;
            temp[i].maxLength = '20';
            temp[i].minLength = '4';
            break;
          }
          case 'content': {
            if (!temp[i].value) { // 默认值
              temp[i].value = '【问题描述】\n\n\n【建议方案】\n\n';
              this.addToDfvalue(temp[i]);
            }

            temp[i].isOption = false;
            temp[i].maxLength = '400';
            temp[i].minLength = '15';

            break;
          }
          case 'files': {
            temp[i].note = '允许的文件类型：png，jpg，gif，且不超过3.5MB';
            temp[i].isOption = true;
            break;
          }
          case 'email': {
            if (!temp[i].value) { // 默认值
              temp[i].value = this.userProperty.email;
              this.addToDfvalue(temp[i]);
            }

            temp[i].placeholder = '请输入反馈邮件，以便接收反馈结果';
            temp[i].isOption = false;

            break;
          }
          case 'contactNum': {
            if (!temp[i].value) { // 默认值
              temp[i].value = this.userProperty.phone;
              this.addToDfvalue(temp[i]);
            }
            temp[i].isOption = false;

            break;
          }
          case 'associatedWorkOrder': {
            temp[i].placeholder = '如有，请输入关联工单号';
            temp[i].isOption = true;
            break;
          }

          default: { break; }
        }
      }

      return temp;
    },
    addToDfvalue(obj) {
      debugger
      this.params[obj.property] = obj.value;
      this.dfValueArr.push({
        worksheetInfoId: obj.worksheetInfoId,
        value: obj.value,
      });
    },
    // 设置默认值
    setDfvalue(arr) {
      if (!arr.length) return;
      let str = '';
      for (const ele of arr) {
        str += `${ele.worksheetInfoId},${ele.value};`;
      }
      this.http$.worksheet.userExtendUpdate({
        worksheetId: this.worksheetId,
        param: str,
      });
    },
    // 更新表单项
    updateFormItem({ item, value }) {
      const params = {
        worksheetId: this.worksheetId,
        param: `${item.worksheetInfoId},${value}`,
      };
      return this.http$.worksheet.userExtendUpdate(params);
    },
  },
};
