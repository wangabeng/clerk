import Vue from 'vue'
import App from './App.vue'
import router from './router'
import $ from 'jquery'
// rem布局字体自适应
import fontSize from './common/js/fontSize'
fontSize(document, window)

// import { Button, Select } from 'element-ui'

import 'common/sass/index.scss'

import AwesomePicker from 'vue-awesome-picker'
Vue.use(AwesomePicker)

// import wx from 'weixin-js-sdk'
// Vue.use(wx);//将全局函数当做插件来进行注册
// Vue.prototype.wx = wx
Vue.prototype.getWeixinConfig = function () {
  return {
    aa: 111,
    bb: 22222
  };
}

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  mounted () {
  }
}).$mount('#app')
