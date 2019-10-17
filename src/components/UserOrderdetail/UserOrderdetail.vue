<template>
  <div class="order-center">
    <!-- 导航区 -->
    <ul class="nav-container">
      <div class="go-back" @click='goBack'>
        <i class="fa fa-angle-left" aria-hidden="true"></i>
        <span>返回</span>
      </div>
      <h2>订单详情</h2>
    </ul>

    <!-- 用户单列表 -->
    <div class="order-detail">
      
      <!-- 每一个订单 -->
      <div class="each-order">
        <p class='line'>订单编号：<span class='content'>{{orderDetail.order_no}}</span></p>
        <p class='line'>下单时间：<span class='content'>{{orderDetail.create_time}}</span></p>
        <p>服务类型：<span class='content'>文字语音条</span></p>
        <!-- <p>用户名称：<span class='content'>张三</span></p> -->
        <p>时&emsp;&emsp;长：<span class='content'>{{orderDetail.time}} × {{orderDetail.num}}</span></p>
        <p>性&emsp;&emsp;别：<span class='content'>{{orderDetail.sex == 1? '小哥哥': '小姐姐'}}</span></p>
        <p>等&emsp;&emsp;级：<span class='content'>{{orderDetail.level_name}}</span></p>
        <p>订单类型：<span class='content'>{{orderDetail.order_type =='1'? '随机单': '指定单'}}</span></p>
        <p>价&emsp;&emsp;格：<span class='content'>{{orderDetail.price}}</span></p>
        <p class='line'>订单状态：<span class='content'>{{idToTxt(orderDetail.service_status)}}</span></p>
        <p class='line'>其他要求：<span class='content'>{{orderDetail.other_require}}</span></p>
        <!-- 待接单 已接单 已完成 -->
        <!-- <input type="button" value='开始接单'> -->
      </div>

      <!-- 联系方式 -->
      <div class="contact-info">
        <h3>联系方式</h3>
        <div class="each-contact">
          <p class='line'>微信号：<span>{{orderDetail.salesman_wechat_num}}</span></p>
          <!-- <p>QQ：<span>12345678912</span></p>
          <p>电话：<span>13800138000</span></p> -->
        </div>
      </div>

      <!-- 服务状态 -->
      <div class="order-status">
        <h3>服务状态</h3>
        <div class="each-status">
          <p><span>{{orderDetail.service_start_time}}</span><span>开始服务</span></p>
          <p><span>{{orderDetail.service_end_time}}</span><span>服务结束</span></p>
        </div>
      </div>

    </div>



    <!-- <clerk-footer :propSubject='"orderCenter"'></clerk-footer> -->
  </div>
</template>

<script>
import SwitchBtn from 'base/SwitchBtn/SwitchBtn.vue'
import ClerkFooter from 'base/ClerkFooter/ClerkFooter.vue'

import $ from 'jquery'

// 用封装好的axios
import axios from 'src/api/axios';
import Qs from 'qs';
import {BASEURL} from "src/api/config.js";

import getToken from 'src/api/getToken.js';
// import {allList} from 'src/api/mockdata.js';
import {GetQueryString, TokenError} from "src/api/utils.js";

export default {
  name: 'UserOrderdetail',
  data () {
    return {
      'orderNo': '', // 订单号
      orderDetail: [], // 订单详情
    };
  },
  props: {
    msg: String
  },
  components: {
    SwitchBtn,
    ClerkFooter
  },
  created () {
    console.log(this.$route.params.id);
    var _this = this;
    $.ajax({
      type: "POST",  
      url: BASEURL + "/get_order_detail",  
      // contentType: 'application/x-www-form-urlencoded;charset=utf-8',  
      data: {
        order_no: _this.$route.params.id,
      },  
      headers: {'token': localStorage.getItem("shiguangshudong")},
      dataType: "json",  
      success: function(res){
                  TokenError(res.code, _this); // token错误
                  if (res.code == 0) {
                    console.log('详情为：', res.data);
                    _this.orderDetail = res.data;
                  }

                },  
      error: function(e){  
                   console.log(e);
      }  
    });
  },
  mounted () {

  },
  methods: {
    getcur () {
    },
    goBack () {
      this.$router.back(-1);
    },
    idToTxt (id) {
      switch(id) {
        case '1':
            return '待接单'
            break;
        case '2':
            return '已接单未服务'
            break;
        case '3':
            return '服务中'
            break;
        case '4':
            return '服务完成'
            break;     
        default:
            return
            break;
      }
    },
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
    padding: .2rem 0;
    background-color: #97acc1;
    justify-content: center;
    position: relative;
    color: #fff;

    .go-back {
      position: absolute;
      left: .2rem;
      top: 50%;
      transform: translateY(-50%);
      i {
        padding-right: .12rem;
      }
    }

    h2 {
      font-size: .24rem;
    }

  }

  .order-detail {
    width: 6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    .each-order {
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      position: relative;
      border: $border-1px;
      /*box-shadow:$box-shadow;*/
      border-radius: .1rem;
      margin-top: .2rem;
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

    }
  }

  .contact-info {
    width: 6rem;
    flex-direction: row;
    flex-wrap: wrap;
    position: relative;
    border: $border-1px;
    /*box-shadow:$box-shadow;*/
    border-radius: .1rem;
    margin-top: .2rem;
    padding: .2rem;
    box-sizing: border-box;
    font-size: .22rem;
    line-height: 1.5;

    h3 {
      font-size: .24rem;
    }

    .each-contact {
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
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
    }



  }

  .order-status {
    width: 6rem;
    flex-direction: row;
    flex-wrap: wrap;
    position: relative;
    border: $border-1px;
    /*box-shadow:$box-shadow;*/
    border-radius: .1rem;
    margin-top: .2rem;
    padding: .2rem;
    box-sizing: border-box;
    font-size: .22rem;
    line-height: 1.5;

    h3 {
      font-size: .24rem;
    }

    .each-status {
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      p {
        width: 100%;
        color: $color-text-dd;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        line-height: 1.5;
        padding: .06rem 0;
        border-bottom: $border-1px;
        &:last-child {
          border-bottom: 0 none;
        }
        span {
          color: $color-text-d;
        }
      }      
    }
  }



}
</style>

