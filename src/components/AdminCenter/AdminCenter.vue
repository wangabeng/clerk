<template>
  <div class="admin-center">
    <div class="option-wrapper"  v-if='userInfo'>
      <!-- <div class="each-line-switch">
        <span>接受随机单提醒</span>
        <switch-btn ref='btnComponent1' :propStatus='false'></switch-btn>
      </div> -->
      <div class="each-line-switch">
        <span>语音连麦</span>
        <switch-btn ref='btnComponentSound' 
          :propStatus='userInfo.salesman.is_voice == 1? true: false' 
          @switchFunction = "tabSound"></switch-btn>
      </div>
      <div class="each-line-switch">
        <span>在线</span>
        <switch-btn ref='btnComponentOnline' 
          :propStatus='userInfo.salesman.is_online == 1? true: false' 
          @switchFunction = "tabOnline"></switch-btn>
      </div>
    </div>

    <!-- 导航列表 -->
    <ul class="nav-lists">
      <li @click='adminSortLink'>
        <i class="fa fa-bar-chart" aria-hidden="true"></i>
        <span>我的排名及收入</span>
        <i class="fa fa-angle-right" aria-hidden="true"></i>
      </li>
      <li @click='adminModifyLink'>
        <i class="fa fa-address-card-o" aria-hidden="true"></i>
        <span>修改个人信息</span>
        <i class="fa fa-angle-right" aria-hidden="true"></i>
      </li>
      <li @click='allOrder'>
        <i class="fa fa-wpforms"></i>
        <span>全部订单</span>
        <i class="fa fa-angle-right" aria-hidden="true"></i>
      </li>
      <!-- <li>
        <i class="fa fa-line-chart"></i>
        <span>平台数据统计</span>
        <i class="fa fa-angle-right" aria-hidden="true"></i>
      </li> -->
      <li @click='placeOrderLink'>
        <i class="fa fa-shopping-bag" aria-hidden="true"></i>
        <span>我要下单</span>
        <i class="fa fa-angle-right" aria-hidden="true"></i>
      </li>
    </ul>

    <!-- 测试区 -->
    <!-- <input type="button" name="" value='test' @click='getcur'> -->

    <!-- 管理端公共 footer -->
    <clerk-footer :propSubject='"adminCenter"'></clerk-footer>
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
    msg: String
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    ifSound () {
      // return this.$refs.btnComponentSound && this.$refs.btnComponentSound.curStatus;
    },
    ifOnline () {
      // return this.$refs.btnComponentOnline.curStatus;
    },
  },
  components: {
    SwitchBtn,
    ClerkFooter
  },
  created () {
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

  methods: {
    ...mapActions([
      'setUserInfo'
    ]),
    getcur () {
      console.log('dangqian开关', this.$refs.btnComponentOnline.curStatus);
    },
    // 点击进入全部订单
    allOrder () {
      this.$router.push('/ordercenter');
    },
    // 点击进入个人排名页
    adminSortLink () {
      console.log('add');
      this.$router.push('/Adminsort');
    },
    // 修改店员个人信息
    adminModifyLink () {
      this.$router.push('/adminmodify');
    },
    // 点击我要下单
    placeOrderLink () {
      this.$router.push('/clerklists');
    },
    // 监听连麦
    tabSound (data) {
      var _this = this;
      console.log('父组件监听到：', data);
      var soundStatus = data ? 1: 2;
      // ajax请求 改变连麦状态
      $.ajax({
        type: "POST",  
        url: BASEURL + "/set_voice",  // 接口21 token获取用户信息
        data: {
          is_voice: soundStatus,
        },  
        headers: {'token': localStorage.getItem("shiguangshudong")},
        dataType: "json",  
        success: function(res){  
          TokenError(res.code, _this); // token错误

          if (res.code == 0) {
            console.log('连麦修改为：', res.data);
            // 修改vuex的连麦状态
            _this.userInfo.salesman.is_voice = soundStatus;
            console.log(_this.userInfo.salesman.is_voice);
          }
        },  
        error: function(e){  
         console.log(e);  
        }  
      });
    },
    // 监听是否在线
    tabOnline (data) {
      var _this = this;
      console.log('tabOnline父组件监听到：', data);
      var ifOnStatus = data ? 1: 2;
      // ajax请求 改变连麦状态
      $.ajax({
        type: "POST",  
        url: BASEURL + "/set_online",  // 接口21 token获取用户信息
        data: {
          is_online: ifOnStatus,
        },  
        headers: {'token': localStorage.getItem("shiguangshudong")},
        dataType: "json",  
        success: function(res){  
          TokenError(res.code, _this); // token错误

          if (res.code == 0) {
            console.log('在线状态改为：', res.data);
            // 修改vuex的在线状态
            _this.userInfo.salesman.is_online = ifOnStatus;
            console.log(_this.userInfo.salesman.is_online);
          }
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
.admin-center {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .option-wrapper {
    background-color: #97acbf;
    width: 100%;
    display: flex;
    flex-direction:column;
    align-items: flex-end;
    padding: .3rem 0;

    .each-line-switch {
      display: flex;
      align-items: center;
      margin: .15rem 0;
      color: #fff;
      font-size: .23rem;
    }
  }

  .nav-lists {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    li {
      width: 100%;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: .15rem .2rem;
      color: $color-text-dd;
      margin-top: .15rem;
      font-size: .24rem;
      span {
        font-weight: bold;
      }
      i {
        &:first-child {
          width: .4rem;
        }
        &:last-child {
          margin-left: auto;
          font-size: .3rem;
        }
      }
    }
  }
}
</style>
