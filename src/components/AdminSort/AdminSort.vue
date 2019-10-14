<template>
  <div class="admin-sort">
    <!-- 业绩排名概况 -->
    <div class="sort-infos">
      <h2><i class="fa fa-bar-chart-o"></i><span>业绩排名</span></h2>
      <div class="cur-sort">
        <p>我的当前排名 <span>12</span></p>
        <p>距离前一名排名还差 ¥<span>12.0</span></p>
      </div>
      <ul>
        <li class='order-repeat'>
          <span>50%</span><span>续单率</span>
          <i class="fa fa-file-text-o"></i>
        </li>
        <li class='client-repeat'>
          <span>60%</span><span>续客率</span>
          <i class="fa fa-file-text-o"></i>
        </li>
      </ul>
    </div>

    <!-- 收入统计 -->
    <div class="total-infos">
      <h2><i class="fa fa-pie-chart" aria-hidden="true"></i><span>收入统计</span></h2>
      <ul>
        <li>
          <span>¥12.0</span><span>今日收入</span>
        </li>
        <li class='cur-week' @click='curWeekLink'>
          <span>¥12.0</span><span>本周收入&nbsp;></span>
        </li>
        <li>
          <span>¥12.0</span><span>历史收入</span>
        </li>
        <li>
          <span>¥12.0</span><span>今日接单</span>
        </li>
        <li>
          <span>¥12.0</span><span>本周接单数</span>
        </li>
        <li>
          <span>¥12.0</span><span>历史接单数</span>
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
    curWeekLink () {
      this.$router.push('/adminweek');
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "common/sass/variable.scss";
.admin-sort {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100VH;
  background-color: #d3dce3;

  .sort-infos {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #97acbf;
    color: #fff;
    padding: .4rem .3rem .4rem;
    box-sizing: border-box;
    h2 {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: .25rem;

      i {
        font-size: .33rem;
        width: .4rem;
      }
      span {
        /*font-weight: bold;*/
        margin-left: .15rem;
      }
    }
    .cur-sort {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: .2rem 0;
      p {
        &:first-child {
          margin-right: .5rem;
        }
        
      }
    }
    ul {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;


      li {
        width: 2.8rem;
        padding: .2rem;
        box-sizing: border-box;
        border-radius: .1rem;
        display: flex;
        flex-direction: column;
        font-size: .24rem;
        position: relative;

        &.order-repeat {
          background: linear-gradient(left, #efc4b9, #f7e1d3);
        }
        &.client-repeat {
          background: linear-gradient(left, #b3beae, #d0d1c1);
        }
        span {
          &:first-child {
            margin-bottom: .1rem;
            font-size: .3rem;
            font-weight: bold;
          }
        }
        i {
          position: absolute;
          bottom: .1rem;
          right: .1rem;
          font-size: .4rem;
          color: rgba(255,255,255,.3);
        }
      }
    }
  }

  .total-infos {
    width: 100%;
    display: flex;
    margin-top: .1rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: $color-text-basic;
    
    padding: .3rem .3rem;
    box-sizing: border-box;
    h2 {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: .25rem;
      margin-bottom: .1rem;
      i {
        font-size: .33rem;
        width: .4rem;
      }
      span {
        /*font-weight: bold;*/
        margin-left: .15rem;
      }
    }
    ul {
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;

      li {
        width: 1.8rem;
        padding: .25rem .2rem;
        box-sizing: border-box;
        border-radius: .1rem;
        display: flex;
        flex-direction: column;
        font-size: .24rem;
        position: relative;
        background-color: #fff;
        margin-top: .2rem;
        color: $color-text-dd;

        &.cur-week {
          color: $color-text-basic;
        }

        span {
          &:first-child {
            margin-bottom: .1rem;
            font-size: .26rem;
            font-weight: bold;
            color: $color-text-d;
          }
        }
      }
    }
  }
}
</style>
