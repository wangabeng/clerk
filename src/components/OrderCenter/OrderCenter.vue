<template>
  <div class="order-center">
    <!-- 导航区 -->
    <ul class="nav-container">
      <li class='active'><a href="javascript:;">全部</a></li>
      <li><a href="javascript:;">待服务</a></li>
      <li><a href="javascript:;">服务中</a></li>
      <li><a href="javascript:;">已结束</a></li>
      <li><a href="javascript:;">已取消</a></li>
    </ul>

    <!-- 用户单列表 -->
    <div class="client-order-lists">
      <!-- 每一个订单 -->
      <div class="each-order" v-for='(item, index) in allOrders' v-if='allOrders'>
        <p class='line'>订单编号：<span class='content'>{{item.order_no}}</span></p>
        <p class='line'>下单时间：<span class='content'>{{item.create_time}}</span></p>
        <p>订单类型：<span class='content'>{{item.order_type =='1'? '随机单': '指定单'}}</span></p><!-- 订单类型  1随机单  2指定单 -->
        <!-- <p>用户名称：<span class='content'>张三</span></p> -->
        <p>性&emsp;&emsp;别：<span class='content'>{{item.sex == '1'? '小哥哥': '小姐姐'}}</span></p>
        <p>等&emsp;&emsp;级：<span class='content'>{{item.level_name}}</span></p>
        <p>时&emsp;&emsp;长：<span class='content'>{{item.time}} × {{item.num}}</span></p>
        <p>价&emsp;&emsp;格：<span class='content'>{{item.price}}</span></p>
        
        <!-- 待接单 已接单 已完成 -->
        <input type="button" value='待接单'>
        <!-- <input type="button" value='开始接单'> -->
      </div>
    </div>

    <clerk-footer :propSubject='"orderCenter"'></clerk-footer>
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
      curPage: 1, // 默认第一页
      order_type: 0, // 订单类型 0表示所有订单  1随机单  2指定单

      allOrders: [], // 所有订单

      isLoading: false, // 是否正在加载
      filterActor: '0', // 0表示所有订单  1随机单  2指定单
    }
  },
  props: {
    msg: String
  },
  components: {
    SwitchBtn,
    ClerkFooter
  },
  created () {
    var _this = this;
    $.ajax({
      type: "POST",  
      url: BASEURL + "/get_order_list",  // 接口23 
      data: {
        service_status: '1',
        page: 1,
      },  
      headers: {'token': localStorage.getItem("shiguangshudong")},
      dataType: "json",  
      success: function(res){  
        TokenError(res.code, _this); // token错误

        if (res.code == 0) {
          console.log('接口23：', res.data);
          _this.allOrders = res.data;
        }
      },  
      error: function(e){  
       console.log(e);  
      }  
    });
  },
  methods: {
    getcur () {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "common/sass/variable.scss";
.order-center {
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
      padding-right: .6rem;
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
</style>

