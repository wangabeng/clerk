<template>
  <div id="apply-new">
    <!-- 申请说明 -->
    <div class="apply-info">
      <h3>新店员申请资料</h3>
      <p>如果你也想成为我们的一份子，请认真填写下面的表格，以及收录自己的语音资料。资料通过后，我们的审核人员会在2-5天内添加你的微信，请耐心等候。</p>
    </div>

    <!-- 信息填写区 -->
    <div class="info-fill-wrapper">
      <div class="each-input-fill form-check">
        <span class='title'>昵称</span>
        <input type="text" class='fill-input' placeholder="请输入圈名" v-model='nick_name'>
        <p class="check-txt" v-if='ifSubmit && !nick_name'>* 昵称必填</p>
      </div>

      <div class="each-input-fill form-check">
        <span class='title'>选择性别</span>
        <div class="gender-wrapper">
          <label for="male" class='male'>
            <span>男</span>
            <i class="fa fa-check-circle" aria-hidden="true"  v-if='sex=="1"'></i>
            <i class="fa fa-circle-thin" aria-hidden="true" v-if='sex==""||sex!="1"'></i>
            <input type="radio" id='male' name='gender' value='1' v-model='sex'>
          </label>
          <label for="famale" class='famale'>
            <span>女</span>
            <i class="fa fa-check-circle" aria-hidden="true"  v-if='sex=="2"'></i>
            <i class="fa fa-circle-thin" aria-hidden="true" v-if='sex==""||sex!="2"'></i>
            <input type="radio" id='famale' name='gender' value='2' v-model='sex'>
          </label>
        </div>
        <p class="check-txt" v-if='ifSubmit && !sex'>* 性别必填</p>
      </div>
      <!-- {{sex}} -->

      <div class="each-input-fill form-check" >
        <span class='title'>出生年月</span>
        <!-- <div class="date-wrapper">
          <vue-datepicker-local :disabledDate="disabledDate" v-model="time" format="YYYY-MM" clearable/>
        </div> -->
        <div class='slider-date-picker' @click='showSliderPicker'>
          <span v-if='!picker.sliderMonth'>请选择&nbsp;</span>
          <span v-if='picker.sliderMonth'>已选择&nbsp;</span>
          <span>{{picker.sliderYear}}{{picker.sliderMonth}}</span>
        </div>
        <p class="check-txt" v-if='ifSubmit && !picker.sliderYear && !picker.sliderMonth'>* 出生年月必填</p>
      </div>
      <!-- {{birth_year}} and {{birth_month}} -->
      <!-- {{picker.sliderYear}} and {{picker.sliderMonth}} -->

      <div class="each-input-fill form-check">
        <span class='title'>声线类型</span>
        <input type="text" class='fill-input' placeholder="请输入声线类型" v-model="voice_type">
        <p class="check-txt" v-if='ifSubmit && !voice_type'>* 声线类型必填</p>
      </div>
      <!-- {{voice_type}} -->

      <div class="each-input-fill form-check">
        <span class='title'>在线时间</span>
        <input type="text" class='fill-input' placeholder="请输入在线时间" v-model="online_time">
        <p class="check-txt" v-if='ifSubmit && !online_time'>* 在线时间必填</p>
      </div>
      <!-- {{online_time}} -->

      <!-- <div class="each-input-fill form-check">
        <span class='title'  >所在城市</span>
        <div class="city-container">
          <span @click="choose" v-if='!city'>&nbsp;请选择&nbsp;</span>
          <span @click="choose" v-if='city'>&nbsp;已选择&nbsp;</span>
          <span @click="choose">{{city}}</span>
          <div class="divwrap" v-if="show">
            <v-distpicker type="mobile" @province="onChangeProvince1" @city="onChangeCity"
                           hide-area></v-distpicker>
          </div>
        </div>
        <p class="check-txt" v-if='ifSubmit && !city'>* 所在城市必填</p>
      </div> -->
      <!-- {{city}} -->




      <!-- 自定义城市选择器 -->
      <div class="each-input-fill form-check">
        <span class='title'  >所在城市</span>
        <div class="city-container"  @click='showCityPicker'>
          <span v-if='!newCity'>请选择&nbsp;</span>
          <span v-if='newCity'>已选择&nbsp;</span>
          <span>{{newCity}}</span>
        </div>
        <p class="check-txt" v-if='ifSubmit && !newCityId'>* 所在城市必填</p>
      </div>
      <!-- {{newProvince}}{{newCity}} -->





      <div class="each-input-fill form-check">
        <span class='title'>技能特长</span>
        <input type="text" class='fill-input' placeholder="有哪方面的技能或特长" v-model="specialty">
        <p class="check-txt" v-if='ifSubmit && !specialty'>* 技能或特长必填</p>
      </div>
      <!-- {{specialty}} -->

      <div class="each-input-fill form-check">
        <span class='title'>相关经验</span>
        <input type="text" class='fill-input' placeholder="是否有其他店铺的经验" v-model="experience">
        <p class="check-txt" v-if='ifSubmit && !experience'>* 是否有其他店铺的经验必填</p>
      </div>
      <!-- {{experience}} -->

      <div class="each-input-fill form-check">
        <span class='title'>擅长游戏</span>
        <input type="text" class='fill-input' placeholder="擅长的游戏" v-model="game">
        <p class="check-txt" v-if='ifSubmit && !game'>* 擅长的游戏必填</p>
      </div>
      <!-- {{game}} -->

      <div class="each-input-fill form-check">
        <span class='title'>微信号</span>
        <input type="text" class='fill-input' placeholder="请输入微信号" v-model='wechat_num'>
        <p class="check-txt" v-if='ifSubmit && !wechat_num'>* 微信号必填</p>
      </div>
      <!-- {{wechat_num}} -->

    </div>

    <!-- 录音 -->
    <div class="record-audio">
      <h3>录音（15秒内）&nbsp;<span v-if='ifSubmit && !serverId'>录音必须</span></h3>
      <!-- 录音按钮 -->
      <div class="new-record" v-if='firstFlag'>
        <input  id='newAudio' type="button" value='录音'>
      </div>

      <!-- 播放 重新录音 -->
      <div class="play-reset" v-if='!firstFlag'>
        <!-- 播放 -->
        <div v-if='!firstFlag &&!ifWorking&&!ifPlaying' class="input-btn" id='playAudio' >
          <i class="fa fa-volume-up" aria-hidden="true"></i>
          <span>播放录音</span>
        </div>
        <!-- 停止播放 -->
        <div v-if='ifPlaying' class="input-btn" id='stopPlay'>
          <i class="bg"></i>
          <span>停止播放</span>
        </div>
        <!-- 重新录音 -->
        <input v-if='!firstFlag &&!ifWorking' class='reset' id='resetAudio' type="button" value='重新录音'>
      </div>
    
    </div>

     <!-- 录音弹出层  v-if='ifWorking' -->
    <div class="count-stop-layer" v-if='ifWorking'>
      <div class="inner-container">
        <h3>正在录音中...</h3>
        <H4 >还有{{COUNT_START}}秒自动停止</H4>
        <input  id='stopAudio' type="button" value='停止录音'>
      </div>
    </div>


    <!-- 上传图片 -->
    <div class="upload-pic">
      <div class="title form-check">
        <h4>上传图片</h4>
        <p><span class='alert' ref='limitTxt' v-if='uploadArr.length == UPLOAD_LIMIT'>最多上传{{UPLOAD_LIMIT}}张</span><span class='total'>{{uploadArr.length}}/{{UPLOAD_LIMIT}}</span></p>
        <p class="check-txt" v-if='ifSubmit && uploadArr.length==0'>请上传1-4张照片</p>
      </div>
      <ul>
        <!-- 上传按钮 -->
        <li class='btn' :class="{'disable': uploadArr.length == UPLOAD_LIMIT?true: false}">
          <label for="uploadFile">+</label>
          <input type="file" class="form-control-file" style='display: none' id="uploadFile" @change="uploadFile($event)" :disabled="uploadArr.length == UPLOAD_LIMIT?true: false" />
        </li>
        <!-- 照片展示 -->
        <li class='list' v-for='(item, index) in uploadArr' v-if='uploadArr.length' 
          :style="{backgroundImage:'url(' + item + ')'}">
          <!-- <img :src="item" alt=""> -->
          <i class="fa fa-times delete-icon" aria-hidden="true" @click='cancel(index)'></i>
        </li>
        
      </ul>
    </div>

    <!-- 接单类型 -->
    <div class="order-type">
      <h4 class='form-check'><span>接单类型（多选）</span><span class='check-txt' v-if='ifSubmit && types.length==0'>* 接单类型 必填</span></h4>
      <label v-if='allTypes' :for='item.id' v-for='item in allTypes'>
        <i class="fa fa-check-square" aria-hidden="true" style='color: #06b1e5' v-if='types.indexOf(item.id)>-1'></i>
        <i class="fa fa-square-o" aria-hidden="true" v-if='types.indexOf(item.id)==-1'></i>
        <input type="checkbox"  :id='item.id' :value='item.id' v-model='types' style='display: none'>
        <span>{{item.service_name}}</span>
      </label><!-- 
      <label for="yuyintonghua">
        <input type="checkbox"  id='yuyintonghua' value='2' v-model='types'>
        <span>语音通话</span>
      </label>
      <label for="youxi">
        <input type="checkbox"  id='youxi' value='3' v-model='types'>
        <span>游戏陪玩</span>
      </label>
      <label for="连麦哄睡">
        <input type="checkbox"  id='连麦哄睡' value='4' v-model='types'>
        <span>文字语音条</span>
      </label> -->
      <!-- {{types}} -->
    </div>
    <!-- {{types}} -->

    <!-- 日期滑动区域 -->
    <awesome-picker
      ref="picker"
      :data="picker.data"
      :anchor="picker.anchor" 
      :colorConfirm='picker.confirmColor'

      @cancel="handlePickerCancel"
      @confirm="handlePickerConfirm">
    </awesome-picker>
    <!-- <input type="button" name="" value='测试' @click='showSliderPicker'> -->
    <!-- 日期滑动区域 结束 -->

    <!-- 提交申请 -->
    <div class="apply-now">
      <input class='place-btn' type="button" 
        value='提交申请' @click='applyNewSubmit'>
    </div>
  
    <!-- 测试按钮 -->
    <!-- <input type="button" @click='insertOne' value='测试插入数据'> -->

    <city-picker v-if='ifShowCity' 
      @hidePicker='hidePicker' 
      @sumPicker = 'sumPicker'></city-picker>
    


