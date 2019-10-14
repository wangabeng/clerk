<template>
  <div class="admin-modify">
    <div class="all-modify-lsits">
      <div class="each-modify-wrapper">
        <h2>微信号<span>*</span></h2>
        <input type="请输入您的微信号" name="">
      </div>

      <div class="each-modify-wrapper">
        <h2>性别<span>*</span></h2>
        <div class="gender-wrapper">
          <label for="male"><span>男</span><input type="radio" id='male' name='gender' value='1' v-model='sex'></label>
          <label for="famale"><span>女</span><input type="radio" id='famale' name='gender' value='2' v-model='sex'></label>
        </div>
      </div>
     

      <div class="each-modify-wrapper">
        <h2>出生日期<span>*</span></h2>
        <vue-datepicker-local :disabledDate="disabledDate" v-model="time" format="YYYY-MM" clearable/>
      </div>
      {{birth_year}}{{birth_month}}

      <!-- <div class="each-modify-wrapper">
        <h2>所在城市<span>*</span></h2>
      </div> -->

      <div class="each-input-fill form-check">
        <span class='title'  >所在城市</span>
        <div class="city-container">
          <span @click="choose" v-if='!city'>&nbsp;修改&nbsp;</span>
          <span @click="choose" v-if='city'>&nbsp;已选择&nbsp;</span>
          <span @click="choose">{{city}}</span>
           <!--省市区三级联动-->
          <div class="divwrap" v-if="show">
            <v-distpicker type="mobile" @province="onChangeProvince1" @city="onChangeCity"
                           hide-area></v-distpicker><!-- @area="onChangeArea" -->
          </div>
        </div>
        <p class="check-txt" v-if='ifSubmit && !city'>* 所在城市必填</p>
      </div>



      <div class="each-modify-wrapper">
        <h2>添加标签<span>*</span></h2>
        <ul>
          <li class="add-tag">+</li>

          <li>
            <span>标签1</span><i class="fa fa-times-circle" aria-hidden="true"></i>
          </li>
          <li>
            <span>标签1</span><i class="fa fa-times-circle" aria-hidden="true"></i>
          </li>
        </ul>
      </div>
    </div>

    <!--遮罩层 时间选择器-->
    <div class="blacks" v-if="show" @click="countermand"></div>

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

import VueDatepickerLocal from 'vue-datepicker-local'
import VDistpicker from 'v-distpicker'

export default {
  name: 'AdminModify',
  components: {
    VueDatepickerLocal, //  日期选择
    VDistpicker, // 城市选择

    ClerkFooter,
    
  },
  data () {
    return {
      time: '',

      // 省市区选择  
      // lxr: '',
      // lxdh: '',
      show: false,
      //省市区
      province: '',
      city: '',
      area: '',
      // 省市区选择 结束


      sex: '1',

      ifSubmit: false,
    };
  },
  props: {
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    birth_year () {
      if (!!this.time) {
        return this.time.getFullYear();
      } else {
        return '';
      }
    },
    birth_month () {
      if (!!this.time) {
        return this.time.getMonth() + 1;
      } else {
        return '';
      }
    },
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
    // 日期选择
    disabledDate(time){
      if(time.getTime() > new Date().getTime()) return true;
    },
    // 城市选择
    //取消选择地区
    countermand: function () {
      this.show = false
    },
    //打开选择地区
    choose: function () {
      console.log('OK');
      this.show = true;
    },
    onChangeProvince1: function (a) {
      this.province = a.value;
      if (a.value == '台湾省') {
        this.show = false;
      }
    },
    onChangeCity: function (a) {
      this.city = a.value;

      this.show = false;
      this.city = this.province + this.city + this.area;
    },
    onChangeArea: function (a) {
      this.area = a.value;
    },
    // 城市选择 结束
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "common/sass/variable.scss";
.admin-modify {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100VH;
  background-color: #d3dce3;
  padding-top: .3rem;
  box-sizing: border-box;
  align-items: center;


}


/* 日期选择 */
.date-wrapper {
  font-size: .22rem;
}
.date-wrapper .calendar-months a {
  font-size: .22rem;
}
.date-wrapper .calendar-head a {
  font-size: .22rem!important;
}




/*遮罩层*/
.blacks {
  position: fixed;
  width: 100%;
  height: 50%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.45);
}

/*省市区三级联动*/
.divwrap {
  height: 50%;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 201;
  background-color: #fff;
}

/*外部*/
.divwrap > .distpicker-address-wrapper {
  color: #0d0d0d;
  height: 100%;
  overflow-y: auto;
}

/*头部*/
.divwrap >>> .address-header {
  background: #000;
  color: #fff;
  width: 100%;
  position: fixed;
  bottom: 50%;
  height: 0.5rem;
  font-size: 0.2rem;
}

/*头部内容*/
.divwrap >>> .address-header ul li {
  flex-grow: 1;
  text-align: center;
}

/*选择过省市区的头部*/
.divwrap >>> .address-header .active {
  color: #fff;
  border-bottom: 0.05rem solid #666;
}

/*内容部分*/
.divwrap >>> .address-container {
  overflow: scroll;
  height: 100%;
}

/*点过的地区内容*/
.divwrap >>> .address-container .active {
  color: red;
}
</style>
