<template>
  <div id="m-index">
    index<i class="fa fa-volume-up" aria-hidden="true"></i>
  </div>
</template>

<script>
// import HelloWorld from 'components/HelloWorld/HelloWorld.vue'
// import Index from 'components/Index/Index.vue'
// import SideBar from 'base/SideBar/SideBar.vue'
// import MHeader from 'base/MHeader/MHeader.vue'
// import MFooter from 'base/MFooter/MFooter.vue'

// import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'Index',
  created () {
    console.log("adfdfdf", $("#m-index").html());
  }
}
</script>

<style scoped lang="scss">
@import "common/sass/variable.scss";
#m-index {
  color: $color-sub-blue;
  width: 6rem;
  background: blue;
}
</style>
