<template>
  <div>
    <el-form  v-if="done" :size="size"
      class="my-form"
      :model="form"
      ref="form"
      :label-width="labelWidth"
      label-position="left">
      <template v-for="(item,index) in sortedItems" >
        <slot v-if="item.editor == KEYS.SLOT_EDITOR"
          :name="item[KEYS.SLOT_NAME]"
          :item="item"
          :form="form"></slot>

        <component v-else  :key="index"
          v-model="form[item[KEYS.PROP]]"
          :is="basic.editorDict[item[KEYS.EDITOR]] || item[KEYS.EDITOR]"
          :item="item"
          :config="configForEditor[item[KEYS.EDITOR]]"
          :ref="item[KEYS.PROP]">

          <div v-if="item[KEYS.TOOLTIPS]"
          v-html="item[KEYS.TOOLTIPS]"
          class="tooltips"></div>


        </component>
      </template>
    </el-form>
  </div>
</template>

<script>
import base from './base';

const KEYS = base.keys;
const editors = {};

function importAll(r) {
  r.keys().forEach((key) => {
    const editComp = r(key).default;
    editors[editComp.name] = editComp;
  });
}

importAll(require.context('./editor', true, /index.vue$/));

export default {
  name: 'dynamic-form',
  props: {
    items: {
      required: true,
      type: Array,
    },
    config: {
      type: Array,
      default: () => [],
    },
    basic: {
      type: Object,
      default: () => base,
    },
    size: {
      type: String,
      default: () => 'medium',
    },
    labelWidth: {
      type: String,
      default: () => '150px',
    },
  },
  data() {
    return {
      dialogVisible: false,
      sortedItems: [],
      form: {},
      configForEditor: null,
      savingItemArr: [],
      done: false,

      KEYS: base.keys,
    };
  },
  components: editors,
  created() {
    this.configForEditor = this.calcConfigForEditor();
    if (this.items) {
      this.sortedItems = this.sortItem();
      this.initFormModel();
    }
    this.done = true;
  },
  methods: {
    // 检查表单项是否都符合rules
    validateRules() {
      const p = new Promise((resolve) => {
        this.$refs.form.validate((valid) => {
          resolve(valid);
        });
      });

      return p;
    },
    // 检查表单项是否都保存了值
    checkAllPromise() {
      const promiseArr = [];
      this.savingItemArr = [];

      Object.keys(this.form).forEach((prop) => {
        if (this.$refs[prop] && this.$refs[prop].getSavePromise) {
          const promise = this.$refs[prop].getSavePromise();

          if (promise) {
            this.savingItemArr.push(this.getLabel(prop));
            promiseArr.push(promise);
          }
        }
      });

      if (promiseArr.length > 0) {
        this.dialogVisible = true;
      }

      return Promise.all(promiseArr).then((arrResult) => {
        this.dialogVisible = false;
        const result = arrResult.reduce((accumulator, currentValue) => (accumulator && currentValue), true);
        return result;
      }, () => {
        this.dialogVisible = false;
        this.$message.error('内容保存错误，请重试');
        return false;
      });
    },
    // 检查是否符合rules和是否保存了值
    async validateAsync() {
      let result = false;
      const valid = await this.validateRules();

      if (valid) {
        result = this.checkAllPromise().then(checkResult => checkResult, () => false);
      } else {
        this.$message.error('请按要求填写信息');
      }

      return result;
    },
    // form[property]=''
    initFormModel() {
      this.items.forEach((item) => {
        // 这里需要用$set，否则监听不到属性变化
        this.$set(this.form, item[KEYS.PROP], '');
      });
    },

    // 合并自定义config和默认config
    calcConfigForEditor() {
      // 针对所有的editor都有配置
      const result = initEditorConfig(this.basic.editorDict);

      // 基于base进行修改
      const allConfig = [...this.basic.editorConfig, ...this.config];
      allConfig.forEach((item) => {
        Object.keys(result).forEach((e) => {
          if (item.editor.indexOf('*') >= 0 || item.editor.indexOf(e) >= 0) {
            result[e] = Object.assign({}, result[e], item.detail);
          }
        });
      });
      return result;

      // editor[name]=comp
      function initEditorConfig(dict) {
        const map = {};

        Object.keys(dict).forEach((key) => {
          map[key] = {};
        });

        return map;
      }
    },
    // 根据placeOrder排序
    sortItem() {
      const result = [...this.items];
      result.sort((a, b) => (parseInt(a[KEYS.ORDER], 10)
          - parseInt(b[KEYS.ORDER], 10)));
      return result;
    },
  },

  watch: {
    items: {
      handler(val) {
        if (val) {
          this.sortedItems = this.sortItem();
        }
      },
      deep: true,
    },
    config: {
      handler(val) {
        if (val && val.length > 0) {
          this.configForEditor = this.calcConfigForEditor();
        }
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
  .tooltips {
    color: #bbb;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: relative;
  }

  .div-for-focus {
    height: 0px;
  }
</style>

<style type="text/css" scoped>
  .my-form>>>.el-form-item__error {
    background: #fff;
    width: 100%;
  }
</style>
