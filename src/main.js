import Vue from 'vue'
import App from './App.vue'
import router from './router'
import $ from 'jquery'
// rem布局字体自适应
import fontSize from './common/js/fontSize'

import 'common/sass/index.scss'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  mounted () {
    fontSize(); // 自适应rem布局
  }
}).$mount('#app')
