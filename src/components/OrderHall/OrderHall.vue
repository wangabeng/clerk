<template>
  <div class="order-hall">
    <div class="swiper-outer-container">
      <div class="name-infos" v-if='userInfo'>
        <p>{{userInfo.nick_name}}</p>
      </div>

      <!-- 轮播图 -->
      <swiper :options="swiperOption" v-if='userInfo'>
      　　<swiper-slide>
            <div class='slider-each-wrapper' >
              <img :src="userInfo.avatar_url" alt="">   
              <!-- <div class="info-txt">
                    <div class="name-wrapper">
                      <span class='name'>{{clertDetail.salesman.nick_name}}</span>
                      <span class='star'>{{clertDetail.salesman.sex=='1'? '男': '女'}}</span>
                    </div>
                    <div class="online-status">
                      <i class="fa fa-circle online" aria-hidden="true"></i>
                      <span>在线</span>
                    </div>
                  </div> -->    
            </div>
          </swiper-slide>
      　　<div class="swiper-pagination" slot="pagination"></div>
      　　<!-- <div class="swiper-button-prev" slot="button-prev"></div>
      　　<div class="swiper-button-next" slot="button-next"></div> -->
      </swiper>
      <!-- 轮播图 结束 -->
    </div>

    <!-- 导航区 -->
    <ul class="nav-container">
      <!-- 1随机单  2指定单 -->
      <li :class="{'active': filterActor == '0'}"><a href="javascript:;" @click='tabHallOrder("0")'>全部</a></li>
      <li :class="{'active': filterActor == '2'}"><a href="javascript:;" @click='tabHallOrder("2")'>指定单</a></li>
      <li :class="{'active': filterActor == '1'}"><a href="javascript:;" @click='tabHallOrder("1")'>随机单</a></li>
    </ul>

    <!-- 用户单列表 -->
    <div class="client-order-lists">
      <!-- 每一个订单 -->
      <div class="each-order" v-for='(item, index) in showOrders'>
        <p class='line'>订单编号：<span class='content'>{{item.order_no}}</span></p>
        <p class='line'>下单时间：<span class='content'>{{item.create_time}}</span></p>
        <p>用户名称：<span class='content'>{{item.nick_name}}</span></p>
        <p>服务类型：<span class='content'>文字语音条</span></p>
        <p>时&emsp;&emsp;长：<span class='content'>{{item.time}} × {{item.num}}</span></p>
        <p>价&emsp;&emsp;格：<span class='content'>¥{{item.price}}</span></p>
        <p>性&emsp;&emsp;别：<span class='content'>{{item.sex == 1? '小哥哥': '小姐姐'}}</span></p><!-- 1小哥哥 2小姐姐 -->
        <p>等&emsp;&emsp;级：<span class='content'>{{item.level_name}}</span></p>
        <p>订单类型：<span class='content'>{{item.order_type == 1? '随机单': '指定单'}}</span></p> <!-- 1随机单  2指定单 -->
        <p class='line'>其他要求：<span class='content'></span></p>
        <input class='random-btn' @click='grabOrder(item.order_no)' type="button" value='立即抢单' v-if='item.order_type == 1'> <!-- 随机单 -->
        <input class='fixed-btn' @click='startService(item.order_no)' type="button" value='开始接单' v-if='item.order_type == 2'> <!-- 指定单 -->
      </div>
    </div>
    
    <!-- SVG动画加载更多 -->
    <p style="width: 100%;text-align: center;" ref='loadingTxt' id='loading-txt'><img style='width:2rem;height:.5rem;display: inline-block;' src="~common/image/loading.svg" 
      v-if='isLoading' alt=""></p>

    <clerk-footer :propSubject='"orderHall"'></clerk-footer>
  </div>
</template>

<script>
import SwitchBtn from 'base/SwitchBtn/SwitchBtn.vue'
import ClerkFooter from 'base/ClerkFooter/ClerkFooter.vue'

// import {mapGetters, mapActions} from 'vuex'
import $ from 'jquery'

// require styles
import 'swiper/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

// 用封装好的axios
import axios from 'src/api/axios';
import Qs from 'qs';
import {BASEURL} from "src/api/config.js";

import getToken from 'src/api/getToken.js';
// import {allList} from 'src/api/mockdata.js';
import {GetQueryString, TokenError} from "src/api/utils.js";

