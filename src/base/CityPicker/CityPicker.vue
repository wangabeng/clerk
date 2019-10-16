<template>
  <div class="city-picker" @click.self='hideMask' v-if='ifShow'>
    <div class="picker-content">
      <div class="title-wrapper">
          <span v-if="curProvice" 
            @click='tabProvince'>{{curProvice.area_name}}</span>

          <span v-if="cityOrProvince == 'p' && !curProvice" :class="{'active': cityOrProvince == 'p'}" 
            @click=''>省</span>

          <span v-if="cityOrProvince == 'c'" :class="{'active': cityOrProvince == 'c'}">市</span>
      </div>
      <div class="content-wrapper"><!-- 滚动容器 -->
        <ul class="content-wrapper-inner"><!-- 滚动内容 -->
          <!-- 省 -->
          <li v-if="proviceList && cityOrProvince == 'p'" v-for='(item, index) in proviceList' 
            @click='selectProvince(item)'>{{item.area_name}}</li>
          <!-- 市 -->
          <li v-if="curCities && cityOrProvince == 'c'" v-for='(item, index) in curCities' 
            @click='selectCity(item)'>{{item.area_name}}</li> 
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

      cityOrProvince: 'p', // 当前显示激活状态是 省份 还是市 默认是省份 'p'  'c'

      // scrollShow: [], // 当前滚动容器显示的内容
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
      // this.ifShow = !this.ifShow;
      // 通知父元素 要隐藏
      console.log('通知影响');
      this.$emit('hidePicker', false);
    },
    // 选择省份后 获取城市
    selectProvince (province) {
      // 获取城市
      var _this = this;
      $.ajax({
        type: "POST",  
        url: BASEURL + "/get_areas",  // 接口14 获取城市接口
        data: {
          'parent_id': province.id,
        },  
        headers: {'token': localStorage.getItem("shiguangshudong")},
        dataType: "json",  
        success: function(res){  
          TokenError(res.code, _this); // token错误

          if (res.code == 0) {
            console.log('接口14城市为：', res.data);
            _this.curCities = res.data;
            _this.curProvice = province;

            _this.cityOrProvince = 'c';
            // _this.scrollShow = _this.curCities; // 当前显示省份
          }
        },  
        error: function(e){  
         console.log(e);  
        }  
      }); 
    },
    // 选择城市后
    selectCity (city) {
      var _this = this;
      // 记录city 隐藏遮罩层
      this.curCity = city;
      this.$emit('sumPicker', this.curProvice, this.curCity);
      this.$emit('hidePicker', false);

      // 清空除省份外的元素
    },
    // 重新选择省
    tabProvince () {
      this.cityOrProvince = 'p';
    }
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

          _this.cityOrProvince = 'p';
          // _this.scrollShow = _this.proviceList; // 当前显示省份
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
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;

      span {
        padding: .1rem 0;
        &.active {
          border-bottom: #52697f solid 3px;
          color: #52697f;
        }
      }
    }
    .content-wrapper {
      background-color: #fff;
      height: 100%;
      overflow-y: auto;

      .content-wrapper-inner {
        display: flex;
        flex-direction: column;
        width: 100%;
        li {
          padding: .15rem .2rem;
          box-sizing: border-box;
          border-top: 1px solid #f6f6f6;
        }
      }

    }

  }
}

</style>
