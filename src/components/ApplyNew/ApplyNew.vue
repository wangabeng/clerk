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
        <span class='title'>所在城市</span>
        <div class="city-wrapper" style='font-size: .2rem'>
          <!-- <v-distpicker @selected="onSelected"></v-distpicker> -->
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

 <v-distpicker province="广东省" city="广州市" area="海珠区"></v-distpicker>
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

        titleText: '个人资料',
        picker: {
            data: [
                ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
                ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
            ],
        },
    }
  },
  methods: {
    disabledDate(time){
      if(time.getTime() > new Date().getTime()) return true;
    },
    handlePickerCancel () {},
    handlePickerConfirm () {},
    showPicker() {
        console.log('dd');
        this.$ref.picker.show();
    },
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
</style>
