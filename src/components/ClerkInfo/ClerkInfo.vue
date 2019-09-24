<template>
  <div id="clerk-info">
    <!-- 轮播图 -->
    <swiper :options="swiperOption">
    　　<swiper-slide>
          <div class='slider-each-wrapper'>
            <img :src="clertDetail.salesman.image_urls" alt="">   
            <div class="info-txt">
              <div class="name-wrapper">
                <span class='name'>{{clertDetail.salesman.nick_name}}</span>
                <span class='star'>{{clertDetail.salesman.sex=='1'? '男': '女'}}</span>
              </div>
              <div class="online-status">
                <!-- online  offline -->
                <i class="fa fa-circle online" aria-hidden="true"></i>
                <span>在线</span>
              </div>
            </div>    
          </div>

        </swiper-slide>
    　　<div class="swiper-pagination" slot="pagination"></div>
    　　<!-- <div class="swiper-button-prev" slot="button-prev"></div>
    　　<div class="swiper-button-next" slot="button-next"></div> -->
    </swiper>
    
    <!-- 详情信息 -->
    <div class="detail-info-wrapper">
      <!-- 等级及价格 描述 -->
      <div class="level-price-desc">
        <!-- 等级及价格 -->
        <div class="level-price">
          <div class="level-wrapper">
            <i class="fa fa-diamond" aria-hidden="true"></i>
            <span>{{clertDetail.salesman.level}}</span>
          </div>
          <p class="price-form">{{clertDetail.salesman.price}}</p>
        </div>
        <!-- 个人描述 -->
        <p class="per-desc">{{clertDetail.salesman.sign}}</p>
      </div>
      
      <!-- 录音 播放 -->
      <div class="play-record">
        <div class="record">
          <i class="fa fa-volume-up" aria-hidden="true"></i>
          <span>录音</span>
        </div>
        <div class='paly-icon'></div>
      </div>
      
      <!-- 性格标签 -->
      <div class="nature-wrapper">
        <p><i class="fa fa-tags" aria-hidden="true"></i><span>性格标签</span></p>
        <ul>
          <li v-for='item in clertDetail.salesman.character'>{{item}}</li>
        </ul>
      </div>

      <!-- 服务内容和价格 -->
      <div class="service-price">
        <p><i class="fa fa-credit-card" aria-hidden="true"></i><span>服务内容及价格</span></p>
        <ul>
          <li v-for='(item, index) in clertDetail.service_price'>
            <span v-for='(innerItem, innnerIndex) in item'>{{innerItem}}</span>
          </li>
          <!-- <li><span>半小时</span><span>16</span><span>40</span></li>
          <li><span>一小时</span><span>16</span><span>40</span></li>
          <li><span>一天</span><span>16</span><span>40</span></li> -->
        </ul>
      </div>

    </div>
    

    <!-- 下单 -->
    <div class="fixed-place-now">
      <input class='place-btn' type="button" 
        @click='orderIn' value='下单'>
    </div>

    <!-- 遮罩层 -->
    <div class="mask-info" :class="{'open': maskShow}" 
      @click='closeWin'></div>

    <!-- 购买弹出窗 -->
    <div class="order-window" :class="{'open': maskShow}">
      <!-- 主图及选择规格 -->
      <div class="top-info">
        <img class='close-icon' src="~common/image/close-icon.png" 
          @click='closeWin' alt="">
        <div class="pic"><img :src="clertDetail.salesman.image_urls" alt=""></div>
        <div class="sum-txt">
          <p class='amount'>{{clertDetail.salesman.price}}</p>
          <p class='size'>选择&nbsp;&nbsp;服务类型&nbsp;;&nbsp;&nbsp;时长&nbsp;</p>
        </div>
      </div>
      <!-- 选择规格区 -->
      <div class="select-wrapper">
        <!-- 滚动区 -->
        <div class="select-inner">
          <!-- 类型区 -->
          <div class="type-area type-time">
            <ul class="">
              <li :class="{'active': xIndex =='1'}" @click="selectType('1')">文字语音条</li>
              <li :class="{'active': xIndex =='2'}" @click="selectType('2')">语音通话</li>
            </ul>            
          </div>


          <!-- 时长区 -->
          <div class="long-area type-time">
            <h4>时长</h4>
            <ul>
              <li :class="{'active': yIndex =='1'}" @click="selectTime('1')">半小时</li>
              <li :class="{'active': yIndex =='2'}" @click="selectTime('2')">一小时</li>
              <li :class="{'active': yIndex =='3'}" @click="selectTime('3')">一天</li>
              <li :class="{'active': yIndex =='4'}" @click="selectTime('4')">一周</li>
              <li :class="{'active': yIndex =='5'}" @click="selectTime('5')">一个月</li>
            </ul>
          </div>
          <!-- 购买数量 -->
          <div class="amount-area">
            <h4>购买数量</h4>
            <div class="amount-wrapper">
              <a href="javascript:;" @click='plus'><img src="~common/image/minus-icon.png" alt=""></a>
              <input type="number"  v-model="amountInput">
              <a href="javascript:;" @click='add'><img src="~common/image/add-icon.png" alt=""></a>
            </div>
          </div>
          <!-- 微信号 -->
          <div class="weixin-area">
            <h4>微信号</h4>
            <input type="text" placeholder="请输入微信号">
          </div>

        </div>

      </div>
      <!-- 提交按钮区 -->
      <div class="bot-sub">
        <p class="total">
          总价：<span>{{total}}</span>
        </p>
        <input type="button" value='立即下单'>
      </div>
    </div>

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

