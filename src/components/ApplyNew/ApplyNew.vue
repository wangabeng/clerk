<template>
  <div id="apply-new">
    <!-- 申请说明 -->
    <div class="apply-info">
      <h3>新店员申请资料</h3>
      <p>如果你颜值在线，双商在线，如果你喜欢熬夜挑灯夜读，那么请加入我们吧！</p>
    </div>

    <!-- 信息填写区 -->
    <div class="info-fill-wrapper">
      <div class="each-input-fill">
        <span class='title'>昵称</span>
        <input type="text" class='fill-input' placeholder="请输入圈名">
      </div>

      <div class="each-input-fill">
        <span class='title'>选择性别</span>
        <div class="gender-wrapper">
          <label for="male"><span>男</span><input type="radio" id='male' name='gender'></label>
          <label for="famale"><span>女</span><input type="radio" id='famale' name='gender'></label>
        </div>
      </div>

      <div class="each-input-fill">
        <span class='title'>出生年月</span>
        <div class="date-wrapper">
          <!-- <vue-datepicker-local v-model="time" format="YYYY-MM" clearable></vue-datepicker-local> -->
          <vue-datepicker-local :disabledDate="disabledDate" v-model="time" format="YYYY-MM" clearable/>
        </div>
      </div>

      <div class="each-input-fill">
        <span class='title'>声线类型</span>
        <input type="text" class='fill-input' placeholder="请输入声线类型">
      </div>

      <div class="each-input-fill">
        <span class='title'>在线时间</span>
        <input type="text" class='fill-input' placeholder="请输入在线时间">
      </div>

      <div class="each-input-fill">
        <span class='title'  >所在城市</span>
        <div class="city-container">
          <span @click="choose">请选择&nbsp;</span>
          <span @click="choose">{{province+city}}</span>
           <!--省市区三级联动-->
          <div class="divwrap" v-if="show">
            <v-distpicker type="mobile" @province="onChangeProvince1" @city="onChangeCity"
                           hide-area></v-distpicker><!-- @area="onChangeArea" -->
          </div>
        </div>
      </div>

      <div class="each-input-fill">
        <span class='title'>技能特长</span>
        <input type="text" class='fill-input' placeholder="有哪方面的技能或特长">
      </div>

      <div class="each-input-fill">
        <span class='title'>相关经验</span>
        <input type="text" class='fill-input' placeholder="是否有其他店铺的经验">
      </div>

      <div class="each-input-fill">
        <span class='title'>相关经验</span>
        <input type="text" class='fill-input' placeholder="请输入相关经验">
      </div>

      <div class="each-input-fill">
        <span class='title'>擅长游戏</span>
        <input type="text" class='fill-input' placeholder="擅长的游戏">
      </div>

      <div class="each-input-fill">
        <span class='title'>微信号</span>
        <input type="text" class='fill-input' placeholder="请输入微信号">
      </div>

    </div>

    <!-- 录音 -->
    <div class="record-audio">
      <h3>录音（15秒内）</h3>
      <div class="play-reset"><span>播放录音</span><span>重新录音</span></div>
      <div class="new-record">录音</div>
    </div>

    <!-- 上传图片 -->
    <div class="upload-pic">
      <div class="title">
        <h4>上传图片</h4>
        <p>0/4</p>
      </div>
      <ul>
        <!-- 上传按钮 -->
        <li class='btn'>+</li>
        <!-- 照片展示 -->
        <li class='list'>
          <img src="./th.jpg" alt="">
          <i class="fa fa-times delete-icon" aria-hidden="true"></i>
        </li>
        </li>
        
      </ul>
    </div>

    <!-- 接单类型 -->
    <div class="order-type">
      <h4>接单类型（多选）</h4>
      <label for="wenziyuyin">
        <input type="checkbox" name='type' id='wenziyuyin'>
        <span>文字语音条</span>
      </label>
      <label for="yuyintonghua">
        <input type="checkbox" name='type' id='yuyintonghua'>
        <span>语音通话</span>
      </label>
      <label for="youxi">
        <input type="checkbox" name='type' id='youxi'>
        <span>游戏陪玩</span>
      </label>
      <label for="连麦哄睡">
        <input type="checkbox" name='type' id='连麦哄睡'>
        <span>文字语音条</span>
      </label>
    </div>

    <!-- 提交申请 -->
    <div class="apply-now">
      <input class='place-btn' type="button" 
        value='提交申请'>
    </div>

  
  <input type="button" value='测试录音' id='talkbtn'>
  <br>
  <br>
  

<!--遮罩层 时间选择器-->
<div class="blacks" v-if="show" @click="countermand"></div>





  </div>
</template>

<script>
// import {mapGetters, mapActions} from 'vuex'
import $ from 'jquery'

import wx from 'weixin-js-sdk'

import VueDatepickerLocal from 'vue-datepicker-local'
import VDistpicker from 'v-distpicker'
// import { Area } from 'vant';
import {GetSign} from "src/api/utils.js";


export default {
  name: 'ApplyNew',
  components: {
    VueDatepickerLocal,
    VDistpicker,
    
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
      area: ''
      // 省市区选择 结束 

    }
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
    }
    // 城市选择 结束


  },
  created () {
    console.log(wx);
  },
  mounted () {
    console.log(window.location.href);

    wx.config({
      debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
"appId":"wxa3c69deeaa1b4948","nonceStr":"8d43BWR35zosVTVx","timestamp":1569335905,"signature":"6f462d50fc8c1aa59b5c12ed2f1c43fee79c9277",
      jsApiList: [] // 必填，需要使用的JS接口列表
      // 'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'onVoicePlayEnd', 'uploadVoice'
    });
    wx.ready(function(){
      console.log('微信配置好了');

      var _this = this;
      $('#talkbtn').on('click', function(event){
          console.log('开始录音');
          wx.startRecord();
      });

    });
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
    background-color: #fff;
    width: 100%;
    padding: .2rem .3rem;
    box-sizing: border-box;
    h3 {
      line-height: 1.5;
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
      margin-bottom: .3rem;
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
        margin-right: .3rem;
        position: relative;
        &.btn {
          border: 1px dashed rgba(0, 0, 0, .08);
          font-size: .8rem;
          color: $color-text-dd;
          background-color: $color-background-d;
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
          top: -.2rem;
          right: -.2rem;
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
      margin-bottom: .3rem;
    }
    label {
      widht: 100%;
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



/*     <div class="order-type">
  <h4>接单类型（多选）</h4>
  <label for="wenziyuyin">
    <input type="checkbox" name='type' id='wenziyuyin'>
    <span>文字语音条</span>
  </label>
  <label for="yuyintonghua">
    <input type="checkbox" name='type' id='yuyintonghua'>
    <span>语音通话</span>
  </label>
  <label for="youxi">
    <input type="checkbox" name='type' id='youxi'>
    <span>游戏陪玩</span>
  </label>
  <label for="连麦哄睡">
    <input type="checkbox" name='type' id='连麦哄睡'>
    <span>文字语音条</span>
  </label>
</div> */


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
