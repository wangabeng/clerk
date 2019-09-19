<template>
  <footer class="sticky-footer container-fluid bg-white align-items-center justify-content-center m-footer">
    <div class="row">
      <div class="copyright text-center my-auto">
        <span>Copyright © Your Website 2019</span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'MFooter',
  props: {
    msg: String
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "common/sass/variable.scss";
.m-footer {
  height: 4rem;
  margin-top: -4rem;
  display: flex;
}
</style>
