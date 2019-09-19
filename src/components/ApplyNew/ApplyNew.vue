<template>
  <div class="apply-new">
    店员列表
    <a href="javascript:;" @click='recordBegin'>开始录音</a>
    <a href="javascript:;" @click='recordStop'>停止录音</a>
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
  name: 'ApplyNew',
  data () {
    return {
      WX: null
    };
  },
  methods: {
    randomLink () {
      this.$router.push('/randomorder');
    },
    // 开始录音
    recordBegin () {
      var _this = this;
      this.WX.startRecord();

      setTimeout(function () {
        _this.WX.stopRecord({
          success: function (res) {
            var localId = res.localId;
            // console.log("停止了 id是：", localId);
          }
        });
      }, 5000);
    },
    // 停止录音
    recordStop () {
      this.WX.stopRecord({
        success: function (res) {
          var localId = res.localId;
          console.log("停止了 id是：", localId);
        }
      });
    }
  },
  created () {
    this.WX= window['wx'];

    var weixinConfig ={
      debug: true,

  "appId": "wx0da4e67530296351",
  "nonceStr": "jqlDcl7lF87bvso1",
  "timestamp": 1568883965,
  "signature": "d29e8343360373e8456f47dd3e10040992357860",

      jsApiList: ['startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'onVoicePlayEnd', 'uploadVoice']
    }

    this.WX.config(weixinConfig);
    
    this.WX.ready(function(){
      console.log("准备好了");
    });
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
