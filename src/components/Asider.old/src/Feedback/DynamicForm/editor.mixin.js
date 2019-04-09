export default {
  props: ['item'],
  data() {
    return {
      model: null,
      disabled: false,
      rules: [{}],
      display: true,
      formItemRef: 'form-item-ref',
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getValue();// 获取model
      this.initWithoutValue();// 获取disabled、rules、display
    },
    initWithoutValue() {
      this.getDisabled();
      this.getRules();
      this.getDisplay();
    },
    emitChange(value) {
      // 此处用于通知上级form修改，用于上级form的validateAsync方法.
      this.$emit('input', value);
    },
    /** slot的时候需要定义下面这些方法 */
    getValue() {
      // 您需要在外部重写此方法, 用于初始化值，并且将初始化的值通过input事件通知到上级form
    },
    getDisabled() {
      // 您需要在外部重写此方法, 用于初始化本表单是否disabled
    },
    getDisplay() {
      // 您需要在外部重写此方法, 用于初始化本表单是否显示
    },
    getRules() {
      // 您需要在外部重写此方法, 用于初始化本表单的校验规则
    },
    getSavePromise() {
      // 用于异步保存数据，获取其promise，由上级form使用判断是否保存完毕
    },
  },
};
