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

        /*proxyTable: {
          '/api': {
            target:'http://116.62.23.153:9494/api', // 你请求的第三方接口
            changeOrigin:true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
            pathRewrite:{  // 路径重写，
              '^/api': ''  // 替换target中的请求地址，也就是说以后你在请求http://api.douban.com/v2/XXXXX这个地址的时候直接写成/api即可。
            }
          }
        },*/


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
    //警告 webpack 的性能提示
    configureWebpack : {
      performance: {
        hints:'warning',
        //入口起点的最大体积 整数类型（以字节为单位）
        maxEntrypointSize: 9000000000,
        //生成文件的最大体积 整数类型（以字节为单位 300k）
        maxAssetSize: 9000000000,
        //只给出 js 文件的性能提示
        assetFilter: function(assetFilename) {
            return assetFilename.endsWith('.js');
        }
      }
    }
}