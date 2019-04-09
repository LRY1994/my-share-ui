import AsyncValidator from 'async-validator';
import mixin from '../editor.mixin';
import base from '../base';

const KEYS = base.keys;
export default {
  props: ['config', 'item'],
  mixins: [mixin],
  data() {
    return {
      modelPromiseMap: new Map(), // 每次bulr保存更新后的promise
      savedModel: null, // 数据库保存的值
      hasChanged: false,
      saving: false,


      label: this.item[KEYS.LABEL],
      prop: this.item[KEYS.PROP],
      placeholder: this.item[KEYS.PLACEHOLDER] || `请输入${this.item[KEYS.LABEL]}`,

      KEYS: base.keys,
    };
  },
  computed: {
    params() {
      return {
        item: this.item,
        value: this.model,
      };
    },
  },
  methods: {
    /** ********获取model\disabled\rules\************** */
    getValue() {
      this.config.getValue(this.item).then((data) => {
        this.model = data;
        this.savedModel = data;

        // 手动触发change事件，通知上级form
        this.emitChange(data);
      });
    },
    getDisabled() {
      // 支持布尔类型
      if (typeof this.config.makeDisabled === 'boolean') {
        this.disabled = this.config.makeDisabled;
      } else {
        this.config.makeDisabled(this.item).then((data) => {
          this.disabled = data;
        });
      }
    },
    getRules() {
      this.config.makeRules(this.item).then((data) => {
        this.rules = data;
      });
    },
    getDisplay() {
      // 支持布尔类型
      if (typeof this.config.makeDisplay === 'boolean') {
        this.display = this.config.makeDisplay;
      } else {
        this.config.makeDisplay(this.item).then((data) => {
          this.display = data;
        });
      }
    },
    /** *** 保存****** */
    handleChange() {
      this.emitChange(this.model);
    },
    handleBlur() {
      this.emitChange(this.model);
      this.$emit('blur', this.model);
      this.$refs[this.formItemRef].validate('blur');

      if (this.isNeedToSave()) {
        this.validateRules().then((valid) => {
          if (valid) {
            const promise = this.createSavePromise();
            this.modelPromiseMap.set(this.model, promise);
          }
        });
      }
    },

    /** *** 校验****** */
    isNeedToSave() {
      let result = false;
      if ((this.model || this.model === '') && (this.model !== this.savedModel)) {
        result = true;
      }
      return result;
    },
    // 执行保存操作，返回保存结果的promise
    async createSavePromise() {
      const modelToBeSaved = this.model;
      this.saving = true;// 开始保存
      const result = await this.config.setter(this.params).then(() => {
        // 保存成功
        this.saving = false;
        if (this.config.setterCallback) {
          this.config.setterCallback(this.item);
        }

        this.savedModel = modelToBeSaved;

        if (this.$refs[this.formItemRef]) {
          this.$refs[this.formItemRef].clearValidate();
        }
        return true;
      }, () => {
        // 保存失败
        this.saving = false;
        this.$message.error(`保存${this.label}失败，请重试!`);
        this.modelPromiseMap.delete(this.model);// 保存失败的话就删掉promise
        throw new Error(`保存${this.label}失败，请重试!`);
      });

      return result;
    },
    getSavePromise() {
      let result = null;
      if (this.modelPromiseMap.has(this.model)) {
        result = this.modelPromiseMap.get(this.model);
      } else if (this.isNeedToSave()) { // 再次尝试保存
        const promise = this.createSavePromise();
        this.modelPromiseMap.set(this.model, promise);
        result = promise;
      }

      return result;
    },
    // 校验这个表单项的rules
    validateRules() {
      const descriptor = {};
      const rules = [];
      if (this.rules && this.rules.length > 0) {
        this.rules.forEach((rule) => {
          const tmp = {};
          Object.keys(rule).forEach((key) => {
            if (key !== 'trigger') {
              tmp[key] = rule[key];
            }
          });
          rules.push(tmp);
        });
      } else {
        return Promise.resolve(true);
      }
      descriptor[this.prop] = rules;

      const validator = new AsyncValidator(descriptor);
      const model = {};
      model[this.prop] = this.model;

      const p = new Promise((resolve, reject) => {
        validator.validate(model, {
          firstFields: true,
        }, (errors) => {
          try {
            resolve(!errors);
          } catch (err) {
            reject(err);
          }
        });
      });

      return p;
    },
  },
  watch: {
    config: {
      handler() {
        this.initWithoutValue();
      },
      deep: true,
    },
    model(val) {
      if (this.savedModel !== val) {
        this.hasChanged = true;
      } else {
        this.hasChanged = false;
      }
    },
    savedModel(val) {
      if (val === this.model) {
        this.hasChanged = false;
      } else {
        this.hasChanged = true;
      }
    },
  },
};
