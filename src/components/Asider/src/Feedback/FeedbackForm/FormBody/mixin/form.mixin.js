import fileMixin from './file.mixin';

const validateLen = (value,vmin,vmax)=>{
  if(typeof(value)!=='string') return true;
  const max = parseInt(vmax || -1, 10);// -1标志没有最长字符限制
  const min = parseInt(vmin || 0, 10);
  const temp = value.replace(/[\r\n]/g, '');// 不包括换行符的任意字符
  let reg = '';
  if (max === -1) {
    reg = `^[\\s\\S]{${min},}$`;
  } else {
    reg = `^[\\s\\S]{${min},${max}}$`;
  }
  return new RegExp(reg).test(temp)
}
export default {
  mixins:[fileMixin],
  data() {
    return {
      fileList: [],

      dfItems: [],

      dfValueArr: [],

      promiseArr:[],//没有保存成功的表单项

      savedInfo:[]


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
            temp[i].required = true;
            temp[i].err = '';
            temp[i].msg = `标题不少于4个字,不多于20个字`;
            temp[i].maxLength = '20';
            temp[i].minLength = '4';
            break;
          }
          case 'content': {
            if (!temp[i].value) { // 默认值
              temp[i].value = '【问题描述】\n\n\n【建议方案】\n\n';
              this.addToDfvalue(temp[i]);
            }

            temp[i].required = true;
            temp[i].err = '';
            temp[i].msg = `内容不少于15个字,不多于400个字`;
            temp[i].maxLength = '400';
            temp[i].minLength = '15';

            break;
          }
          case 'files': {
            temp[i].note = '允许的文件类型：png，jpg，gif，且不超过3.5MB';
            temp[i].required = false;
            temp[i].err = '';
            break;
          }
          case 'email': {
            if (!temp[i].value) { // 默认值
              temp[i].value = this.userProperty.email;
              this.addToDfvalue(temp[i]);
            }

            temp[i].placeholder = '请输入反馈邮件，以便接收反馈结果';
            temp[i].required = true;
            temp[i].err = '';

            break;
          }
          case 'contactNum': {
            if (!temp[i].value) { // 默认值
              temp[i].value = this.userProperty.phone;
              this.addToDfvalue(temp[i]);
            }
            temp[i].required = true;
            temp[i].err = '';

            break;
          }
          case 'associatedWorkOrder': {
            temp[i].placeholder = '如有，请输入关联工单号';
            temp[i].required = false;
            temp[i].err = '';
            break;
          }

          default: { break; }
        }
      }

      return temp;
    },
    addToDfvalue(obj) {
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
    //blur事件
    handleBlur(item){
      if(this.check(item)){
        const value = this.params[item['property']];
        this.updateFormItem({ item, value })
      }
    },
    // 更新表单项
    updateFormItem({ item, value }) {
      const params = {
        worksheetId: this.worksheetId,
        param: `${item.worksheetInfoId},${value}`,
      };
      this.http$.worksheet.userExtendUpdate(params)
      .then(res=>{
        this.savedInfo = res.info;
        return true
      })
      .catch(()=>{
        return false;
      })
    },
    
    //校验
    check(item){    
      const value = this.params[item['property']];
      if(item.required  && value === ''){
        item.err = `请输入${item.name}`;
        return false;
      }
      if(value){
        if(validateLen( value,item.minLength,item.maxLength )){
          item.err = '';
          return true;
        }else{
          item.err = item.msg;
          return false;
        }	
      }
      return true;
      
    },
  },
};