// require styles
import 'swiper/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

// 用封装好的axios
import axios from 'src/api/axios';
import Qs from 'qs';
import {BASEURL, WEIXINCERTI} from "src/api/config.js";

import {clertDetail} from 'src/api/mockdata.js';

export default {
  name: 'ClerkInfo',
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      swiperOption: {
      　　pagination: {
      　　　　el: '.swiper-pagination',
      　　　　clickable: true // 允许点击小圆点跳转
      　　},
      　　/*autoplay: {
      　　　　delay: 3000,
      　　　　disableOnInteraction: false // 手动切换之后继续自动轮播
      　　},*/
      　　loop: true,
      　　navigation: {
      　　　　nextEl: '.swiper-button-next',
      　　　　prevEl: '.swiper-button-prev'
      　　},
          observer: true,
          observeParents: true,
      },

      maskShow: false,


      clertDetail: null, // 店员信息详情,

      PriceInfoArr: [],
      xFlag: false, // x轴是否选中
      xIndex: '', // 1 文字语音 2 语音通话
      yFlag: false, // x轴是否选中
      yIndex: '', // 1 2 3 4 5
      amountInput: 1, // 默认数量输入框是1


    };
  },
  computed: {
    total () {
      var sum;
      if (this.xFlag && this.yFlag) {
        sum = parseInt(this.PriceInfoArr[parseInt(this.yIndex)][parseInt(this.xIndex)]) * this.amountInput;
      } else {
        sum = '-';
      }
      return sum;
    }

  },
  created () {
    // console.log("canshu:" + this.$route.params.id);
    // ajx通过id获取详情this.clertDetail = clertDetail;
    this.clertDetail = clertDetail.data;
    console.log(this.clertDetail);
    this.PriceInfoArr = this.clertDetail.service_price;
    console.log(this.PriceInfoArr);


  },
  methods: {
    // 下单弹出弹窗
    orderIn () {
      this.maskShow = true;
    },
    // 关闭弹窗
    closeWin () {
      this.maskShow = false;
    },
    // 选择 X轴
    selectType (xIndex) {
      // this.xFlag = !this.xFlag;
      this.xFlag = true;
      console.log("选中" + xIndex);
      this.xIndex = xIndex;

      console.log(parseInt(this.xIndex));
    },
    // 选择时长 Y轴
    selectTime (daysTime) {
      this.yFlag = true;
      console.log("选中" + daysTime);
      this.yIndex = daysTime;

      console.log(parseInt(this.yIndex));
    },
    // 加库存
    add () {
      this.amountInput++;
    },
    // 减库存
    plus () {
      this.amountInput == 1? this.amountInput: this.amountInput--;
    },
  },
  mounted () {
    // console.log("adfdfdf", $("#m-index").html());
  }
}
</script>

