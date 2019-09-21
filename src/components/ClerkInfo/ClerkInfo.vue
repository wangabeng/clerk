<template>
  <div id="clerk-info">
    <!-- 轮播图 -->
    <swiper :options="swiperOption">
    　　<!-- <swiper-slide>
          <img src="./th.jpg" style='width:2.4rem;height:2rem' alt=""><span>1111111</span>
        </swiper-slide> -->
    　　<swiper-slide>
          <div class='slider-each-wrapper'>
            <img src="./th.jpg" alt="">   
            <div class="info-txt">
              <div class="name-wrapper">
                <span class='name'>张三丰</span>
                <span class='star'>女 双子座</span>
              </div>
              <div class="online-status">
                <!-- online  offline -->
                <i class="fa fa-circle offline" aria-hidden="true"></i>
                <span>在线</span>
              </div>
            </div>    
          </div>

        </swiper-slide>
        <swiper-slide>
          <div class='slider-each-wrapper'>
            <img src="./th.jpg" alt="">   
            <div class="info-txt">
              <div class="name-wrapper">
                <span class='name'>张三丰</span>
                <span class='star'>女 双子座</span>
              </div>
              <div class="online-status">
                <!-- online  offline -->
                <i class="fa fa-circle offline" aria-hidden="true"></i>
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
            <span>普通</span>
          </div>
          <p class="price-form">￥5元起</p>
        </div>
        <!-- 个人描述 -->
        <p class="per-desc">希望你的可爱 可以治愈一切不可爱</p>
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
          <li>理解</li>
          <li>包容体贴别人</li>
        </ul>
      </div>

      <!-- 服务内容和价格 -->
      <div class="service-price">
        <p><i class="fa fa-credit-card" aria-hidden="true"></i><span>服务内容及价格</span></p>
        <ul>
          <li class='title'>
            <span></span><span>文字语音条</span><span>语音通话</span>
          </li>
          <li><span>半小时</span><span>16</span><span>40</span></li>
          <li><span>一小时</span><span>16</span><span>40</span></li>
          <li><span>一天</span><span>16</span><span>40</span></li>
        </ul>
      </div>

    </div>
    

    <!-- 立即下单 -->

    <!-- 蒙尘 -->

    <!-- 购买弹出窗 -->

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
    };
  },
  created () {
    console.log("canshu:" + this.$route.params.id);
  },
  mounted () {
    // console.log("adfdfdf", $("#m-index").html());
  }
}
</script>

<style  lang="scss">/* scoped */
@import "common/sass/variable.scss";
@import "common/sass/mixin.scss";
#clerk-info {
  width: 6.4rem;

  /* 详情信息 */
  .detail-info-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f6f6f6;
    color: $color-text-dd;
    
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
        }
      }
    }

  }
      /* <div class="nature-wrapper">
        <p><i class="fa fa-tags" aria-hidden="true"></i><span>性格标签</span></p>
        <ul>
          <li>理解</li>
          <li>包容体贴别人</li>
        </ul>
      </div> */

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
    color: #fff;
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

