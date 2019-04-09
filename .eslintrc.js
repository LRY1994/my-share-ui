module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true, //支持commonjs语法
    node: true,//支持node
    es6: true //支持es6语法
  },
  extends: [
    'plugin:vue/essential'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'linebreak-style': [0, 'windows'], // 换行风格
    'eol-last': 0, // 文件以单一的换行符结束
    'eqeqeq': 2, // 必须使用全等
    'no-mixed-spaces-and-tabs': [0], // 关闭禁止混用tab和空格
    'max-len': [0, 150],
    // 'import/extensions': ['off', 'never'],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
