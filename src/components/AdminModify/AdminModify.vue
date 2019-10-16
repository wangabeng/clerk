<template>
  <div class="admin-modify">
    <div class="all-modify-lsits">
      <!-- {{userInfo}} -->

      <div class="each-modify-wrapper">
        <h2>微信号<span>*</span></h2>
        <input type="请输入您的微信号" name="" v-model='newWeixin'>
      </div>

      <div class="each-modify-wrapper">
        <h2>性别<span>*</span></h2>
        <div class="gender-wrapper">
          <label for="male"><span>男</span><input type="radio" id='male' name='gender' value='1' v-model='newSex'></label>
          <label for="famale"><span>女</span><input type="radio" id='famale' name='gender' value='2' v-model='newSex'></label>
        </div>
      </div>
     

      <div class="each-modify-wrapper">
        <h2>出生日期<span>*</span></h2>
        <div class='data-container'>
          <!-- <p class='default'>默认时间2019-10</p> -->
          <vue-datepicker-local :disabledDate="disabledDate" v-model="time" format="YYYY-MM" clearable/>
        </div>
      </div>
      <br>
      <br>
      出生年{{birth_year}}月{{birth_month}}

      <!-- <div class="each-modify-wrapper">
        <h2>所在城市<span>*</span></h2>
      </div> -->

      <div class="each-modify-wrapper">
        <h2>所在城市<span>*</span></h2>
        <div class="city-container">
          <span @click="choose" v-if='!city'>&nbsp;某地某地  修改&nbsp;</span>
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

      <!-- 城市{{city}} -->



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

    <!-- 测试区 -->
    <input type="button" value='测试获取城市' name="" @click='getCity'>


    <input type="button" value='显示citypicker' name="" @click='showCityPicker'>

    <city-picker v-if='ifShowCity' 
      @hidePicker='hidePicker' 
      @sumPicker = 'sumPicker'></city-picker>

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

import CityPicker from 'base/CityPicker/CityPicker.vue'

export default {
  name: 'AdminModify',
  components: {
    VueDatepickerLocal, //  日期选择
    VDistpicker, // 城市选择

    ClerkFooter,

    CityPicker, // 城市选择
    
  },
  data () {
    return {
      time: new Date('2019/05'), // 出生日期 初始化时间

      // 省市区选择  
      // lxr: '',
      // lxdh: '',
      show: false,
      //省市区
      province: '',
      city: '',
      area: '',
      // 省市区选择 结束


      ifSubmit: false,

      // 修改表单列表
      newWeixin: '',
      newSex: '1',
      // 新的 出生日期 见计算属性 birth_year birth_month
      // 新的 城市 city
      newTag: [], // 个人标签


      ifShowCity: false, // 是否显示城市选择器 是否隐藏 只在父元素控制


    };
  },
  props: {
  },
  computed: {
    ...mapGetters([
      'userInfo' // 原始点店员数据
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
            // 新属性的默认值设置未老数据
            // _this.res.data
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
    // 日期选择
    disabledDate(time){
      console.log('开始选择', time.getTime());
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

    // 城市选择 自定义
    getCity () {
      var _this = this;
      $.ajax({
        type: "POST",  
        url: BASEURL + "/get_areas",  // 接口14 获取城市接口
        data: {
          'parent_id': '10'
        },  
        headers: {'token': localStorage.getItem("shiguangshudong")},
        dataType: "json",  
        success: function(res){  
          TokenError(res.code, _this); // token错误

          if (res.code == 0) {
            console.log('接口14为：', res.data);
          }
        },  
        error: function(e){  
         console.log(e);  
        }  
      });
    },
    showCityPicker () {
      this.ifShowCity = !this.ifShowCity;
    },
    // 监听子元素 隐藏
    hidePicker (flag) {
      this.ifShowCity = flag;
    },
    // 子组件选择city后 获取省份结果
    sumPicker (p, c) {
      console.log(p, c);
    },
    // 城市选择 自定义 结束
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
  background-color: $color-background-d;
  padding-top: .3rem;
  box-sizing: border-box;
  align-items: center;

  .all-modify-lsits {
    width: 100%;
    display: flex;
    flex-direction: column;

    .each-modify-wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: .1rem .3rem;
      box-sizing: border-box;
      margin-bottom: .2rem;
      h2 {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: .15rem;
        font-size: .24rem;
        font-weight: bold;
      }
      >input {
        box-sizing: border-box;
        padding: .1rem;
      }

      // 日期选择
      .data-container {
        width: 100%;
        position: relative;
        .default {
          position: absolute;
          z-index: 200;
          left: .15rem;
          top: .15rem;
        }
      }

      .gender-wrapper {
        label {
          margin-right: .3rem;
        }
      }
    }

  }

}


/* 日期选择 */
.datepicker {
  width: 100%;
}
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
