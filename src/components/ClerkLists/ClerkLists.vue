<template>
  <div class="clerk-lists">
    店员列表
    <a href="javascript:;" @click='randomLink'>ddd</a>
    <br>
    <br>
    <a href="javascript:;" @click='feedback'>反馈</a>
    <br>
    <br>
    <a href="javascript:;" @click='login'>登录</a>
    <br>
    <br>

    <!-- <a href="javascript:;" @click='getToken'>获取token</a> -->
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

// import axios from 'axios'
import axios from 'src/api/axios';
import {BASEURL} from "src/api/config.js";

export default {
  name: 'ClerkLists',
  data () {
    return {
      token: '',
    };
  },
  mounted () {
    console.log("adfdfdf", $("#m-index").html());
  },
  methods: {
    randomLink () {
      this.$router.push('/randomorder');
    },
    // 获取用户信息
    /*getInfoB () {
      // 测试ajax
      $.ajax({
         type: "POST",  
         // url: BASEURL + "/api/get_user_info",  
         url: "/api/get_user_info",  
         contentType: 'application/x-www-form-urlencoded;charset=utf-8',  
         // data: {username:$("#username").val(), password:$("#password").val()},  
         headers: {'Authorization': 'abc'},
         dataType: "json",  
         success: function(data){  
                    console.log("成功");  
                    console.log(data);  
                  },  
         error: function(e){  
                     console.log(e);  
         }  
      });
    },*/
    getInfoA () {
      axios.post(BASEURL + '/api/get_user_info', {
          params: {
          },
          config: {
            headers: { "Content-Type": "multipart/form-data",'Authorization': 'test' },
          },
        })
        .then(function (response) {
          // console.log(response);
        })
        .catch(function (error) {
          // console.log(error);
        });
    },
    getInfoC () {
      axios.get('http://localhost:8080/getuser/test?=23231', {
          params: {
            openid: '132332332'
          },
          // config: {
          //   headers: { "Content-Type": "multipart/form-data",'Authorization': 'test' },
          // },
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          // console.log(error);
        });
    },
    feedback () {
      // ajax测试成功
      /*$.ajax({
         type: "POST",  
         // url: BASEURL + "/api/get_user_info",  
         url: "http://116.62.23.153:9494/api/get_feedback_types",  
         contentType: 'application/x-www-form-urlencoded;charset=utf-8',  
         // data: {username:$("#username").val(), password:$("#password").val()},  
         dataType: "json",  
         success: function(data){  
                    console.log("成功");  
                    console.log(data);  
                  },  
         error: function(e){  
                     console.log(e);  
         }  
      });*/

      axios.post('/get_feedback_types', {
          params: {
            // openid: '132332332'
          },
          /*config: {
            headers: { "Content-Type": "application/x-www-form-urlencoded"},
          },*/
          withCredentials: true // 携带cookie
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          // console.log(error);
        });
    },
    login () {
      axios.post('/admin/login', {
          params: {
            userName: 'abeng',
            password: '123'
          },
          // withCredentials: true // 可以拿到cookie
        })
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 测试获取token
    getToken () {
      // 测试ajax
      $.ajax({
         type: "POST",  
         url: "http://116.62.23.153:9494/api/get_user_info",  
         contentType: 'application/x-www-form-urlencoded;charset=utf-8',  
         // data: {username:$("#username").val(), password:$("#password").val()},  
         // headers: {'Authorization': 'test'},
         dataType: "json",  
         success: function(data){  
                    console.log("成功");  
                    console.log(data);  
                  },  
         error: function(e){  
                     console.log(e);  
         }  
      });
    }
  },
  created () {
    // 每次进来 看是否有token 如果有 每次请求服务器端数据 都携带上这个token
    if (!!this.token) {
      // 有token
      console.log('有token');

    } else {
      // 获取token
      console.log('没有token');
      // 发送请求 登录验证 以获取token
    }

    // 请求文章列表
    /*axios.get(BASEURL + '/newscenter/lists', {
        params: {
          curpage: 1,
          pagesize: 4,
        }
      })
      .then(function (response) {
        console.log(response);

      })
      .catch(function (error) {
        // console.log(error);
      });*/


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
  // background: blue;
}
</style>
