<template>
  <div class="order-hall">
    <div class="swiper-outer-container">
      <!-- 轮播图 -->
      <swiper :options="swiperOption">
      　　<swiper-slide>
            <div class='slider-each-wrapper'>
              <img src="~common/image/th.jpg" alt="">   
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
      <li class='active'><a href="javascript:;" @click='tabHallOrder(0)'>全部</a></li>
      <li><a href="javascript:;" @click='tabHallOrder(2)'>指定单</a></li>
      <li><a href="javascript:;" @click='tabHallOrder(1)'>随机单</a></li>
    </ul>

    <!-- 用户单列表 -->
    <div class="client-order-lists">
      <!-- 每一个订单 -->
      <div class="each-order" v-for='(item, index) in allHallOrders'>
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
        <input type="button" value='立即抢单' v-if='item.order_type == 1'> <!-- 随机单 -->
        <input type="button" value='开始接单' v-if='item.order_type == 2'> <!-- 指定单 -->
      </div>
    </div>
    


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
  created () {
    this.getHallOrder();
  },
  mounted () {
  },
  methods: {
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
         success: function(data){  
                    console.log("接口19成功");  
                    console.log(data.data);
                    _this.allHallOrders = _this.allHallOrders.concat(data.data);
                    // _this.allHallOrders = data.data;
                    console.log(_this.allHallOrders);
                    console.log("接口19 结束");
                  },  
         error: function(e){  
                     console.log(e);  
         }  
      });
    }
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
}
/* slider */
.swiper-container {
    width: 5.8rem;
    height: 2.9rem;
}
.swiper-pagination-bullet-active {
  background: #fff!important;
}
.slider-each-wrapper {
  width: 5.8rem!important;
  height: 2.9rem!important;
  position: relative;

  >img {
    width: 5.8rem!important;
    height: 2.9rem!important;
    background-color: #9f9f9f;
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

