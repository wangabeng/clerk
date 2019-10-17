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
      <!-- 出生年{{birth_year}}月{{birth_month}} -->

      <!-- <div class="each-modify-wrapper">
        <h2>所在城市<span>*</span></h2>
      </div> -->

      <!-- <div class="each-modify-wrapper">
        <h2>所在城市<span>*</span></h2>
        <div class="city-container">
          <span @click="choose" v-if='!city'>&nbsp;某地某地  修改&nbsp;</span>
          <span @click="choose" v-if='city'>&nbsp;已选择&nbsp;</span>
          <span @click="choose">{{city}}</span>
          <div class="divwrap" v-if="show">
            <v-distpicker type="mobile" @province="onChangeProvince1" @city="onChangeCity"
                           hide-area></v-distpicker>
          </div>
        </div>
        <p class="check-txt" v-if='ifSubmit && !city'>* 所在城市必填</p>
      </div> -->

      <!-- 城市{{city}} -->


      <!-- 自定义城市选择器 -->
      <div class="each-modify-wrapper">
        <h2>所在城市<span>*</span></h2>
        <div class="origin-city"  @click='showCityPicker'>
          <p>{{newCity}}</p><p>修改</p>
        </div>
      </div>

      <!-- {{newProvince}}
      {{newProvinceId}}
      {{newCity}}
      {{newCityId}} -->

      <div class="each-modify-wrapper">
        <h2>添加标签<span>*</span></h2>
        <ul class='tag-lists'>
          <!-- 添加标签 -->
          <li class="add-tag">
            <input type="text" placeholder='输入个人标签' v-model='addOneTag'>
            <input type="button" value='+ 添加' @click='addTag'>
          </li>

          <li class='lists' v-for='(item, index) in newTag' v-if='!!newTag'>
            <span>{{item}}</span><i class="fa fa-times-circle" aria-hidden="true" @click='deleteTag(index)'></i>
          </li>
          <!-- <li class='lists'>
            <span>我是个好孩子</span><i class="fa fa-times-circle" aria-hidden="true"></i>
          </li>
          <li class='lists'>
            <span>我是个好孩子222</span><i class="fa fa-times-circle" aria-hidden="true"></i>
          </li> -->
          <li class="no-results" v-if='newTag.length==0'>暂无标签</li> <!-- v-if='!newTag' -->
        </ul>
        
      </div>
    </div>

    <!-- 提交按钮 -->
    <div class="submit-wrapper">
      <input type="button" value='确认修改' name="" @click='confirmModify'>
    </div>



    <!--遮罩层 时间选择器-->
    <div class="blacks" v-if="show" @click="countermand"></div>

    <!-- 管理端公共 footer -->
    <clerk-footer :propSubject='""'></clerk-footer>

    <!-- 测试区 -->
    <!-- <input type="button" value='测试获取城市' name="" @click='getCity'>


    <input type="button" value='显示citypicker' name="" @click='showCityPicker'> -->

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
      newSex: '',
      // 新的 出生日期 见计算属性 birth_year birth_month

      time: '', // 出生日期 初始化时间 new Date('2019/05')
      
      newCity: '', // 新的 城市 city
      newCityId: '', // 新的 城市 city_id
      newProvince: '', // 新的 省份 province
      newProvinceId: '', // 新的 省份 province_id

      newTag: [], // 个人标签
      addOneTag: '', // 添加一个标签

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
          // 修改参数初始化
          _this.newWeixin = res.data.salesman.wechat_num;
          _this.newSex = res.data.salesman.sex;
          _this.time = new Date(res.data.salesman.birth_year +'/' +  res.data.salesman.birth_month);
          _this.newCity = res.data.salesman.city;
          _this.newCityId = res.data.salesman.city_id;
          _this.newProvince = res.data.salesman.province;
          _this.newProvinceId = res.data.salesman.province_id;
          _this.newTag = res.data.salesman.character;
          for (var i = 0; i < _this.newTag.length; i++) {
            if (_this.newTag[i] == '') {
              _this.newTag.splice(i, 1);
            }
          }
          // console.log('tag', _this.newTag[0] == '');
          

        }
      },  
      error: function(e){  
       console.log(e);  
      }  
    });      

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
      var _this  = this;
      console.log(p, c);
      _this.newCity = c.area_name;
      _this.newCityId = c.id;
      _this.newProvince = p.area_name;
      _this.newProvinceId = p.id;
    },
    // 城市选择 自定义 结束

    // 添加一个个人标签
    addTag () {
      var _this = this;
      // 查看是否重复
      for (var i = 0; i < this.newTag.length; i++) {
        if (this.newTag[i] == this.addOneTag) {
          console.log('重复');
          _this.$layer.msg('标签重复');
          return;
        }
      }

      !!_this.addOneTag && this.newTag.push(_this.addOneTag);
    },
    // 删除一个标签
    deleteTag (index) {
      this.newTag.splice(index, 1);
    },
    // 确定修改 提交
    confirmModify () {
      console.log(this.newTag);
      if (this.newTag == 0) {
        this.$layer.msg('请添加个性化标签');
        return;
      }

      var _this = this;
      $.ajax({
        type: "POST",  
        url: BASEURL + "/edit_salesman",  // 27.  修改店员个人信息接口
        data: {
          'wechat_num': _this.newWeixin,
          'sex': _this.newSex,
          'birth_year': _this.birth_year,
          'birth_month': _this.birth_month,
          'province_id': _this.newProvinceId,
          'city_id': _this.newCityId,
          'character': _this.newTag.join('#'), 
        },  
        headers: {'token': localStorage.getItem("shiguangshudong")},
        dataType: "json",  
        success: function(res){  
          TokenError(res.code, _this); // token错误

          if (res.code == 0) {
            console.log('接口27为：', res.data);
            _this.$layer.msg('修改成功');
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
.admin-modify {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100VH;
  background-color: $color-background-d;
  padding-top: .3rem;
  padding-bottom: 1.8rem;
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
      margin-bottom: .25rem;
      h2 {
        width: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: .15rem;
        font-size: .24rem;
        font-weight: bold;
        span {
          padding-left: .1rem;
          color: $color-sub-red;
        }
      }
      >input {
        box-sizing: border-box;
        padding: .1rem;
        height: .6rem;
        border: $border-1px;
        border-radius: .05rem;
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

      .origin-city {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        p {
          margin-right: .2rem;
        }
      }

      .tag-lists {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        li {
          margin-bottom: .25rem;
          &.add-tag {
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            border: $border-1px;
            border-radius: .05rem;
            input:first-child {
              flex: 1;
              padding: .1rem;
              height: .6rem;
              box-sizing: border-box;
              border-left-top-radius: .05rem;
              border-left-bottom-radius: .05rem;
            }
            input:last-child {
              display: inline-flex;
              width: 1rem;
              height: .6rem;
              align-items: center;
              justify-content: center;
              border-right-top-radius: .05rem;
              border-right-bottom-radius: .05rem;

            }

          }
          &.lists {
            margin-right: .3rem;
            padding: .06rem;
            border-radius: .05rem;
            background-color: #fff;
            border: $border-1px;
            position: relative;
            i {
              position: absolute;
              top: -.1rem;
              right: -.1rem;
              color: #f0ad4e;
            }
          }
          // 暂无标签
          &.no-results {
            width: 100%;
            padding: .2rem .1rem;
            box-sizing: border-box;
            font-size: .23rem;
            color: $color-text-d;
          }

        }


      }

    }

  }

  .submit-wrapper {
    width: 100%;
    display: flex;
    position: fixed;
    left: 0;
    bottom: 1.2rem;
    align-items: center;
    justify-content: center;
    padding: 0.1rem 0;
    margin-top: .2rem;
    input {
      font-size: 0.28rem;
      background-color: #ee0d2d;
      color: #fff;
      width: 5.8rem;
      padding: 0.15rem 0;
      border-radius: 0.06rem;
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
