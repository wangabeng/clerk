const webpack = require('webpack');

const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
    "publicPath": './',//输出的根路径  默认是/ 如果你的网站是app.com/vue 这更改此配置项
    // "baseUrl": './',
    /*outputDir:'dist',//构建输出目录
    assetsDir:'assets',//静态资源目录(js,css,img,fonts)
    lintOnSave:false,//是否开启eslint保存检测,有效值: true || false || 'error'*/
    devServer:{
        open:true,//是否自动弹出
        host:'localhost',
        port: 8080,//端口
        https:false,
        hotOnly:false,//热更新
        disableHostCheck: true, // 解决内网穿透报错
    },
    configureWebpack: {
      plugins: [
        new webpack.ProvidePlugin({
          $:"jquery",
          jQuery:"jquery",
          "windows.jQuery":"jquery",
          Popper: ["popper.js", "default"]
        })
      ]
    },
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@$', resolve('src'))
            .set('src', resolve('src'))
            .set('components',resolve('src/components'))
            .set('common',resolve('src/common'))
            .set('base',resolve('src/base'))
            .set('static',resolve('src/static'))
    },
}