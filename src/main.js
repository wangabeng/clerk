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

// layer
import layer from 'vue-layer'
Vue.prototype.$layer = layer(Vue);

import store from './store/index'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  updated () {

  }
}).$mount('#app')
