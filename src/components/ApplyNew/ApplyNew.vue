<template>
  <div id="apply-new">
    <!-- 申请说明 -->
    <div class="apply-info">
      <h3>新店员申请资料</h3>
      <p>如果你颜值在线，双商在线，如果你喜欢熬夜挑灯夜读，那么请加入我们吧！</p>
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
          <label for="male"><span>男</span><input type="radio" id='male' name='gender' value='1' v-model='sex'></label>
          <label for="famale"><span>女</span><input type="radio" id='famale' name='gender' value='2' v-model='sex'></label>
        </div>
        <p class="check-txt" v-if='ifSubmit && !sex'>* 性别必填</p>
      </div>
      <!-- {{sex}} -->

      <div class="each-input-fill form-check" >
        <span class='title'>出生年月</span>
        <div class="date-wrapper">
          <!-- <vue-datepicker-local v-model="time" format="YYYY-MM" clearable></vue-datepicker-local> -->
          <vue-datepicker-local :disabledDate="disabledDate" v-model="time" format="YYYY-MM" clearable/>
        </div>
        <p class="check-txt" v-if='ifSubmit && !birth_year && !birth_month'>* 出生年月必填</p>
      </div>
      <!-- {{birth_year}} and {{birth_month}} -->

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

      <div class="each-input-fill form-check">
        <span class='title'  >所在城市</span>
        <div class="city-container">
          <span @click="choose" v-if='!city'>&nbsp;请选择&nbsp;</span>
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
      <!-- {{city}} -->

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
      <h3>录音（15秒内）&nbsp;<span v-if='ifSubmit && !audio_url'>录音必须</span></h3>
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
      <label for="wenziyuyin">
        <input type="checkbox"  id='wenziyuyin' value='1' v-model='types'>
        <span>文字语音条</span>
      </label>
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
      </label>
    </div>
    <!-- {{types}} -->

    <!-- 提交申请 -->
    <div class="apply-now">
      <input class='place-btn' type="button" 
        value='提交申请' @click='applyNewSubmit'>
    </div>
  
    <!-- 测试按钮 -->
    <input type="button" @click='insertOne' value='测试插入数据'>


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
import {BASEURL, WEIXINCERTI} from "src/api/config.js";


import getToken from 'src/api/getToken.js';
import {GetQueryString, SaveStorage, GetStorage} from "src/api/utils.js";

import layer from 'vue-layer'
import 'vue-layer/lib/vue-layer.css';

export default {
  name: 'ApplyNew',
  components: {
    VueDatepickerLocal, //  日期选择
    VDistpicker, // 城市选择
    
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
      audio_url: '', // 上传到服务器中的audio的url地址
      // image_urls: [], // 见 uploadArr
      types: [], //
      // 提交表单数据结束

      COUNT_START: 15, // 倒计时
      firstFlag: true, // 是否是第一次录音
      ifWorking: false, // 是否正在录音

      weixinConfig: null, // 微信配置

      ifPlaying: false, // 是否正在播放

      ifSubmit: false, // 提交flag 一旦提交 就执行表单验证


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
          headers: {'token': GetStorage("userinfo").token},
          success: function (res) {
            console.log(res.data.file);
            _this.uploadArr.push(res.data.file);
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
      if (!!this.nick_name && !!this.sex && !!this.birth_year  && !!this.birth_month  && !!this.voice_type && !!this.online_time  && !!this.city_id && !!this.experience  && !!this.game && !!this.wechat_num  && !!this.audio_url  && !!this.types) {
        // 如果有数据为空 就把警告开关打开
        this.ifSubmit = true;
      }
    },
    // 插入一条数据
    insertOne () {
      $.ajax({
        type: "POST",  
        url: BASEURL + "/apply",  
        contentType: 'application/x-www-form-urlencoded;charset=utf-8',  
        data: {
          nick_name: 'test23女', // 昵称
          sex: '2', // 性别
          birth_year: '1988', // 出生年 计算属性中
          birth_month: '10', // 出生月 计算属性中
          voice_type: '温柔型', // 声线类型
          online_time: '测试', //
          province_id: '湖北', // 见 data
          city_id: '长沙', // 见 data
          specialty: '很多', //
          experience: '射箭', //
          game: '游泳', //
          wechat_num: 'sanfeng', //
          audio_url: 'https://www.w3school.com.cn/i/horse.ogg', // 上传到服务器中的audio的url地址
          image_urls: ['http://pic1.sc.chinaz.com/Files/pic/pic9/201909/zzpic20245_s.jpg', 'http://pics.sc.chinaz.com/files/pic/pic9/201909/bpic13704.jpg'].join(), // 见 uploadArr
          types: [1,2].join(), //
        },  
        headers: {'token': GetStorage("userinfo").token},
        dataType: "json",  
        success: function(res){  
                    console.log(res.data); 
                  },  
        error: function(e){  
                     console.log(e);  
        }  
      });   
    }

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
            alert('用户拒绝授权录音');
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
            uploadVoice();
          },
          fail: function (res) {
            alert(JSON.stringify(res));
          }
        });
      };

      //上传录音
      function uploadVoice(){
        //调用微信的上传录音接口把本地录音先上传到微信的服务器
        //不过，微信只保留3天，而我们需要长期保存，我们需要把资源从微信服务器下载到自己的服务器
        wx.uploadVoice({
          localId: voice.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function (res) {
            //把录音在微信服务器上的id（res.serverId）发送到自己的服务器供下载。

            console.log("微信录音上传结果：");
            console.log(res);

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
          alert('请先使用 startRecord 接口录制一段声音');
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
          alert('录音（' + res.localId + '）播放结束');
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
        label {
          margin-right: .3rem;
        }
      }
      .date-wrapper {
        flex: 1;
      }
      .city-container {
        flex: 1;
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
      font-size: .22rem;
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
  z-index: 200001;
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
  z-index: 200000;
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

</style>



<!--       /*let config = {
  //添加请求头
  headers: { "Content-Type": "multipart/form-data",'token': GetStorage("userinfo").token},
  // headers: {'token': GetStorage("userinfo").token},
  dataType:'json',
};

axios.post(BASEURL + '/upload_file', param, config)
  .then(function (response) {
    // uploadArr.push(response.data.file);
    console.log('图片上传结果response:', response.data.data.data.file);
    // _this.uploadSum = response.data;
  })
  .catch(function (error) {
    console.log("上传失败");
  });*/ -->