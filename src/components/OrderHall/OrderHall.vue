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
      <li class='active'><a href="javascript:;">全部</a></li>
      <li><a href="javascript:;">指定单</a></li>
      <li><a href="javascript:;">随机单</a></li>
    </ul>

    <!-- 用户单列表 -->
    <div class="client-order-lists">
      <!-- 每一个订单 -->
      <div class="each-order">
        <p>用户名称：<span class='content'>张三</span></p>
        <p>服务类型：<span class='content'>文字语音条</span></p>
        <p>时&emsp;&emsp;长：<span class='content'>一天 × 1</span></p>
        <p>价&emsp;&emsp;格：<span class='content'>88.00</span></p>
        <p>性&emsp;&emsp;别：<span class='content'>小哥哥</span></p>
        <p>等&emsp;&emsp;级：<span class='content'>金牌</span></p>
        <p>订单类型：<span class='content'>指定</span></p>
        <p>下单时间：<span class='content'>2019年08月11日 16:16:25</span></p>
        <input type="button" value='立即抢单'>
        <!-- <input type="button" value='开始接单'> -->
      </div>
      <!-- 每一个订单 -->
      <div class="each-order">
        <p>用户名称：<span class='content'>张三</span></p>
        <p>服务类型：<span class='content'>文字语音条</span></p>
        <p>时&emsp;&emsp;长：<span class='content'>一天 × 1</span></p>
        <p>价&emsp;&emsp;格：<span class='content'>88.00</span></p>
        <p>性&emsp;&emsp;别：<span class='content'>小哥哥</span></p>
        <p>等&emsp;&emsp;级：<span class='content'>金牌</span></p>
        <p>订单类型：<span class='content'>指定</span></p>
        <p>下单时间：<span class='content'>2019年08月11日 16:16:25</span></p>
        <input type="button" value='开始接单'>
        <!-- <input type="button" value='开始接单'> -->
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
  mounted () {
  },
  methods: {

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
      flex-direction: column;
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
        color: $color-text-dd;
        span {
          color: $color-text-d;
        }
      }

      input {
        border: 1px solid $color-sub-red;
        background-color: transparent;
        color: $color-sub-red;
        border-radius: .1rem;
        font-size: .23rem;
        padding: .08rem .16rem;
        position: absolute;
        top: 50%;
        right: .3rem;
        transform: translateY(-50%);
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

