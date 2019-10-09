<template>
  <div class="switch-container" :class="{'on': curStatus, 'off': !curStatus}" @click='tabOpen'>
    <div class="switch-btn"></div>
  </div>
</template>

<script>
export default {
  name: 'SwitchBtn',
  data () {
    return {
      curStatus: this.propStatus,
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
      this.curStatus = !this.curStatus;
      // console.log(this.curStatus);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "common/sass/variable.scss";
/*外层容器*/
/*默认状态*/
.switch-container {
  margin: 0 .2rem;
  position: relative;
  display: inline-block;
  box-sizing: content-box;
  width: 1rem;
  height: .5rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 1rem;

  background-color: #fff;
}
.switch-btn {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: .5rem;
  height: .5rem;
  background-color: #fff;
  border-radius: 100%;
  box-shadow: 0 3px 1px 0 rgba(0, 0, 0, 0.05), 0 2px 2px 0 rgba(0, 0, 0, 0.1), 0 3px 3px 0 rgba(0, 0, 0, 0.05);

    
}
/*打开状态*/
.switch-container.on {
  background-color: #1989fa;
  transition: background-color 0.3s;
}
.switch-container.on .switch-btn {
  transform: translateX(.5rem);
  transition: transform 0.3s;
}
/*关闭状态*/
.switch-container.off {
  background-color: #f1f3f4;
  transition: background-color 0.3s;
}
.switch-container.off .switch-btn {
  transform: translateX(0);
  transition: transform 0.3s;
}
</style>