<!--遮罩层 时间选择器-->
<div class="blacks" v-if="show" @click="countermand"></div>




  </div>
</template>

<script>
// import {mapGetters, mapActions} from 'vuex'
import $ from 'jquery'

// 每个页面都引入微信sdk 但是配置config参数设置成全局的
import wx from 'weixin-js-sdk'


import VueDatepickerLocal from 'vue-datepicker-local'
import VDistpicker from 'v-distpicker'
// import { Area } from 'vant';
import {GetSign} from "src/api/utils.js";

// 用封装好的axios
import axios from 'src/api/axios';
import Qs from 'qs';
import {BASEURL} from "src/api/config.js";


import getToken from 'src/api/getToken.js';
import {GetQueryString, SaveStorage, TokenError} from "src/api/utils.js";

import layer from 'vue-layer'
import 'vue-layer/lib/vue-layer.css';

import CityPicker from 'base/CityPicker/CityPicker.vue'

// 生成时间及日期
console.log('时间：', typeof new Date().getFullYear());
var curYear = new Date().getFullYear();
var yearArr = [];
var fullYear = 80;
for (var i = 0; i < fullYear; i++) {
  yearArr.push(curYear - i + '年');
}
var MonthArr = ['12月', '11月', '10月', '9月', '8月', '7月', '6月', '5月', '4月', '3月', '2月', '1月'];
/*console.log(yearArr, MonthArr);
console.log(parseInt("12月"));*/
// 生成时间及日期 结束

