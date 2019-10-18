<template>
  <div class="user-order-list">
    <!-- 导航区 -->
    <ul class="nav-container">
      <!-- 1待接单  2已接单未服务  3服务中  4服务完成 -->
      <li :class="{'active': filterActor == '0'}" @click='tabOrder("0")'><a href="javascript:;">全部</a></li>
      <li :class="{'active': filterActor == '1'}" @click='tabOrder("1")'><a href="javascript:;" >待接单</a></li>
      <li :class="{'active': filterActor == '2'}" @click='tabOrder("2")'><a href="javascript:;" >待服务</a></li>
      <li :class="{'active': filterActor == '3'}" @click='tabOrder("3")'><a href="javascript:;" >服务中</a></li>
      <li :class="{'active': filterActor == '4'}" @click='tabOrder("4")'><a href="javascript:;" >已完成</a></li>
    </ul>

    <!-- 用户单列表 -->
    <div class="client-order-lists">
      <!-- 每一个订单 -->
      <div class="each-order" v-for='(item, index) in showOrders' v-if='showOrders' 
        @click='getOrderDetail(item.order_no)'>
        <p class='line'>订单编号：<span class='content'>{{item.order_no}}</span></p>
        <p class='line'>下单时间：<span class='content'>{{item.create_time}}</span></p>
        <p>订单类型：<span class='content'>{{item.order_type =='1'? '随机单': '指定单'}}</span></p><!-- 订单类型  1随机单  2指定单 -->
        <!-- <p>用户名称：<span class='content'>张三</span></p> -->
        <p>性&emsp;&emsp;别：<span class='content'>{{item.sex == '1'? '小哥哥': '小姐姐'}}</span></p>
        <p>等&emsp;&emsp;级：<span class='content'>{{item.level_name}}</span></p>
        <p>时&emsp;&emsp;长：<span class='content'>{{item.time}} × {{item.num}}</span></p>
        <p>价&emsp;&emsp;格：<span class='content'>{{item.price}}</span></p>
        
        <!-- 待接单 已接单 已完成 -->
        <input type="button" :value="idToTxt(item.service_status)"><!-- 接单状态  1待接单  2已接单未服务  3服务中  4服务完成 -->
        <!-- <input type="button" value='开始接单'> -->
      </div>
    </div>

    <p class="no-record" v-if='showOrders.length==0 && !isLoading'><i class="fa fa-exclamation-circle" aria-hidden="true"></i><span>暂无记录</span></p>

    <!-- SVG动画加载更多 -->
    <p style="width: 100%;text-align: center;" ref='loadingTxt' id='loading-txt'><img style='width:2rem;height:.5rem;display: inline-block;' src="~common/image/loading.svg" 
      v-if='isLoading' alt=""></p>

    <user-footer :propSubject='"userOrderList"'></user-footer>
  </div>
</template>

<script>
import SwitchBtn from 'base/SwitchBtn/SwitchBtn.vue'
import ClerkFooter from 'base/ClerkFooter/ClerkFooter.vue'
import UserFooter from 'base/UserFooter/UserFooter.vue'

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
  name: 'UserOrderList',
  data () {
    return {
      curPage: 1, // 默认第一页
      order_type: 0, // 订单类型 0表示所有订单  1随机单  2指定单

      allOrders: [], // 所有订单

      isLoading: false, // 是否正在加载
      filterActor: '0', // 接单状态  1待接单  2已接单未服务  3服务中  4服务完成
    }
  },
  props: {
    msg: String
  },
  components: {
    SwitchBtn,
    UserFooter
  },
  computed: {
    showOrders () {
      var _this = this;
      var arrys = [];

      if (_this.filterActor == '0') {
        console.log("计算属性第一次执行", _this.allOrders);
        arrys =  _this.allOrders;
      } else {
        arrys =  _this.allOrders.filter((element) => (element.service_status == _this.filterActor));
        console.log("计算属性第一次执行", arrys);
      }

      var txtArrys = [];

      /*for (var i = 0; i < arrys.length; i++) {
        // arrys[i].service_status;
        // 接单状态  1待接单  2已接单未服务  3服务中  4服务完成
        switch(arrys[i].service_status) {
          case '1':
              arrys[i].service_status = '待接单'
              break;
          case '2':
              arrys[i].service_status = '已接单未服务'
              break;
          case '3':
              arrys[i].service_status = '服务中'
              break;
          case '4':
              arrys[i].service_status = '服务完成'
              break;     
          default:
              break;
        } 
        txtArrys.push(arrys[i]);
      }*/

      return arrys;


    }
  },
  created () {
    var _this = this;
    _this.isLoading = true;
    $.ajax({
      type: "POST",  
      url: BASEURL + "/get_order_list",  // 接口23 
      data: {
        service_status: '0',
        page: _this.curPage,
      },  
      headers: {'token': localStorage.getItem("shiguangshudong")},
      dataType: "json",  
      success: function(res){  
        TokenError(res.code, _this); // token错误

        if (res.code == 0) {
          console.log('接口23：', res.data);
          _this.isLoading = false;
          _this.allOrders = _this.allOrders.concat(res.data);
        }
      },  
      error: function(e){  
       console.log(e);  
      }  
    });
  },
  mounted () {
    this.touchUpdate();
  },
  methods: {
    getcur () {
    },
    // 上拉刷新 监听页面滚动
    touchUpdate () {
      var _this = this;


      // 上拉刷新
      var loadingEle = document.getElementById("loading-txt");
      console.log(loadingEle);
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
                url: BASEURL + "/get_order_list",  // 接口23 
                data: {
                  service_status: '0',
                  page: ++_this.curPage,
                }, 
                headers: {'token': localStorage.getItem("shiguangshudong")},
                dataType: "json",  
                success: function(res){  
                            console.log(res.data);
                            TokenError(res.code, _this);

                            _this.allOrders = _this.allOrders.concat(res.data);
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
    tabOrder (filterIndex) {
      this.filterActor = filterIndex;
    },
    idToTxt (id) {
      switch(id) {
        case '1':
            return '待接单'
            break;
        case '2':
            return '已接单'
            break;
        case '3':
            return '服务中'
            break;
        case '4':
            return '已完成'
            break;     
        default:
            return
            break;
      }
    },
    getOrderDetail (id) {
      this.$router.push({ name: 'UserOrderDetail', params:{ id: id}});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "common/sass/variable.scss";
.user-order-list {
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
    padding-bottom: .1rem;
    padding-top: .2rem;
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
      padding-right: 1rem;
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
        /*border: 1px solid $color-sub-red;*/
        background-color: transparent;
        color: $color-sub-red;
        border-radius: .1rem;
        font-size: .24rem;
        /*padding: .08rem .16rem;*/
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: .1rem;
      }
    }
  }

}
/* 暂无记录 */
.no-record {
  padding: 1.2rem 0 ;
  font-size: .25rem;
  color: $color-text-d;
  i {
    display: inline-flex;
    padding-right: .15rem;
  }
}
</style>

