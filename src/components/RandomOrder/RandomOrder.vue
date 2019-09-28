<template>
  <div id="random-order">
    <!-- 小哥哥或小姐姐 -->
    <div class="each-option-aera">
      <h3 class='form-check'>
        <i class="fa fa-heart-o" aria-hidden="true"></i>
        <span>想和小哥哥还是小姐姐聊天呢？</span>
        <p class="check-txt" v-if='ifSubmit && !sex'>请选择聊天对象</p>
      </h3>
      <label for="male">
        <span>小哥哥</span>
        <input type="radio" name='gender' id='male' value='1' v-model='sex'>
      </label>
      <label for="famale">
        <span>小姐姐</span>
        <input type="radio" name='gender' id='famale' value='2' v-model='sex'>
      </label>
    </div>
    {{sex}}
    <!-- 选择等级 -->
    <div class="each-option-aera">
      <h3 class='form-check'>
        <i class="fa fa-diamond"></i>
        <span>选择等级</span>
        <p class="check-txt" v-if='ifSubmit && !level'>请选择等级</p>
      </h3>
      <label for="putong">
        <span>普通</span>
        <input type="radio" name='level' id='putong' value='1' v-model='level'>
      </label>
      <label for="jinpai">
        <span>金牌</span>
        <input type="radio" name='level' id='jinpai' value='2' v-model='level'>
      </label>
      <label for="zhendian">
        <span>镇店</span>
        <input type="radio" name='level' id='zhendian' value='3' v-model='level'>
      </label>
    </div>
    {{level}}
    <!-- 选择标签 -->
    <div class="each-option-aera">
      <h3>
        <i class="fa fa-tags" aria-hidden="true"></i>
        <span>选择标签（最多选择3个）</span>
      </h3>
      <label for="wenrou">
        <span>温柔的</span>
        <input type="checkbox" name='tag' id='wenrou' value='温柔的' v-model="fantag">
      </label>
      <label for="keai">
        <span>可爱的</span>
        <input type="checkbox" name='tag' id='keai' value='可爱的' v-model="fantag">
      </label>
      <label for="erciyuan">
        <span>二次元</span>
        <input type="checkbox" name='tag' id='erciyuan' value='二次元' v-model="fantag">
      </label>
    </div>
    {{fantag}}

    <!-- 其它要求 -->
    <div class="other-demand">
      <span>其它要求</span>
      <textarea name="" id="" placeholder="如有其它要求，请在此填写" v-model='otherDemand'></textarea>
    </div>
    {{otherDemand}}

    <!-- 下单 -->
    <div class="fixed-place-now">
      <input class='place-btn' type="button" 
        @click='orderIn' value='下单'>
    </div>


    <!-- 遮罩层 -->
    <div class="mask-info-random"  :class="{'open': maskShow}"  
      ></div>

    <!-- 购买弹出窗 -->
    <div class="order-window-random" >
      <!-- 主图及选择规格 -->
      <div class="top-info">
        <img class='close-icon' src="~common/image/close-icon.png" 
          alt="">
        <div class="pic"><img  alt=""></div>
        <div class="sum-txt">
          <p class='amount'><span>¥元</span></p>
          <p class='size'>选择&nbsp;&nbsp;服务类型&nbsp;;&nbsp;&nbsp;时长&nbsp;</p>
          <p class="check-note" >请选择服务类型及时长</p>
        </div>
      </div>
      <!-- 选择规格区 -->
      <div class="select-wrapper">
        <!-- 滚动区 -->
        <div class="select-inner">
          <!-- 类型区 -->
          <!-- <div class="type-area type-time">
            <ul class="">
              <li :class="{'active': xIndex =='1'}" @click="selectType('1')">文字语音条</li>
              <li :class="{'active': xIndex =='2'}" @click="selectType('2')">语音通话</li>
            </ul>            
          </div> -->
          <div class="type-area type-time">
            <ul class="">
              <li >2332323</li>
            </ul>            
          </div>


          <!-- 时长区 -->
          <div class="long-area type-time">
            <h4>时长</h4>
            <ul>
              <li >34324343</li>
            </ul>
          </div>
          <!-- 购买数量 -->
          <div class="amount-area">
            <h4>购买数量</h4>
            <div class="amount-wrapper" >
              <a href="javascript:;"><img src="~common/image/minus-icon.png" alt=""></a>
              <input type="number"  >
              <a href="javascript:;" ><img src="~common/image/add-icon.png" alt=""></a>
            </div>
          </div>
          <!-- 微信号 -->
          <div class="weixin-area form-check">
            <h4>微信号</h4>
            <input type="text" placeholder="请输入微信号">
            <p class='check-txt' >请填写您的微信号</p>
          </div>

        </div>

      </div>
      <!-- 提交按钮区 -->
      <div class="bot-sub">
        <p class="total">
          总价：<span >¥1000元</span><span>-</span>
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

// layer


export default {
  name: 'RandomOrder',
  data () {
    return {
      sex: '', // 性别
      level: '', // 等级
      fantag: [], // 标签
      otherDemand: '',  // 其他要求

      maskShow: false, // 蒙层显示隐藏
      ifSubmit: false, // 提交flag 一旦提交 就执行表单验证
    }
  },
  methods: {
    orderIn () {
      // this.maskShow = true;
      this.ifSubmit = true;
      // 如果有表单为空的 
      var _this = this;
      if (!!this.sex && !!this.level) {
        // 如果有数据为空 就把警告开关打开
        this.ifSubmit = true;
      } else {
        // 打开弹窗
      }
    },
  },
  mounted () {

  },
  created () {

  },
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




/* 遮罩层 */
.mask-info-random {
  position: fixed;
  // display: none;
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
.order-window-random {
  width: 100%;
  position: fixed;
  z-index: 10002;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  // height: 85VH;
  color: $color-text-dd;
  border-top-left-radius: .1rem;
  border-top-right-radius: .1rem;
  // display: none;

  /*transform: translateY(100%);
  transition: all 500ms ease-in-out;

  &.open {
    transform: translateY(0);
  }*/

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
      width: 3.5rem;
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
    // height: calc(85VH-3.3rem);
    // height: e("calc(85VH-3.3rem)");
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
            &.disable {
              background-color: $color-background-d;
              opacity: .4;
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
          &.disable {
            opacity: .5;
          }
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



/* 表单提示 */
.form-check {
  position: relative;
  .check-txt {
    position: absolute;
    display: inline-flex;
    left: 0;
    bottom: 0;
    font-size: .2rem;
    color: #f0ad4e;
    box-sizing: border-box;
    padding-left: .1rem;
    transform: scale(.9);
  }
}
</style>
