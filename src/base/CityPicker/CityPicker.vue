<template>
  <div class="city-picker" @click.self='hideMask' v-if='ifShow'>
    <div class="picker-content">
      <div class="title-wrapper">
          <span class='active'>省</span>
          <span>市</span>
      </div>
      <div class="content-wrapper"><!-- 滚动容器 -->
        <ul class="content-wrapper-inner"><!-- 滚动内容 -->
          <li v-if='scrollShow' v-for='(item, index) in scrollShow'>{{item.area_name}}</li>
        </ul>  
      </div>
    </div>  
  </div>
</template>

<script>
import $ from 'jquery'

import {BASEURL} from "src/api/config.js";

import {GetQueryString, TokenError} from "src/api/utils.js";

import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'CityPicker',
  data () {
    return {
      ifShow: true,

      proviceList: [], // 所有省份 固定

      curCities: [], // 所有城市
      curProvice: '', // 当前省
      curCity: '', // 当前城市

      scrollShow: [], // 当前滚动容器显示的内容
    };
  },
  props: {
    propStatus: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    tabOpen: function () {
    },
    hideMask () {
      this.ifShow = !this.ifShow;
    },
  },
  created () {
    console.log('城市选择created');
    // 获取所有省份
    var _this = this;
    $.ajax({
      type: "POST",  
      url: BASEURL + "/get_areas",  // 接口14 获取城市接口
      data: {
        // 'parent_id': '10'
      },  
      headers: {'token': localStorage.getItem("shiguangshudong")},
      dataType: "json",  
      success: function(res){  
        TokenError(res.code, _this); // token错误

        if (res.code == 0) {
          console.log('接口14为：', res.data);
          _this.proviceList = res.data;
          _this.scrollShow = _this.proviceList; // 当前显示省份
        }
      },  
      error: function(e){  
       console.log(e);  
      }  
    });    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "common/sass/variable.scss";
/*外层容器*/
/*默认状态*/
.city-picker {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,.6);
  z-index: 200;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;

  .picker-content {
    height: 70%;
    width: 6.4rem;
    background-color: #fff;

    padding-top: .6rem;
    box-sizing: border-box;
    position: relative;
    


    .title-wrapper {
      height: .6rem;
      background-color: $color-background-d;
      position: absolute;
      z-index: 20000;
      top: 0;
      left: 0;
      width: 100%;
    }
    .content-wrapper {
      background-color: #fff;
      height: 100%;
      overflow-y: auto;

    }

  }
}

</style>