export default {
  name: 'ApplyNew',
  components: {
    VueDatepickerLocal, //  日期选择
    VDistpicker, // 城市选择

    CityPicker, // 城市选择

    // VuePicker, // 滑动版 时间选择器
    
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

      'uploadfile': '', //  文件图片上传
      'uploadArr': [], // 上传的图片列表
      'UPLOAD_LIMIT' : 4, // 最多上传四张
      'curLoadFlag': false,

      // 提交表单数据
      nick_name: '', // 昵称
      sex: '', // 性别
      // birth_year: 'ddd', // 出生年 计算属性中
      // birth_month: '', // 出生月 计算属性中
      voice_type: '', // 声线类型
      online_time: '', //
      // province_id: '', // 见 data
      // city_id: '', // 见 data
      specialty: '', //
      experience: '', //
      game: '', //
      wechat_num: '', //
      audio_url: 'https://www.w3school.com.cn/i/horse.ogg', // 上传到服务器中的audio的url地址
      // image_urls: [], // 见 uploadArr
      types: [], //
      // 提交表单数据结束

      COUNT_START: 15, // 倒计时
      firstFlag: true, // 是否是第一次录音
      ifWorking: false, // 是否正在录音

      weixinConfig: null, // 微信配置

      ifPlaying: false, // 是否正在播放

      ifSubmit: false, // 提交flag 一旦提交 就执行表单验证

      allTypes: [],  // 17.  获取所有接单类型接口  {"id": "1","service_name": "文字语音条"}


      newCity: '', // 新的 城市 city
      newCityId: '', // 新的 城市 city_id
      newProvince: '', // 新的 省份 province
      newProvinceId: '', // 新的 省份 province_id

      ifShowCity: false, // 是否显示城市选择器 是否隐藏 只在父元素控制

      serverId: '', // 微信录音serverId号 20191027添加

      // 滑动版时间选择器
      picker: {
        data: [
          yearArr, MonthArr
        ],
        anchor: [
          { 
            // index: 1,
            value: '2019年'
          },
          {
            // index: 1,
            value: '12月'
          } 
        ],
        confirmColor: '#03afe1',
        sliderYear: '',
        sliderMonth: '',
      }

      // 滑动版时间选择器 结束

    }
  },
  watch: {
    /*time (newValue, oldValue) {
      console.log(newValue.getFullYear());
    },*/
  },
  computed: {
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
  props: ['ips'],
  methods: {
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

    // 普通上传文件 图片上传
    uploadFile (event) {
      // 如果已经有4张了 就提示最多上传4张
      if (this.uploadArr.length == this.UPLOAD_LIMIT) {
        this.curLoadFlag = true;
        var timer = null;
        timer = setTimeout(function () {
          this.curLoadFlag = false;
          clearTimeout(timer);
        }, 1000);
        return;
      }

      var _this = this;

      console.log('图片上传kaishi');

      this.file = event.target.files[0];

      let param = new FormData();
      // param.append("name", "wiiiiiinney");
      //通过append向form对象添加数据
      param.append("file", this.file);

      // 成功
      $.ajax({
          url: BASEURL + '/upload_file',
          type: "post",
          dataType: "json",
          data: param,
          async: false,
          contentType: false,
          processData: false,
          headers: {'token': localStorage.getItem("shiguangshudong")},
          success: function (res) {
            TokenError(res.code, _this); // token错误
            if (res.code == 0) {
              console.log(res.data.file);
              _this.uploadArr.push(res.data.file);              
            }

          },
          error: function(e){  
            console.log(e);  
          }  
      });

    },
    // 删除上传的图片
    cancel (index) {
      this.uploadArr.splice(index, 1); // 删除当前图片
    },
    // 提交注册信息
    applyNewSubmit () {
      this.ifSubmit = true;
      // 如果有表单为空的 
      var _this = this;
      // !this.types || 
      /*console.log('表单数据', !this.nick_name , !this.sex , !this.birth_year  , !this.birth_month  , !this.voice_type , !this.online_time  , !this.newCityId , !this.experience  , !this.game , !this.wechat_num  , this.types.length==0 , !this.serverId);*/
      if (!this.nick_name || !this.sex || !this.picker.sliderYear  || !this.picker.sliderMonth  || !this.voice_type || !this.online_time  || !this.newCityId || !this.experience  || !this.game || !this.wechat_num  || this.types==0 || !this.serverId) {
        // 如果数据为空
        return;        
      } 
      this.insertOne();
      /*
      if (!!this.nick_name && !!this.sex && !!this.birth_year  && !!this.birth_month  && !!this.voice_type && !!this.online_time  && !!this.city_id && !!this.experience  && !!this.game && !!this.wechat_num  && !!this.types && !!this.serverId) {
        // 如果有数据为空 就把警告开关打开
        this.ifSubmit = true;
        // 提交注册
        
      } else {
        this.insertOne();
      }*/
    },
    // 插入一条数据 提交新店员申请
    insertOne () {
      var _this = this;
      $.ajax({
        type: "POST",  
        url: BASEURL + "/apply",  
        contentType: 'application/x-www-form-urlencoded;charset=utf-8',  
        data: {
          nick_name: _this.nick_name, // 昵称
          sex: _this.sex, // 性别
          // birth_year: _this.birth_year, // 出生年 计算属性中
          // birth_month: _this.birth_month, // 出生月 计算属性中
          birth_year: parseInt(_this.picker.sliderYear), // 出生年 计算属性中
          birth_month: parseInt(_this.picker.sliderMonth), // 出生月 计算属性中
          voice_type: _this.voice_type, // 声线类型
          online_time: _this.online_time, //
          // province_id: _this.province, // 见 data
          // city_id: _this.city, // 见 data

          province_id: _this.newProvinceId, // 见 data
          city_id: _this.newCityId, // 见 data
          specialty: _this.specialty, //
          experience: _this.experience, //
          game: _this.game, //
          wechat_num: _this.wechat_num, //
          // audio_url:  _this.audio_url, // 'https://www.w3school.com.cn/i/horse.ogg', // 上传到服务器中的audio的url地址
          serverid:  _this.serverId, // 20191027添加 录音的weixinid

          image_urls: _this.uploadArr.join(), // 见 uploadArr
          types: _this.types.join(), //
        },  
        headers: {'token': localStorage.getItem("shiguangshudong")},
        dataType: "json",  
        success: function(res){
                    TokenError(res.code, _this); // token错误
                    console.log(res.data);
                    if (res.code == 0) {
                      _this.$layer.alert("恭喜 申请提交成功！");
                    }
                    
                  },  
        error: function(e){  
                     console.log(e);  
        }  
      });   
    },

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


    // 滑动版时间选择器
    showSliderPicker() { // 显示隐藏日期选择器滑动
      this.$refs.picker.show();
    },
    handlePickerConfirm (value) { // 确认
      console.log(value);
      this.picker.sliderYear = value[0].value;
      this.picker.sliderMonth = value[1].value;
    },
    handlePickerCancel () { // 取消
      // 
    },
    // 滑动版时间选择器 结束




  },
  beforeCreate () {
    var _this = this;
    // 17.  获取所有接单类型接口
    $.ajax({
       type: "POST",  
       url: BASEURL + "/get_all_types",  
       contentType: 'application/x-www-form-urlencoded;charset=utf-8',  
       headers: {'token': localStorage.getItem("shiguangshudong")},
       dataType: "json",  
       success: function(res){  
                  console.log("接口17成功");  
                  TokenError(res.code, _this); // token错误
                  if (res.code == 0) {
                    console.log(res.data);
                    _this.allTypes = res.data;
                    console.log("接口17 结束", _this.allTypes);                    
                  }

                },  
       error: function(e){  
                   console.log(e);  
       }  
    });
  },
  created () {
    var _this = this;
    //console.log('abc', this.getWeixinConfig());
    // this.getWeixinConfig();
    // 获取微信config
    // 测试layer
    getSignnature();
    // 通过本地存储的token 获取签名
    function getSignnature () {
      var curUrl = window.location.href.split('#')[0];

      $.ajax({
        type: "POST",  
        url: BASEURL + "/get_sign_package",  
        contentType: 'application/x-www-form-urlencoded;charset=utf-8',  
        data: {url: curUrl},  
        headers: {'token': localStorage.getItem("shiguangshudong")},
        dataType: "json",  
        success: function(res){  
                    console.log("成功");
                    TokenError(res.code, _this); // token错误
                    console.log(res.data); // {"appId":"wxa3c69deeaa1b4948","nonceStr":"6ik7gYKkou3YddEa","timestamp":1569467461,"url":"http:\/\/localhost:8080\/","signature":"2b33114b8ab49383092189f69226cf64c0c40336","rawString"
                    // 处理签名
                    // weixinConfig
                    // var {appId, nonceStr, timestamp, signature} = res.data;
                    _this.weixinConfig = {
                      // 'debug': true,
                      'appId': res.data.appId,
                      'nonceStr': res.data.nonceStr,
                      'timestamp': res.data.timestamp,
                      'signature': res.data.signature,
                      'jsApiList': [
                        'translateVoice',
                        'startRecord',
                        'stopRecord',
                        'onRecordEnd',
                        'playVoice',
                        'pauseVoice',
                        'stopVoice',
                        'uploadVoice',
                        'downloadVoice'
                      ]
                    };


                    // 微信配置
                    wx.config(_this.weixinConfig);

                    /*wx.config({
                      debug: true,
                      "appId":"wxa3c69deeaa1b4948","nonceStr":"7BDmr9cf93H0i8xM","timestamp":1569674579,"signature":"52dd0deb0cce4c596f03a9d5e7fa670631dd68c8",
                      jsApiList: [
                        'translateVoice',
                        'startRecord',
                        'stopRecord',
                        'onRecordEnd',
                        'playVoice',
                        'pauseVoice',
                        'stopVoice',
                        'uploadVoice',
                        'downloadVoice'
                      ]
                    });*/

                    
                    //
                    console.log('动态配置如下：', _this.weixinConfig, '动态配置结束');
                  },  
        error: function(e){  
                     console.log(e);  
        }  
      });      
    }

    // 获取签名 结束


    // 获取签名 结束
  },
  mounted () {
    var _this = this;
    console.log(window.location.href);


    //wx.config(_this.weixinConfig);

    // wx.ready后绑定事件
    wx.ready(function(){
      console.log('微信配置好了');


      // 3 智能接口
      var voice = {
        localId: '',
        serverId: ''
      };
      var timer = null; // 录音定时器
      // _this.ifWorking; // 是否正在录音
      var countTimer = null;
      

      // 新建录音 开始录音 15秒后自动结束
      $(document).on("click", "#newAudio", function(){
        beginRecord();
      });
      // 重新录音
      $(document).on("click", "#resetAudio", function(){
        beginRecord();
      });

      function beginRecord () {
        // 一旦打开 
        _this.firstFlag = false;

        _this.ifWorking = true;
        // 开始录音 切倒计时
        countTimer = setInterval(function () {
          console.log(_this.COUNT_START);
          if (_this.COUNT_START == 0) {
            clearInterval(countTimer); // 停止倒计时
          } else {
            --_this.COUNT_START;
          }
        }, 1000);

        wx.startRecord({
          success: function () {

          },
          cancel: function () {
            // alert('用户拒绝授权录音');
          }
        });

        timer = setTimeout(function () {
          // 自动停止录音
          if (_this.COUNT_START == 0) {
            endAudio();
          }
        }, 15000);

      };

      // 手工停止录音
      $(document).on("click", "#stopAudio", function(){
        endAudio();
      });

      function endAudio () {
        console.log("录音停止");
        _this.ifWorking = false;
        _this.COUNT_START = 15;
        clearTimeout(timer); // 清除录音定时器
        clearInterval(countTimer); // 停止倒计时

        wx.stopRecord({
          success: function (res) {
            voice.localId = res.localId;
            // 录音成功后先上传到微信服务器 然后上传到自己的服务器

            console.log("停止录音 未上传");

            uploadVoice();
          },
          fail: function (res) {
            // alert(JSON.stringify(res));
          }
        });
      };

      //上传录音  (暂时不上传 仅仅是传给全局serverId)把微信录音的serverId传递给 serverId
      function uploadVoice(){
        //调用微信的上传录音接口把本地录音先上传到微信的服务器
        //不过，微信只保留3天，而我们需要长期保存，我们需要把资源从微信服务器下载到自己的服务器
        wx.uploadVoice({
          localId: voice.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function (res) {
            //把录音在微信服务器上的id（res.serverId）发送到自己的服务器供下载。
            // TokenError(res.code, _this); // token错误
            console.log("微信录音上传结果：");
            console.log(res);

            _this.serverId = res.serverId;
            console.log("微信录音上传结果_this.serverId：", _this.serverId);

            // ajax上传微信语音文件
            // var file = event.target.files[0];
            // let param = new FormData();
            // param.append("name", "wiiiiiinney");
            //通过append向form对象添加数据
            // param.append("serverId", res.serverId);

            /*$.ajax({
                url: BASEURL + '/upload_file',
                type: "post",
                dataType: "json",
                data: param,
                async: false,
                contentType: false,
                processData: false,
                headers: {'token': GetStorage("userinfo").token},
                success: function (res) {
                  console.log(res.data.file);
                  _this.uploadArr.push(res.data.file);
                },
                error: function(e){  
                  console.log(e);  
                }  
            });*/



          }
        });
      }

      // 播放录音
      $(document).on("click", "#playAudio", function(){
        _this.ifPlaying = true;
        if (voice.localId == '') {
          // alert('请先使用 startRecord 接口录制一段声音');
          return;
        }
        wx.playVoice({
          localId: voice.localId
        });
      });

      // 停止播放音频
      $(document).on("click", "#stopPlay", function(){
        _this.ifPlaying = false;
        wx.stopVoice({
          localId: voice.localId
        });
      });

      // 监听播放停止
      wx.onVoicePlayEnd({
        complete: function (res) {
          _this.ifPlaying = false;
          // alert('录音（' + res.localId + '）播放结束');
        }
      });


      // 绑定开始

      // 绑定结束

    });
    // wx.ready后绑定事件 结束
  }
}
</script>

