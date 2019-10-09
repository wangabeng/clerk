<template>
  <div class="admin-center">
    <div class="option-wrapper">
      <switch-btn ref='btnComponent1' :propStatus='true'></switch-btn>
      <switch-btn ref='btnComponent2' :propStatus='true'></switch-btn>
      <switch-btn ref='btnComponent3' :propStatus='true'></switch-btn>
    </div>






    个人中心
    <switch-btn ref='btnComponent' :propStatus='true'></switch-btn>
    <br>
    <br>
    <!-- <switch-btn ref='btnComponent2'></switch-btn> -->
  

    <input type="button" value='get' @click='getcur'>

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
    console.log('副组件1', this.$refs.btnComponent.curStatus);
  },
  methods: {
    getcur () {
      console.log('dangqian开关', this.$refs.btnComponent.curStatus);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "common/sass/variable.scss";
.admin-center {
  .option-wrapper {
    background-color: #97acbf;
  }
}
</style>