import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'AdminCenter',
  data () {
    return {
      // 轮播图
      swiperOption: {
      　　pagination: {
      　　　　el: '.swiper-pagination',
      　　　　clickable: true // 允许点击小圆点跳转
      　　},
      　　/*autoplay: {
      　　　　delay: 3000,
      　　　　disableOnInteraction: false // 手动切换之后继续自动轮播
      　　},*/
      　　loop: true,
      　　navigation: {
      　　　　nextEl: '.swiper-button-next',
      　　　　prevEl: '.swiper-button-prev'
      　　},
          observer: true,
          observeParents: true,
      },

      // 接单大厅接口12查询条件
      curPage: 1, // 默认第一页
      order_type: 0, // 订单类型 0表示所有订单  1随机单  2指定单

      allHallOrders: [], // 所有接单大厅数据

      isLoading: false, // 是否正在加载
      filterActor: '0', // 0表示所有订单  1随机单  2指定单
    };
  },
  props: {
    msg: String
  },
  components: {
    SwitchBtn,
    ClerkFooter,
    swiper,
    swiperSlide
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    // 显示在页面的订单集合
    showOrders () {
      var _this = this;
      if (_this.filterActor == '0') {
        // console.log("计算属性第一次执行", this.allHallOrders);
        return this.allHallOrders;
      } else {
        return this.allHallOrders.filter((element) => (element.order_type == _this.filterActor));
      }
    }
  },
  created () {
    this.getHallOrder();

    var _this = this;
    // 获取用户或店员信息 先判断vuex中用户信息是否存在
    if (!this.userInfo) {
      $.ajax({
        type: "POST",  
        url: BASEURL + "/get_user_info",  // 接口16 token获取用户信息
        data: {
        },  
        headers: {'token': localStorage.getItem("shiguangshudong")},
        dataType: "json",  
        success: function(res){  
          TokenError(res.code, _this); // token错误

          if (res.code == 0) {
            console.log('get_user_info为：', res.data);
            _this.setUserInfo(res.data);
            console.log('_this.userInfo', _this.userInfo);
          }
        },  
        error: function(e){  
         console.log(e);  
        }  
      });      
    }
  },
  mounted () {
    this.touchUpdate();
  },
  methods: {
    ...mapActions([
      'setUserInfo'
    ]),
    // 获取接单大厅的订单列表
    getHallOrder () {
      var _this = this;
      $.ajax({
         type: "POST",  
         url: BASEURL + "/get_accept_orders",  
         contentType: 'application/x-www-form-urlencoded;charset=utf-8',  
         data: {
          'order_type': _this.order_type, // 0 所有 1   2
          'page': _this.curPage,
        },  
        headers: {'token': localStorage.getItem("shiguangshudong")},
        dataType: "json",  
        success: function(res){  
                    console.log("接口19成功");  
                    console.log(res.data);
                    _this.allHallOrders = _this.allHallOrders.concat(res.data);
                    // _this.allHallOrders = data.data;
                    console.log(_this.allHallOrders);
                    console.log("接口19 结束");
                  },  
        error: function(e){
                    console.log(e);  
        }  
      });
    },
    // 上拉刷新 监听页面滚动
    touchUpdate () {
      var _this = this;


      // 上拉刷新
      var loadingEle = document.getElementById("loading-txt");
      console.log(loadingEle);
      console.log(_this.$nextTick);
      // var ulContent = document.querySelector('.content_wrapper');
      // var isLoading = false; // 只有为false 才可以执行刷新

      this.bindEvent = function () {
        _this.$nextTick(function () {
          var curScrollTop = getScrollTop();
          var clientHeight = getClientHeight();
          var totalHeight = getScrollHeight();
          console.log(curScrollTop, clientHeight, totalHeight);
          if (curScrollTop + clientHeight + getPxByRem(.5) >= totalHeight && _this.isLoading == false) {
              console.log("提前加载");
              if (_this.isLoading == false) {
                _this.isLoading = true;
              } else {
                return;
              }
              loadingEle.style.display = 'block';

              // ajax 成功后追加dom 然后执行_this.isLoading = false loadingEle.style.display = 'none'
              /*clearTimeout(timerAjax);
              var timerAjax = setTimeout(function () {
                    loadingEle.style.display = 'none';
                    _this.allList = _this.allList.concat(_this.allList);
                    _this.isLoading = false;
              }, 3000);*/
              // 加载更多
              $.ajax({
                type: "POST",  
                url: BASEURL + "/get_accept_orders",  
                // contentType: 'application/x-www-form-urlencoded;charset=utf-8',  
                data: {
                  'order_type': _this.order_type, // 0 所有 1   2
                  'page': ++_this.curPage,
                },  
                headers: {'token': localStorage.getItem("shiguangshudong")},
                dataType: "json",  
                success: function(res){  
                            console.log(res.data);
                            TokenError(res.code, _this);

                            _this.allHallOrders = _this.allHallOrders.concat(res.data);
                            // console.log('最新列表为', _this.allList);

                            loadingEle.style.display = 'none';
                            // _this.isLoading = false;
                            setTimeout(function () {
                                _this.isLoading = false; // 当第一次上拉 值变为true 再次快速上拉 _this.isLoading因为是true 不执行if内语句 起到节流作用
                            }, 1000);
                          },  
                error: function(e){  
                             console.log(e);  
                }  
              });


              // 节流
              clearTimeout(timer);
              var timer = setTimeout(function () {
                  _this.isLoading = false; // 当第一次上拉 值变为true 再次快速上拉 isLoading因为是true 不执行if内语句 起到节流作用
              }, 1000);
          }          
        });

      }

      window.addEventListener('touchmove', _this.bindEvent, false);



      // 获取元素滚动高度
      function getScrollTop() { 
          var scrollTop = 0; 
          if (document.documentElement && document.documentElement.scrollTop) { 
              scrollTop = document.documentElement.scrollTop; 
          } else if (document.body) { 
              scrollTop = document.body.scrollTop; 
          } 
          return scrollTop; 
      }

      // 获取当前可视范围的高度
      function getClientHeight() { 
          var clientHeight = 0; 
          if (document.body.clientHeight && document.documentElement.clientHeight) { 
          clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight); 
          } 
          else { 
          clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight); 
          } 
          return clientHeight; 
      }

      // 获取文档完整的高度
      function getScrollHeight() { 
          return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight); 
      }

      // 实时获取1rem单位的px值 rem转像素$.(6.4) 输入出375
      function getPxByRem (remSize){  
          var deviceWidth = document.body && document.body.clientWidth || document.getElementsByTagName("html")[0].offsetWidth;
          return remSize * (deviceWidth * 200 / 1280);
      }
    },
    // 过滤订单
    tabHallOrder (filterIndex) {
      this.filterActor = filterIndex;
    },
    // 立即抢单 25
    grabOrder (orderNo) {
      var _this = this;
      $.ajax({
        type: "POST",  
        url: BASEURL + "/receipt_order", // receipt_order 抢单
        // contentType: 'application/x-www-form-urlencoded;charset=utf-8',  
        data: {
          order_no: orderNo,
        },  
        headers: {'token': localStorage.getItem("shiguangshudong")},
        dataType: "json",  
        success: function(res){
                    TokenError(res.code, _this); // token错误
                    if (res.code == 0) {
                      console.log('接口25：', res.data);
                    }

                  },  
        error: function(e){  
                     console.log(e);
        }  
      }); 
    },
    // 接口26 开始服务
    startService (orderNo) {
      var _this = this;
      $.ajax({
        type: "POST",  
        url: BASEURL + "/start_service",  
        // contentType: 'application/x-www-form-urlencoded;charset=utf-8',  
        data: {
          order_no: orderNo,
        },  
        headers: {'token': localStorage.getItem("shiguangshudong")},
        dataType: "json",  
        success: function(res){
                    TokenError(res.code, _this); // token错误
                    if (res.code == 0) {
                      console.log('接口26：', res.data);
                    }

                  },  
        error: function(e){  
                     console.log(e);
        }  
      });
    }
  },
  // beforeDestroy
  beforeDestroy () {
    // 路由销毁前解除绑定
    var _this = this;
    window.removeEventListener('touchmove', _this.bindEvent, false);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "common/sass/variable.scss";
.order-hall {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding-bottom: 1.6rem;

  .nav-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-bottom: .2rem;
    background-color: #97acc1;
    li {
      flex: 1;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      &.active {
        a {
          border-bottom: 2px solid $color-sub-red;
        }
      }
      a {
        display: inline-flex;
        padding: .2rem 0;
        color: #fff;
        font-size: .25rem;
      }
    }
  }

  .client-order-lists {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .each-order {
      width: 6rem;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      position: relative;
      border: $border-1px;
      box-shadow:$box-shadow;
      border-radius: .1rem;
      margin-top: .3rem;
      padding: .2rem;
      box-sizing: border-box;
      font-size: .22rem;
      line-height: 1.5;


      p {
        width: 50%;
        color: $color-text-dd;
        span {
          color: $color-text-d;
        }
        &.line {
          width: 100%;
        }
      }

      input {
        border: 1px solid $color-sub-red;
        background-color: transparent;
        color: $color-sub-red;
        border-radius: .1rem;
        font-size: .23rem;
        // padding: .08rem .16rem;
        position: absolute;
        top: .2rem;
        right: .3rem;

        &.random-btn {
          background-color: #f0ad4e;
          color: #fff;
          border: 0 none;
        }
        &.fixed-btn {
          background-color: $color-sub-red;
          color: #fff;
          border: 0 none;
        }
      }
    }
  }
}
 
/* 轮播图容器 */
.swiper-outer-container {
  width: 100%;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: .4rem 0 .2rem;
  background-color: #97acc1;

  position: relative;
}

.name-infos {
  position: absolute;
  bottom: .5rem;
  left: .5rem;
  z-index: 201;
  line-height: 1.6;
  opacity: .8;
}

/* slider */
.swiper-container {
    width: 5.8rem;
    height: 5.8rem;
    border-radius: .1rem;
}
.swiper-pagination-bullet-active {
  background: #fff!important;
}
.slider-each-wrapper {
  width: 5.8rem!important;
  height: 5.8rem!important;
  position: relative;
  border-radius: .1rem;

  >img {
    width: 5.8rem!important;
    height: 5.8rem!important;
    background-color: #9f9f9f;
    border-radius: .1rem;
    background-color: $color-background-d;
  }

  .info-txt {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    padding: .2rem .3rem .4rem;
    box-sizing: border-box;
    color: rgba(200,200,200, .8);
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;

    .name-wrapper {
      display: flex;
      flex-direction: column;
      .name {
        font-size: .26rem;
        font-weight: 400;
        margin-bottom: .1rem;
      }
      .star {
        font-size: .2rem;
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

}
</style>

