<template>
  <div class="clerk-lists">
    <!-- 随机下单 -->
    <div class="random-link">
      <a href="javascript:;">随机下单</a>
    </div>

    <!-- 搜索栏 -->
    <div class="search-wrapper">
      <div class="input-wrapper">
        <i class="fa fa-search" aria-hidden="true"></i>
        <input type="text" placeholder="搜索店员">
      </div>
      <a href="javascript:;">搜索</a>
    </div>
    <!-- 排序及分类 -->
    <div class="sort-wrapper">
      <a href="javascript:;">智能排序</a>
      <a href="javascript:;">性别：全部</a>
      <a href="javascript:;">等级：全部</a>
    </div>
    <!-- 店员列表 -->
    <ul class="all-lists">
      <li>
        <a href="javascript:;">
          <!-- 头像 -->
          <div class="potrait">
            <img src="./th.jpg" alt="">
            <p class='main-tag'>镇店</p>
          </div>
          <div class="mid-infos">
            <!-- 名字及状态 -->
            <div class="name-line">
              <div class="name-wrapper">
                <span>张三丰</span>
                <i class="fa fa-mars male" aria-hidden="true"></i>
                <!-- <i class="fa fa-venus" aria-hidden="true"></i> -->                
              </div>
              <div class="online-status">
                <!-- online  offline -->
                <i class="fa fa-circle offline" aria-hidden="true"></i>
                <span>在线</span>
              </div>

            </div>
            <!-- 说明 -->
            <p class="desc">希望你的可爱 可以治愈一切不可爱</p>
            <!-- 播放及价格 -->
            <div class="play-price">
              <div><img src='./play-icon.jpg'></div>
              <p>¥5元起</p>
            </div>
          </div>
          <div class='right-detail'><i class="fa fa-angle-right" aria-hidden="true"></i></div>
        </a>
      </li>
      <li>
        <a href="javascript:;">
          <!-- 头像 -->
          <div class="potrait">
            <img src="./th.jpg" alt="">
            <p class='main-tag'>镇店</p>
          </div>
          <div class="mid-infos">
            <!-- 名字及状态 -->
            <div class="name-line">
              <div class="name-wrapper">
                <span>张三丰</span>
                <i class="fa fa-mars male" aria-hidden="true"></i>
                <!-- <i class="fa fa-venus" aria-hidden="true"></i> -->                
              </div>
              <div class="online-status">
                <!-- online  offline -->
                <i class="fa fa-circle offline" aria-hidden="true"></i>
                <span>在线</span>
              </div>

            </div>
            <!-- 说明 -->
            <p class="desc">希望你的可爱 可以治愈一切不可爱</p>
            <!-- 播放及价格 -->
            <div class="play-price">
              <div><img src='./play-icon.jpg'></div>
              <p>¥5元起</p>
            </div>
          </div>
          <div class='right-detail'><i class="fa fa-angle-right" aria-hidden="true"></i></div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
// import HelloWorld from 'components/HelloWorld/HelloWorld.vue'
// import Index from 'components/Index/Index.vue'
// import SideBar from 'base/SideBar/SideBar.vue'
// import MHeader from 'base/MHeader/MHeader.vue'
// import MFooter from 'base/MFooter/MFooter.vue'

import {mapGetters, mapActions} from 'vuex'
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
  },
  methods: {
  },
  created () {
  },
  mounted () {
    // console.log("weixin", wx);
  }
}
</script>

<style scoped lang="scss">
@import "common/sass/variable.scss";
.random-link {
  position: fixed;
  right: .2rem;
  bottom: .4rem;
  z-index: 1000000;
  a {
    background-color: #f02b32;
    color: #fff;
    font-size: .22rem;
    padding: .05rem .1rem;
    border-radius: .05rem;
  }
}

