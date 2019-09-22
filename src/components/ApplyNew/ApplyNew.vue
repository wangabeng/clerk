<template>
  <div id="apply-new">
    <!-- 申请说明 -->
    <div class="apply-info">
      <h3>申请说明</h3>
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
        <span @click="choose">请选择</span>
        <span>{{province+city}}</span>
         <!--省市区三级联动-->
        <div class="divwrap" v-if="show">
          <v-distpicker type="mobile" @province="onChangeProvince1" @city="onChangeCity"
                        @area="onChangeArea"></v-distpicker>
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
        <li>+</li>
        <!-- 照片展示 -->
        <li></li>
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
    <div class="sub-wrapper">
      <input type="button" value='提交申请'>
    </div>



<!--遮罩层-->
<div class="blacks" v-if="show" @click="countermand"></div>

  </div>
</template>

<script>
// import HelloWorld from 'components/HelloWorld/HelloWorld.vue'
// import Index from 'components/Index/Index.vue'
// import SideBar from 'base/SideBar/SideBar.vue'
// import MHeader from 'base/MHeader/MHeader.vue'
// import MFooter from 'base/MFooter/MFooter.vue'

// import {mapGetters, mapActions} from 'vuex'
import $ from 'jquery'

import wx from 'weixin-js-sdk'

import VueDatepickerLocal from 'vue-datepicker-local'
import VDistpicker from 'v-distpicker'
// import { Area } from 'vant';

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
      lxr: '',
      lxdh: '',
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
    disabledDate(time){
      if(time.getTime() > new Date().getTime()) return true;
    },
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
      },
      onChangeArea: function (a) {
        this.area = a.value;
        this.show = false;
        this.city = this.province + this.city + this.area;
      }
  },
  created () {

  },
  mounted () {

  }
}
</script>

<style scoped lang="scss">
@import "common/sass/variable.scss";
#apply-new {

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
  z-index: 99;
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