<style scoped lang="scss">
@import "common/sass/variable.scss";
@import "common/sass/mixin.scss";

#apply-new {
  width: 6.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: $color-background-d;
  padding-bottom: .4rem;

  .apply-info {
    width: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: .3rem;
    background-color: #fff;
    h3 {
      width: 100%;
      box-sizing: border-box;
      padding: .2rem 0 .2rem;
      font-size: .26rem;
      font-weight: bold;
      text-align: center;
    }
    >p {
      width: 100%;
      box-sizing: border-box;
      line-height: 1.3;
    }
  }

  .info-fill-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    margin-top: .3rem;
    font-size: .22rem;

    .each-input-fill {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: .2rem .3rem;
      box-sizing: border-box;
      border-bottom: $border-1px;
      .title {
        display: inline-flex;
        width: 1.4rem;


      }
      input.fill-input {
        flex: 1;
        padding: .1rem .1rem;
        box-sizing: border-box;
        font-size: .22rem;
      }

      .gender-wrapper {
        flex: 1;
        box-sizing: border-box;
        padding-left: .1rem;
        label {
          margin-right: .3rem;
          margin-right: .3rem;
          padding: .08rem .15rem;
          border-radius: .05rem;
          &.male {
            border: 1px solid #0181d2;
            i {
              color: #0181d2;
            }
          }
          &.famale {
            border: 1px solid #bb527b;
            i {
              color: #bb527b;
            }
          }
          i {
            margin-left: .12rem;
            font-size: .26rem;
          }
          input {
            display: none;
          }
        }
      }
      .date-wrapper {
        flex: 1;
      }
      .city-container {
        flex: 1;
        box-sizing: border-box;
        padding-left: .1rem;
      }
      .slider-date-picker {
        flex: 1;
        box-sizing: border-box;
        padding-left: .1rem;
      }
    }
  }

  .record-audio {
    margin-top: .3rem;
    width: 100%;
    background-color: #fff;
    width: 100%;
    padding: .2rem .3rem;
    box-sizing: border-box;
    h3 {
      line-height: 1.5;
      span {
        color: #d60000;
        display: inline-flex;
        transform: scale(0.8);     
      }
    }
    
    // 新录音
    .new-record {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      padding: .15rem 0;
      input {
        width: 5.8rem;
        padding: .17rem 0;
        border-radius: .3rem;
        background-color: #5cb85c;
        color: #fff;
      }

    }
    /* 播放录音 */
    .play-reset {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: .15rem 0;
      .input-btn {
        width: 2.6rem;
        padding: .15rem 0;
        border-radius: .3rem;
        background-color: #5cb85c;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        >i {
          width: .26rem;
          height: .26rem;
          display: inline-flex;
          font-size: .3rem;
          &.bg {
            width: .3rem;
            height: .3rem;
            display: inline-flex;
            @include background_fill('./audio.svg');
            background-size: cover;
            transform: scale(1.2);
          }
        }
        img {
          width: .3rem;
          height: .3rem;
        }
        >span {
          display: inline-flex;
          padding-left: .2rem;
          color: #fff;
        }
      }
      >input {
        width: 2.6rem;
        padding: .15rem 0;
        border-radius: .3rem;
        background-color: #5cb85c;
        color: #fff;
        &.reset {
          background-color: #f0ad4e;
        }
      }
    }

    .play-reset {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin: .2rem 0 .2rem;
    }
  }
  
  .upload-pic {
    margin-top: .3rem;
    background-color: #fff;
    width: 100%;
    padding: .2rem .3rem;
    box-sizing: border-box;

    .title {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items:center;
      justify-content: space-between;
      padding-bottom: .3rem;

      .check-txt {
        left: -.2rem;
      }

      h4 {
      }
      >p {
        .alert {
          color: #f0ad4e;
          display: inline-flex;
          padding-right: .2rem;
        }
        .total {
          display: inline-flex;
        }
      }

    }

    ul {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      li {
        width: 1.2rem;
        height: 1.2rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-right: .2rem;
        margin-bottom: .4rem;
        position: relative;
        &.btn {
          border: 1px dashed rgba(0, 0, 0, .08);
          font-size: .8rem;
          color: $color-text-dd;
          background-color: $color-background-d;
          &.disable {
            color: #c6c5c5;
          }

          input {
            display: none;
          }
          label {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
        &.list {
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center center;
        }
        img {
          width: 100%;
        }
        .delete-icon {
          position: absolute;
          top: -.15rem;
          right: -.15rem;
          color: $color-button-d;
        }
      }

    }
  }

  .order-type {
    margin-top: .3rem;
    background-color: #fff;
    width: 100%;
    padding: .2rem .3rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    h4 {
      line-height: 1.5;
      padding-bottom: .3rem;
      width: 100%;
      display: flex;
      span {
        display: inline-flex;
        &:last-child {
          padding-left: 0;
          left: -.2rem;
        }
      }
    }
    label {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: .1rem 0;
      i {
        margin-right: .1rem;
        font-size: .3rem;
      }
      input {
        margin-right: .1rem;
      }
    }
  }

  .apply-now {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: .2rem 0;
    margin-top: .3rem;
    .place-btn {
      font-size: .28rem;
      background-color: #ee0d2d;
      color: #fff;
      width: 5.8rem;
      padding: .15rem 0;
      border-radius: .06rem;
    }
  }

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

/* 录音弹出层 */
.count-stop-layer {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 200;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,.6);
  display: flex;
  align-items: center;
  justify-content: center;
  .inner-container {
    background-color: #fff;
    width: 5.8rem;
    height: 30VH;
    margin-top: -10VH;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: .1rem;
    h3 {
      font-size: .26rem;
    }
    h4 {
      margin: .2rem 0 .4rem;
      font-size: .23rem;
      color: $color-text-dd;
    }
    input {
      background-color: #d9534f;
      padding: .1rem .35rem;
      border-radius: .1rem;
      color: #fff;
      font-size: .23rem;
    }
  }
}

/* 表单提示 */
.form-check {
  position: relative;
  .check-txt {
    position: absolute;
    display: inline-flex;
    left: 0;
    bottom: 0;
    font-size: .2rem;
    color: #d60000;
    box-sizing: border-box;
    padding-left: .1rem;
    transform: scale(.9);
  }
}

// 滑动版本日期选择器


</style>