<template>
  <div class="clerk-footer">
    <div class="clerk-footer-wrapper">
      <router-link :to="{ path: '/orderhall' }" tag="div" class="each-nav" 
        :class="{'active': curSubject == 'orderHall'}">
        <i class="fa fa-home" aria-hidden="true"></i>
        <span>接单大厅</span>
      </router-link>
      <router-link :to="{ path: '/ordercenter' }" tag="div" class="each-nav" 
        :class="{'active': curSubject == 'orderCenter'}">
        <i class="fa fa-file-text mid-icon" aria-hidden="true"></i>
        <span>订单中心</span>
      </router-link>
      <router-link :to="{ path: '/admincenter' }" tag="div" class="each-nav" 
        :class="{'active': curSubject == 'adminCenter'}">
        <i class="fa fa-user" aria-hidden="true"></i>
        <span>个人中心</span>
      </router-link>
      <!-- <div class="each-nav" :class="{'active': curSubject == 'adminCenter'}">
        <i class="fa fa-user" aria-hidden="true"></i>
        <span>个人中心</span>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClerkFooter',
  data () {
    return {
      curSubject: this.propSubject
    };
  },
  props: {
    propSubject: {
      type: String,
      default: ''
    }
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "common/sass/variable.scss";

.clerk-footer {
  width: 6.4rem;
  position: fixed;
  left: 50%;
  bottom: 0;
  margin-left: -3.2rem;
  z-index: 100;
  box-sizing: border-box;
  border-top: 1px solid #f1f1f1;
  .clerk-footer-wrapper {
    height: 1.1rem;
    background-color: #fff;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .each-nav {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: $color-text-d;
      
      &.active {
        color: $color-sub-red;
      }

      i {
        font-size: .5rem;
        &.mid-icon {
          transform: scale(.8);
        }
      }
      span {
        margin-top: .1rem;
        font-size: .23rem;
      }
    }
  }
}
</style>
