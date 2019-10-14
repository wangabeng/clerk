<template>
  <div class="admin-week">
    <div class="cur-week-info">
      <h2>本周预计收益：</h2>
      <p class="total">0.00</p>
      <div class="last-note">
        <p>上周收益： 0.00</p>
        <p style='opacity: .7'>每周日24:00前发货</p>
      </div>
    </div>

    <div class="complete-wait">
      <ul class="navs">
        <li class='active'>完成</li>
        <li>未完成</li>
      </ul>
      <ul class="lists">
        <li>
          <p>订单编号：<span>abdbdbdbdddddd</span></p>
          <p>下单时间：<span>abdbdbdbdddddd</span></p>
        </li>
        <li>
          <p>订单编号：<span>abdbdbdbdddddd</span></p>
          <p>下单时间：<span>abdbdbdbdddddd</span></p>
        </li>
      </ul> 
    </div>

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
    };
  },
  props: {
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),

  },
  components: {
    ClerkFooter
  },
  created () {
    var _this = this;
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
</style>
