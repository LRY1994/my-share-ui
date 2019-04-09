// 后台返回字段
const VALUE = 'value';
const LABEL = 'name';
const PROP = 'property';
const ORDER = 'placeOrder';
const IS_REQUIRED = 'isOption';
const TOOLTIPS = 'note';
const SLOT_NAME = 'property';
const SLOT_EDITOR = 'slot';
const EDITOR = 'editor';
const PLACEHOLDER = 'placeholder';


const WRITEABLE_SCOPES = 'writableScopes';
const DISPLAY_SCOPES = 'visibleScopes';
const OPTIONS = 'parameters';
const VALIDATOR = 'validator';
const MAXLENGTH = 'maxLength';
const MINLENGTH = 'minLength';

// 后台返回的editor对应的组件
const editorDict = {
  check: 'alogic-check',
  daterange: 'alogic-daterange',
  file: 'alogic-file',
  filelist: 'alogic-filelist',
  htmleditor: 'alogic-htmleditor',
  image: 'alogic-image',
  input: 'alogic-input',
  radio: 'alogic-radio',
  select: 'alogic-select',
  textarea: 'alogic-textarea',
  timerange: 'alogic-timerange',
  smallhtml: 'alogic-smallhtml',
};

// 返回表单项的值
const getValue = item => Promise.resolve(item[VALUE]);
// 返回表单项的提示
const getTooltips = item => Promise.resolve(item[TOOLTIPS]);


// 拼接表单项的rule
const makeRules = (item) => {
  const arr = [];
  if (item[IS_REQUIRED] === 'false') {
    arr.push({
      required: true,
      message: `请输入${item[LABEL]}`,
      trigger: 'blur',
    });
  }

  if (item[VALIDATOR]) {
    const validator = (rule, value, callback) => {
      if (value) {
        const p = item[VALIDATOR];
        if (new RegExp(p).test(value)) {
          callback();
        } else {
          callback(new Error(`请输入正确的${item[LABEL]}`));
        }
      } else {
        callback();
      }
    };

    arr.push({
      validator,
      trigger: 'blur',
    });
  }

  if (item[MAXLENGTH] || item[MINLENGTH]) {
    const max = parseInt(item[MAXLENGTH] || -1, 10);// -1标志没有最长字符限制
    const min = parseInt(item[MINLENGTH] || 0, 10);

    const validator2 = (rule, value, callback) => {
      if (value && (typeof value === 'string')) {
        const temp = value.replace(/[\r\n]/g, '');// 不包括换行符的任意字符
        let reg = '';
        if (max === -1) {
          reg = `^[\\s\\S]{${min},}$`;
        } else {
          reg = `^[\\s\\S]{${min},${max}}$`;
        }
        if (new RegExp(reg).test(temp)) {
          callback();
        } else {
          const str1 = `不少于${min}个字`;
          const str2 = `不多于${max}个字`;
          let str = `${item[LABEL]}`;
          if (min > 0) str += str1;
          if (max !== -1) {
            if (min > 0) str += '，';
            str += `${str2}`;
          }
          callback(new Error(str));
        }
      } else {
        callback();
      }
    };

    arr.push({
      validator: validator2,
      trigger: 'blur',
    });
  }

  return Promise.resolve(arr);
};
// 组装option
const makeOptions = (item) => {
  const result = [];
  const p = item[OPTIONS];
  if (p) {
    const tmp = p.split(';');
    tmp.forEach((tmpItem) => {
      result.push({
        label: tmpItem.split('=')[1],
        value: tmpItem.split('=')[0],
      });
    });
  }
  return Promise.resolve(result);
};

// 匹配visiable和writtable
const matchScope = (curr, scopes) => {
  // 形如 '*'
  if (scopes === '*') return true;
  if (!scopes) {
    return true;
  }

  const arr = scopes.split(',');
  const arr2 = curr.split('_');

  // 形如'tenant_new'
  if (arr.indexOf(curr) >= 0) return true;

  // 形如'tenant'或'new'
  for (let i = 0; i < arr2.length; i += 1) {
    if (arr.indexOf(arr2[i]) >= 0) {
      return true;
    }
  }

  return false;
};

// 是否可写
const makeDisabled = currentScope => (item) => {
  const result = matchScope(currentScope, item[WRITEABLE_SCOPES]);
  return Promise.resolve(!result);
};
// 是否可见
const makeDisplay = currentScope => (item) => {
  const result = matchScope(currentScope, item[DISPLAY_SCOPES]);
  return Promise.resolve(result);
};

export { getValue, getTooltips, makeRules, makeOptions, makeDisabled, makeDisplay };

export default {
  keys: {
    VALUE,
    LABEL,
    PROP,
    ORDER,
    IS_REQUIRED,
    TOOLTIPS,
    SLOT_NAME,
    SLOT_EDITOR,
    EDITOR,
    PLACEHOLDER,
    OPTIONS,
  },
  editorConfig: [{
    editor: ['*'],
    detail: {
      getValue,
      getTooltips,
      makeDisabled: makeDisabled(),
      makeRules,
      makeOptions,
      makeDisplay: makeDisplay(),
    },
  }],
  editorDict,
};
