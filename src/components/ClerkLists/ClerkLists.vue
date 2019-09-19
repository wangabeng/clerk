<template>
  <div class="clerk-lists">
    店员列表
    <a href="javascript:;" @click='randomLink'>ddd</a>
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
  name: 'ClerkLists',
  mounted () {
    console.log("adfdfdf", $("#m-index").html());
  },
  methods: {
    randomLink () {
      this.$router.push('/randomorder');
    }
  }
}
</script>

<style scoped lang="scss">
@import "common/sass/variable.scss";
.clerk-lists {
  color: $color-sub-blue;
  width: 6rem;
  background: blue;
}
</style>
