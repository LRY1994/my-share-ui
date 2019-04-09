const path  = require('path')
const CopyWebpackPlugin  =  require('copy-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production';
const assetsDir = './static';
module.exports = {
  devServer: {
    proxy: {
      '/gw': {
        target: 'http://market-test.ctyun.cn:8085/',
      },
    },
    disableHostCheck: true,
  },
  pages: {
    index: {
      entry: 'test/main.js',
      template: 'public/index.html',
      filename: 'index.html',
    },
  },
  assetsDir,
  baseUrl: './',
  chainWebpack: (config) => {
    config.module.rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap((options) => {
        options.publicPath = isProduction ? './' : '/';
        return options;
      });

    if (isProduction) {
      config.externals({
        vue: 'vue'
      });
    }
  },

};
