export default {
  data() {
    return {
      code: {
        url: '',
        invalid: '',
        err: '',
      },
    };
  },
  methods: {
    // 获取验证码
    setCodeUrl() {
      this.form.code = '';
      this.code.url = `/gw/user/ImageCode?loginId=${this.userProperty.email}&ramdom=${Math.random()}`;
    },
    // 验证验证码
    verifyImageCode() {
      if (this.form.code === '') {
        this.code.invalid = false;
        this.code.err = '';
        return false;
      }
      return this.http$.user.verifyImageCode({
        loginId: this.userProperty.email,
        code: this.form.code,
      })
        .then(() => {
          this.code.invalid = false;
          this.code.err = '';
          return true;
        })
        .catch((res) => {
          this.code.invalid = true;
          this.code.err = res.data.reason;
          return false;
        });
    },
  },
};