.clerk-lists {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  /*搜索框*/
  .search-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: .25rem .2rem .07rem;
    box-sizing: border-box;
    .input-wrapper {
      flex: 1;
      display: flex;
      flex-direction: row;
      align-items: center;
      background-color: #f7f7f7;
      padding: .12rem .1rem;
      border-radius: .05rem;

      i {
        margin-right: .1rem;
        color: #727272;
      }
      input {
        background-color: transparent;
        flex: 1;
        font-size: .22rem;
      }
    }
    a {
      margin-left: .2rem;
    }

  }
  
  /*排序及分类*/
  .sort-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom: $border-1px;
    padding: .15rem 0 .05rem;
    a {
      flex: 1;
      padding: .1rem 0;
      display: flex;
      align-items: center;
      justify-content: center;
      border-right: $border-1px;
      box-sizing: border-box;
      color: $color-text-d;
      &:last-child {
        border-right: 0 none;
      }

    }
  }

  
  /*店员列表*/
  .all-lists {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    li {
      width: 100%;
      padding: 0 .2rem;
      box-sizing: border-box;
      &:last-child {
        >a {
          border-bottom: 0 none;
        }
      }
      >a {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: .2rem .1rem;
        box-sizing: border-box;
        border-bottom: $border-1px;

        
        .potrait {
          width: 1.25rem;
          height: 1.25rem;
          position: relative;
          img {
            width: 100%;
            height: 100%;
            border-radius: .03rem;
          }
          .main-tag {
            position: absolute;
            font-size: .18rem;
            bottom: 0;
            left: 0;
            background-color: #f94120;
            padding: .06rem;
            padding-right: .1rem;
            color: #fff;
            border-top-right-radius: .3rem;
            border-bottom-right-radius: .3rem;
            border-bottom-left-radius: .03rem;
          }

        }

        .mid-infos {
          flex: 1;
          flex-direction: row;
          align-items: flex-start;
          padding: 0 .15rem;
          box-sizing: border-box;
          .name-line {
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            .name-wrapper {
              display: inline-flex;
              align-items: center;
              span {
                display: inline-flex;
                margin-right: .1rem;
                font-size: .22rem;
                font-weight: 600;
              }
              i {
                &.male {
                  color: #0181d2;
                }
                &.famale {
                  color: #bb527b;
                }
              }
            }
            .online-status {
              span {
                display: inline-flex;
                font-size: .22rem;
                font-weight: 600;
              }
              i {
                margin-right: .07rem;
                &.online {
                  color: #46bf29;
                }
                &.offline {
                  color: $color-text-d
                }
              }
            }
          }
          .desc {
            font-size: .2rem;
            line-height: .25rem;
            margin: .06rem 0 .03rem;
            height: .55rem;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            color: $color-text-d;
          }
          .play-price {
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            div {
              img {
                width: .77rem;
                height: .34rem;
              }
            }
            p {
              color: $color-text-d;
            }
          }
        }

        .right-detail {
          i {
            font-size: .3rem;
            color: $color-text-d;
          }
        }
      }
    }
  }
        /* <a href="javascript:;">
          <!-- 头像 -->
          <div class="potrait">
            <img src="./th.jpg" alt="">
          </div>
          <div class="mid-infos">
            <!-- 名字及状态 -->
            <div class="name-line">
              <div class="name-wrapper">
                <span>张三丰</span>
                <i class="fa fa-mars" aria-hidden="true"></i>
                <!-- <i class="fa fa-venus" aria-hidden="true"></i> -->                
              </div>
              <div class="online-status">
                <i></i>
                <span>在线</span>
              </div>
        
            </div>
            <!-- 说明 -->
            <p class="desc">希望你的可爱 可以治愈一切不可爱</p>
            <!-- 播放及价格 -->
            <div class="play-price">
              <a href="javascript:;"></a>
              <p>¥5元起</p>
            </div>
          </div>
        </a> */
}
</style>



<!--     /*var weixinConfig ={
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
});*/ -->




<!--       // ajax测试成功
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
});*/ -->



<!--     // 每次进来 看是否有token 如果有 每次请求服务器端数据 都携带上这个token
if (!!this.token) {
  // 有token
  console.log('有token');

} else {
  // 获取token
  console.log('没有token');
  // 发送请求 登录验证 以获取token
} -->




<!--     feedback () {


  axios.post('/get_feedback_types', {
      params: {
        // openid: '132332332'
      },
      config: {
        headers: { "Content-Type": "application/x-www-form-urlencoded",'Authorization': 'test'},
      },
      withCredentials: true // 携带cookie
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      // console.log(error);
    });
}, -->
<!--     login () {
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
}, -->





<!--   methods: {
  randomLink () {
    this.$router.push('/randomorder');
  },

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


    axios.post('/get_feedback_types', {
        params: {
          // openid: '132332332'
        },
        config: {
          headers: { "Content-Type": "application/x-www-form-urlencoded",'Authorization': 'test'},
        },
        withCredentials: true // 携带cookie
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        // console.log(error);
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
}, -->