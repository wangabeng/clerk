<template>
  <div id="random-order">
    <!-- 小哥哥或小姐姐 -->
    <div class="each-option-aera">
      <h3>
        <i class="fa fa-heart-o" aria-hidden="true"></i>
        <span>想和小哥哥还是小姐姐聊天呢？</span>
      </h3>
      <label for="gege">
        <span>小哥哥</span>
        <input type="radio" name='boyOrGirl' id='gege'>
      </label>
      <label for="jiejie">
        <span>小姐姐</span>
        <input type="radio" name='boyOrGirl' id='jiejie'>
      </label>
    </div>

    <!-- 选择等级 -->
    <div class="each-option-aera">
      <h3>
        <i class="fa fa-diamond"></i>
        <span>选择等级</span>
      </h3>
      <label for="putong">
        <span>普通</span>
        <input type="radio" name='level' id='putong'>
      </label>
      <label for="jinpai">
        <span>金牌</span>
        <input type="radio" name='level' id='jinpai'>
      </label>
      <label for="zhendian">
        <span>镇店</span>
        <input type="radio" name='level' id='zhendian'>
      </label>
    </div>

    <!-- 选择标签 -->
    <div class="each-option-aera">
      <h3>
        <i class="fa fa-tags" aria-hidden="true"></i>
        <span>选择标签（最多选择3个）</span>
      </h3>
      <label for="wenrou">
        <span>温柔的</span>
        <input type="radio" name='tag' id='wenrou'>
      </label>
      <label for="keai">
        <span>可爱的</span>
        <input type="radio" name='tag' id='keai'>
      </label>
      <label for="erciyuan">
        <span>二次元</span>
        <input type="radio" name='tag' id='erciyuan'>
      </label>
    </div>

    <!-- 其它要求 -->
    <div class="other-demand">
      <span>其它要求</span>
      <textarea name="" id="" placeholder="如有其它要求，请在此填写"></textarea>
    </div>

    <!-- 下单 -->
    <div class="fixed-place-now">
      <input class='place-btn' type="button" 
        @click='orderIn' value='下单'>
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

export default {
  name: 'RandomOrder',
  methods: {
    orderIn () {
      // 
    }
  },
  mounted () {
  }
}
</script>

<style scoped lang="scss">
@import "common/sass/variable.scss";

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

#random-order {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: $color-background-d;
  padding-bottom: 1rem;

  .each-option-aera {
    width: 100%;
    padding: 0 .25rem;
    box-sizing: border-box;
    margin-bottom: .3rem;
    background-color: #fff;

    h3 {
      width: 100%;
      padding: .2rem 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      i {
        display: inline-flex;
        width: .4rem;
        height: .4rem;
        align-items: center;
        justify-content: flex-start;
        padding-bottom: .05rem;
      }
    }
    label {
      width: 100%;
      padding: .15rem 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      border-top: $border-1px;
      color: $color-text-d;

      span {}
      input {

      }
    }
  }

  .other-demand {
    width: 100%;
    padding: .25rem .25rem;
    box-sizing: border-box;
    margin-bottom: .3rem;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    span {
      display: inline-flex;
      padding-top: .06rem;
      padding-right: .4rem;
      box-sizing: border-box;

    }
    textarea {
      display: inline-flex;
      flex: 1;
      border: 0 none;
    }
  }

}
</style>
