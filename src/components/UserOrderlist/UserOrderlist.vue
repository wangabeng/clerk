<template>
  <div class="order-center">
    <!-- 导航区 -->
    <ul class="nav-container">
      <li class='active'><a href="javascript:;">全部</a></li>
      <li><a href="javascript:;">待接单</a></li>
      <li><a href="javascript:;">已接单</a></li>
      <li><a href="javascript:;">已完成</a></li>
    </ul>

    <!-- 用户单列表 -->
    <div class="client-order-lists">
      <!-- 每一个订单 -->
      <div class="each-order">
        <p class='line'>订单编号：<span class='content'>5565656565564555</span></p>
        <p class='line'>下单时间：<span class='content'>2019年08月11日 16:16:25</span></p>
        <p>服务类型：<span class='content'>文字语音条</span></p>
        <!-- <p>用户名称：<span class='content'>张三</span></p> -->
        <p>时&emsp;&emsp;长：<span class='content'>一天 × 1</span></p>
        <p>性&emsp;&emsp;别：<span class='content'>小哥哥</span></p>
        <p>等&emsp;&emsp;级：<span class='content'>金牌</span></p>
        <p>订单类型：<span class='content'>指定</span></p>
        <p>价&emsp;&emsp;格：<span class='content'>88.00</span></p>
        
        <p>其他要求：<span class='content'>文字文字说明</span></p>
        <!-- 待接单 已接单 已完成 -->
        <input type="button" value='待接单'>
        <!-- <input type="button" value='开始接单'> -->
      </div>
    </div>

    <!-- <clerk-footer :propSubject='"orderCenter"'></clerk-footer> -->
  </div>
</template>

<script>
import SwitchBtn from 'base/SwitchBtn/SwitchBtn.vue'
import ClerkFooter from 'base/ClerkFooter/ClerkFooter.vue'

export default {
  name: 'UserOrderlist',
  props: {
    msg: String
  },
  components: {
    SwitchBtn,
    ClerkFooter
  },
  mounted () {
  },
  methods: {
    getcur () {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "common/sass/variable.scss";
.order-center {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding-bottom: 1.6rem;

  .nav-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-bottom: .1rem;
    padding-top: .2rem;
    background-color: #97acc1;
    li {
      flex: 1;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      &.active {
        a {
          border-bottom: 2px solid $color-sub-red;
        }
      }
      a {
        display: inline-flex;
        padding: .2rem 0;
        color: #fff;
        font-size: .25rem;
      }
    }
  }

  .client-order-lists {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .each-order {
      width: 6rem;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      position: relative;
      border: $border-1px;
      box-shadow:$box-shadow;
      border-radius: .1rem;
      margin-top: .3rem;
      padding: .2rem;
      box-sizing: border-box;
      font-size: .22rem;
      line-height: 1.5;


      p {
        width: 50%;
        color: $color-text-dd;
        span {
          color: $color-text-d;
        }
        &.line {
          width: 100%;
        }
      }

      input {
        // border: 1px solid $color-sub-red;
        background-color: transparent;
        color: $color-sub-red;
        border-radius: .1rem;
        font-size: .23rem;
        // padding: .08rem .16rem;
        position: absolute;
        top: .2rem;
        right: .3rem;
      }
    }
  }

}
</style>

