<template>
  <div class="order-center">
    订单中心
    <switch-btn ref='btnComponent' :propStatus='false'></switch-btn>
    <br>
    <br>
    <!-- <switch-btn ref='btnComponent2'></switch-btn> -->
  

    <input type="button" value='get' @click='getcur'>

    <clerk-footer :propSubject='"orderCenter"'></clerk-footer>
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
.order-center {
}
</style>

