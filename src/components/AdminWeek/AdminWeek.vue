<template>
  <div class="admin-week">
    <div class="cur-week-info" v-if='!!weekStatistics'>
      <h2>本周预计收益：</h2>
      <p class="total">{{weekStatistics.week_income}}</p>
      <div class="last-note">
        <p>上周收益： {{weekStatistics.last_week_income}}</p>
        <p style='opacity: .7'>每周日24:00前发货</p>
      </div>
    </div>

    <div class="complete-wait">
      <ul class="navs">
        <li :class="{'active': showOrderIndex == 0}" @click='tabOrder(0)'>完成</li>
        <li :class="{'active': showOrderIndex == 1}" @click='tabOrder(1)'>未完成</li>
      </ul>
      <ul class="lists" >
        <li v-for='item in showOrders'>
          <p>订单编号：<span>{{item.order_no}}</span></p>
          <p>
            订单信息：<span>{{item.service_name}} × {{item.num}}</span>
            &nbsp;&nbsp;<span>{{item.sex == '1'? '小哥哥': '小姐姐'}} {{item.level_name}} {{item.order_type =='1'? '随机单': '指定单'}}</span>
          </p>
          <p>下单时间：<span>{{item.create_time}}</span></p>
        </li>
      </ul> 
    </div>

    <!-- v-if='showOrders.length==0' -->
    <p class="no-record" v-if='showOrders.length==0'><i class="fa fa-exclamation-circle" aria-hidden="true"></i><span>暂无记录</span></p>

    <!-- 管理端公共 footer -->
    <clerk-footer :propSubject='""'></clerk-footer>

  </div>
</template>

<script>
import SwitchBtn from 'base/SwitchBtn/SwitchBtn.vue'
import ClerkFooter from 'base/ClerkFooter/ClerkFooter.vue'

import $ from 'jquery'

import {BASEURL} from "src/api/config.js";

import {GetQueryString, TokenError} from "src/api/utils.js";

import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'AdminCenter',
  data () {
    return {
      weekStatistics: null, // 本周数据
      showOrderIndex: 0, // 0 完成  1 未完成
    };
  },
  props: {
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    /*// 已经完成
    completeOrders () {
      return this.weekStatistics.completed_orders.orders;
    },
    // 未完成
    uncompleteOrders () {
      return this.weekStatistics.uncompleted_orders.orders;
    },*/
    // 展示在页面中的订单列表
    showOrders () {
      if (!this.weekStatistics) {
        return [];
      } else {
        return this.showOrderIndex == 0 ? this.weekStatistics.completed_orders.orders: this.weekStatistics.uncompleted_orders.orders;
      }
    },


  },
  components: {
    ClerkFooter
  },
  created () {
    var _this = this;
    $.ajax({
      type: "POST",  
      url: BASEURL + "/get_profit",  // 29.  获取我的收益接口
      data: {
      },  
      headers: {'token': localStorage.getItem("shiguangshudong")},
      dataType: "json",  
      success: function(res){  
        TokenError(res.code, _this); // token错误

        if (res.code == 0) {
          console.log('get_profit为：', res.data);
          _this.weekStatistics = res.data;
        }
      },  
      error: function(e){  
       console.log(e);  
      }  
    });
    // 获取用户或店员信息 先判断vuex中用户信息是否存在
    /*if (!this.userInfo) {
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
    }*/

  },

  methods: {
    ...mapActions([
      'setUserInfo'
    ]),
    // 切换订单展示
    tabOrder (index) {
      this.showOrderIndex = index;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "common/sass/variable.scss";
.admin-week {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100VH;
  background-color: #d3dce3;
  padding-top: .3rem;
  box-sizing: border-box;
  padding-bottom: 1.2rem;
  align-items: center;

  .cur-week-info {
    width: 5.8rem;
    display: flex;
    flex-direction: column;
    background-color: #fe6e63;
    border-radius: .1rem;
    color: #fff;
    padding: .5rem .3rem;
    box-sizing: border-box;
    h2 {
      font-size: .25rem;
      margin-bottom: .1rem;
    }
    .total {
      font-size: .5rem;
      font-weight: bold;
      margin-bottom: .2rem;
    }
    .last-note {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  }

  .complete-wait {
    width: 100%;
    padding-top: .4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    .navs {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      font-size: .26rem;
      font-weight: bold;
      margin-bottom: .2rem;
      
      li {
        padding: .15rem 0;
        color: $color-text-dd;
        &.active {
          color: $color-sub-red;
          border-bottom: .03rem solid $color-sub-red;
        }  
      }
    }
    .lists {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;

      li {
        width: 5.6rem;
        background-color: rgba(255,255,255,.4);
        margin-top: .15rem;
        padding: .15rem .3rem;
        box-sizing: border-box;
        color: $color-text-dd;
        border-radius: .06rem;
        line-height: 1.6;
        span {
          color: $color-text-d;
        }
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
