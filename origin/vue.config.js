module.exports = {
  lintOnSave: false,
  outputDir: '../www',
  publicPath: './',
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'https://aliyun.yh0x13f.cn/api/android-course/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
