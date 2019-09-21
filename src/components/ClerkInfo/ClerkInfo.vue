<template>
  <div id="m-index">
    <!-- index<i class="fa fa-volume-up" aria-hidden="true"></i> -->

dsdd
  <swiper :options="swiperOption">
  　　<swiper-slide>
        <img src="./th.jpg" style='width:2.4rem;height:2rem' alt=""><span>1111111</span>
      </swiper-slide>
  　　<swiper-slide>
        <div>
          <img src="./用户名.png" style='width:6.4rem;height:3rem' alt="">   
          <span>566</span>       
        </div>

      </swiper-slide>
  　　<div class="swiper-pagination" slot="pagination"></div>
  　　<!-- <div class="swiper-button-prev" slot="button-prev"></div>
  　　<div class="swiper-button-next" slot="button-next"></div> -->
  </swiper>

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
      　　}
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

<style scoped lang="scss">
@import "common/sass/variable.scss";
#m-index {
  color: $color-sub-blue;
  width: 6.4rem;
  background: blue;
}
.swiper-container {
    width: 6.4rem;
    height: 3rem;
}
</style>
