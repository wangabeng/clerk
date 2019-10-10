<template>
  <div class="admin-center">
    <div class="option-wrapper">
      <div class="each-line-switch">
        <span>接受随机单提醒</span>
        <switch-btn ref='btnComponent1' :propStatus='false'></switch-btn>
      </div>
      <div class="each-line-switch">
        <span>语音连麦</span>
        <switch-btn ref='btnComponent2' :propStatus='false'></switch-btn>
      </div>
      <div class="each-line-switch">
        <span>在线</span>
        <switch-btn ref='btnComponent3' :propStatus='false'></switch-btn>
      </div>
    </div>

    <!-- 导航列表 -->
    <ul class="nav-lists">
      <li>
        <i class="fa fa-bar-chart" aria-hidden="true"></i>
        <span>我的排名及收入</span>
        <i class="fa fa-angle-right" aria-hidden="true"></i>
      </li>
      <li>
        <i class="fa fa-address-card-o" aria-hidden="true"></i>
        <span>修改个人信息</span>
        <i class="fa fa-angle-right" aria-hidden="true"></i>
      </li>
      <li>
        <i class="fa fa-wpforms"></i>
        <span>全部订单</span>
        <i class="fa fa-angle-right" aria-hidden="true"></i>
      </li>
      <li>
        <i class="fa fa-line-chart"></i>
        <span>平台数据统计</span>
        <i class="fa fa-angle-right" aria-hidden="true"></i>
      </li>
      <li>
        <i class="fa fa-shopping-bag" aria-hidden="true"></i>
        <span>我要下单</span>
        <i class="fa fa-angle-right" aria-hidden="true"></i>
      </li>
    </ul>

    <!-- 管理端公共 footer -->
    <clerk-footer :propSubject='"adminCenter"'></clerk-footer>
  </div>
</template>

<script>
import SwitchBtn from 'base/SwitchBtn/SwitchBtn.vue'
import ClerkFooter from 'base/ClerkFooter/ClerkFooter.vue'

export default {
  name: 'AdminCenter',
  props: {
    msg: String
  },
  components: {
    SwitchBtn,
    ClerkFooter
  },
  mounted () {
    // console.log('副组件1', this.$refs.btnComponent.curStatus);
  },
  methods: {
    getcur () {
      // console.log('dangqian开关', this.$refs.btnComponent.curStatus);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "common/sass/variable.scss";
.admin-center {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .option-wrapper {
    background-color: #97acbf;
    width: 100%;
    display: flex;
    flex-direction:column;
    align-items: flex-end;
    padding: .3rem 0;

    .each-line-switch {
      display: flex;
      align-items: center;
      margin: .15rem 0;
      color: #fff;
      font-size: .23rem;
    }
  }

  .nav-lists {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    li {
      width: 100%;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: .15rem .2rem;
      color: $color-text-dd;
      margin-top: .15rem;
      font-size: .24rem;
      span {
        font-weight: bold;
      }
      i {
        &:first-child {
          width: .4rem;
        }
        &:last-child {
          margin-left: auto;
          font-size: .3rem;
        }
      }
    }
  }
}
</style>
