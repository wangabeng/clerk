<template>
  <div class="clerk-lists">
    店员列表
    <a href="javascript:;" @click='randomLink'>ddd</a>
  </div>
</template>

<script>
// import HelloWorld from 'components/HelloWorld/HelloWorld.vue'
// import Index from 'components/Index/Index.vue'
// import SideBar from 'base/SideBar/SideBar.vue'
// import MHeader from 'base/MHeader/MHeader.vue'
// import MFooter from 'base/MFooter/MFooter.vue'

// import {mapGetters, mapActions} from 'vuex'
import $ from 'jquery'

import wx from 'weixin-js-sdk'

export default {
  name: 'ClerkLists',
  mounted () {
    console.log("adfdfdf", $("#m-index").html());
  },
  methods: {
    randomLink () {
      this.$router.push('/randomorder');
    }
  },
  created () {
    /*var weixinConfig ={
      debug: true,

      "appId": "wx0da4e67530296351",
      "nonceStr": "HO4lIaBfubT3x5dl",
      "timestamp": 1568877171,
      "signature": "bcffe31a0f643f8f370b001c8761c375809ec822",

      jsApiList: ['startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'onVoicePlayEnd', 'uploadVoice']
    }

    const wx = window['wx']

    wx.config(weixinConfig);
    
    wx.ready(function(){
      // console.log("准备好了");
    });*/
  },
  mounted () {
    // console.log("weixin", wx);
  }
}
</script>

<style scoped lang="scss">
@import "common/sass/variable.scss";
.clerk-lists {
  color: $color-sub-blue;
  width: 6rem;
  background: blue;
}
</style>