<style  lang="scss">/* scoped */
@import "common/sass/variable.scss";
@import "common/sass/mixin.scss";

/* 下单按钮 */
.fixed-place-now {
  width: 100%;
  position: fixed;
  z-index: 10000;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  padding: .2rem 0;
  border-top: $border-1px;
  .place-btn {
    font-size: .22rem;
    background-color: #ee0d2d;
    color: #fff;
    width: 5.8rem;
    padding: .15rem 0;
    border-radius: .06rem;
  }
}
/* 遮罩层 */
.mask-info {
  position: fixed;
  display: none;
  z-index: 10001;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: black;
  opacity: .6;

  &.open {
    display: flex;
  }

}
/* 弹出窗 */
.order-window {
  width: 100%;
  position: fixed;
  z-index: 10002;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  height: 85VH;
  color: $color-text-dd;
  border-top-left-radius: .1rem;
  border-top-right-radius: .1rem;

  transform: translateY(100%);
  transition: all 500ms ease-in-out;

  &.open {
    transform: translateY(0);
  }

  .top-info {
    height: 2.5rem;
    width: 6.4rem;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: .3rem .3rem 0;
    box-sizing: border-box;
    position: relative;

    .close-icon {
      position: absolute;
      top: .2rem;
      right: .2rem;
      width: .4rem;
      height: .4rem;
    }

    .pic {
      width: 2rem;
      height: 2rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .sum-txt {
      box-sizing: border-box;
      padding-left: .2rem;
      line-height: 1.5;
      color: $color-text-d;
      .amount {
        color: #f12d2f;
        font-size: .28rem;
        margin-top: .1rem;
      }
      .size {
        font-size: .23rem;
      }
    }
  }

  .select-wrapper {
    height: e("calc(85VH-3.3rem)");
    overflow-y: auto;
    border-top: $border-1px;
    border-bottom: $border-1px;
    .select-inner {
      width: 100%;
      padding: 0 .2rem;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items:center;
      
      .type-time {
        width: 100%;
        padding: .2rem;
        width: 100%;
        box-sizing: border-box;
        border-bottom: $border-1px;
        h4 {
          font-size: .25rem;
          padding: .1rem .1rem;

        }
        >ul {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          li {
            margin: .1rem;
            &:first-child {
              margin-left: 0;
            }
            padding: .1rem .12rem;
            border-radius: .05rem;
            background-color: $color-background-d;
            font-size: .22rem;
            &.active {
              background-color: #fdeaec;
              color: #f12d2f;
            }
          }
        }        
      }

      /* 购买数量 */
      .amount-area {
        width: 6.4rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: .2rem .1rem;
        box-sizing: border-box;
        border-bottom: $border-1px;
        h4 {
          font-size: .25rem;
          padding: .1rem .1rem;
          box-sizing: border-box;
        }
        .amount-wrapper {
          display: inline-flex;
          flex-direction: row;
          flex-wrap: nowrap;
          align-items: center;
          justify-content: center;
          a {
            img {
              width: .8rem;
              height: .6rem;
            }
          }
          input {
            width: 1rem;
            height: .6rem;
            box-sizing: border-box;
            padding: 0 .1rem;
            margin: 0 .06rem;
            font-size: 0.24rem;
            background-color: #f5f5f5;
            text-align: center;
          }
        }
      }

      /* 微信号 */
      .weixin-area {
        width: 6.4rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: .2rem .1rem;
        box-sizing: border-box;
        h4 {
          font-size: .25rem;
          padding: .1rem .1rem;
        }
        input {
          flex: 1;
          padding: .1rem .05rem;
          box-sizing: border-box;
          margin-left: .2rem;
          font-size: .22rem;
        }
      }
    }
  }

  .bot-sub {
    height: .8rem;
    width: 6.4rem;
    padding: 0 .2rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .total {
      span {
        color: #f12d2f;
      }
    }
    input {
      display: inline-flex;
      padding: .1rem .3rem;
      border-radius: .05rem;
      background-color: #f12d2f;
      color: #fff;
    }
  }
}


#clerk-info {
  width: 6.4rem;
  .masked {

  }

  /* 详情信息 */
  .detail-info-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f6f6f6;
    color: $color-text-dd;
    padding-bottom: 1rem;
    
    .level-price-desc {
      width: 100%;
      display: flex;
      flex-direction: column;
      background-color: #fff;
      padding: 0 .2rem;
      box-sizing: border-box;

      .level-price {
        width: 100%;
        display: flex;
        flex-direction: row;
        background-color: #fff;
        align-items: center;
        justify-content: space-between;
        padding: .2rem 0 .2rem;
        border-bottom: $border-1px;

        .level-wrapper {
          display: flex;
          flex-direction: row;
          align-items: center;
          i {
            padding-right: .05rem;
          }
        }
        .price-form {
          color: #ed0f28;
        }
      }

      .per-desc {
        padding: .2rem 0 .2rem;
        font-size: .2rem;
      }
    }
    
    .play-record {
      width: 100%;
      display: flex;
      flex-direction: row;
      background-color: #fff;
      padding: .2rem .2rem;
      box-sizing: border-box;
      align-items: center;
      justify-content: space-between;
      margin-top: .2rem;
      .record {
        i {
          padding-right: .05rem;
          font-size: .23rem;
        }
      }
      .paly-icon {
        width: .75rem;
        height: .32rem;
        display: inline-flex;
        box-shadow: $box-shadow;
        border-radius: .04rem;
        @include background_fill('~common/image/audio.png');
        &.playing {
          @include background_fill('~common/image/audioplay.gif');
        }
      }
    }

    .nature-wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      background-color: #fff;
      padding: 0 .2rem;
      box-sizing: border-box;
      margin-top: .2rem;
      p {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: .2rem 0 .2rem;
        border-bottom: $border-1px;
        i {
          padding-right: .05rem;
          font-size: .23rem;
        }
      }
      ul {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        padding: .1rem 0 .2rem;
        li {
          margin: .1rem;
          padding: .05rem .12rem;
          border-radius: .05rem;
          border: $border-1px-d;
          color: $color-text-d;
          font-size: .2rem;
        }
      }
    }

    .service-price {
      width: 100%;
      display: flex;
      flex-direction: column;
      background-color: #fff;
      padding: 0 .2rem;
      box-sizing: border-box;
      margin-top: .2rem;
      p {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: .2rem 0 .2rem;
        border-bottom: $border-1px;
        i {
          padding-right: .05rem;
          font-size: .23rem;
        }
      }
      ul {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: .2rem 0 .2rem;

        li {
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          padding: .12rem 0;
          &:first-child {
            font-weight: bold;
            color: $color-text-basic;
          }
          span {
            flex: 1;
            text-align: center;
          }
        }
      }
    }

  }

}

/* slider */
.swiper-container {
    width: 6.4rem;
    height: 6.4rem;
}
.swiper-pagination-bullet-active {
  background: #fff!important;
}
.slider-each-wrapper {
  width: 6.4rem!important;
  height: 6.4rem!important;
  position: relative;

  >img {
    width: 6.4rem!important;
    height: 6.4rem!important;
  }

  .info-txt {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    padding: .2rem .3rem .4rem;
    box-sizing: border-box;
    color: rgba(200,200,200, .8);
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;

    .name-wrapper {
      display: flex;
      flex-direction: column;
      .name {
        font-size: .26rem;
        font-weight: 400;
        margin-bottom: .1rem;
      }
      .star {
        font-size: .2rem;
      }
    }

    .online-status {
      span {
        display: inline-flex;
        font-size: .22rem;
        font-weight: 600;
      }
      i {
        margin-right: .07rem;
        &.online {
          color: #46bf29;
        }
        &.offline {
          color: $color-text-d
        }
      }
    }

  }

}
</style>
<!-- @click.stop='doPlay' -->

