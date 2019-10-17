<template>
  <div class="user-footer">
    <div class="user-footer-wrapper">
      <router-link :to="{ path: '/clerklists' }" tag="div" class="each-nav" 
        :class="{'active': curSubject == 'orderCommon'}">
        <!-- <img src="./common-order.svg"> -->
        <!-- <i class='common-order'></i> -->
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
        <metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
        <g><g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"><path d="M4530.1,5007.9C3375.4,4889,2341.7,4400,1530.4,3588.6C751.6,2809.9,287.5,1860.5,124.4,723.1c-32.6-226.3-32.6-982,0-1208.3c163-1137.4,629.1-2086.8,1405.9-2865.5c776.8-776.8,1730-1244.8,2865.5-1405.9c226.3-32.6,982-32.6,1208.3,0c939.8,134.3,1779.9,491,2474.2,1053c987.8,797.9,1611.1,1916.1,1797.2,3218.4c32.6,226.3,32.6,982,0,1208.3c-161.1,1135.5-629.1,2088.7-1405.9,2865.5c-759.5,759.5-1687.8,1223.7-2779.2,1392.5C5448.8,5017.5,4775.6,5034.8,4530.1,5007.9z M5101.6,2412.9c105.5-38.4,197.6-117,257-216.7c42.2-74.8,53.7-118.9,59.5-257l7.7-168.8l771-5.8l769.1-5.8l65.2-46c92.1-65.2,136.2-174.5,136.2-341.4v-140H5395.1c-1712.8,0-1776.1-1.9-1895-38.4c-155.4-47.9-329.9-159.2-427.7-274.3c-51.8-61.4-255.1-450.7-632.9-1217.9l-556.2-1127.8l-5.8,1469.2l-3.8,1467.3l44.1,84.4c30.7,59.5,69.1,99.7,126.6,130.4c84.4,44.1,88.2,44.1,830.5,44.1H3619v130.4c0,178.4,42.2,293.5,147.7,397c130.4,132.3,180.3,141.9,763.4,141.9C4898.3,2437.8,5047.9,2432.1,5101.6,2412.9z M8542.5,840.1c38.4-44.1,46-71,38.4-124.7c-13.4-101.7-1287-2662.2-1361.8-2740.8c-34.5-36.5-103.6-88.2-157.3-115.1l-95.9-51.8l-2416.7-5.8c-1793.3-3.8-2430.1,1.9-2470.4,17.3c-67.1,28.8-109.3,88.2-109.3,151.5c0,72.9,1292.7,2679.4,1367.5,2758.1c61.4,63.3,170.7,130.4,262.8,159.2c26.9,7.7,1139.3,13.4,2470.4,11.5l2424.4-3.8L8542.5,840.1z"/><path d="M3993,2063.8c-40.3-44.1-47.9-71-47.9-172.6v-122.7h575.4h575.4v124.7c0,109.3-5.7,132.3-47.9,172.6l-46,47.9h-481.4h-481.4L3993,2063.8z"/></g></g>
        </svg>
        <span>正常下单</span>
      </router-link>
      <router-link :to="{ path: '/randomorder' }" tag="div" class="each-nav" 
        :class="{'active': curSubject == 'randomOrder'}">
        <!-- <img src="./random-order.svg"> -->
        <!-- <i class='random-order'></i> -->
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
        <metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
        <g><g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"><path d="M4530.1,5007.9C3375.4,4889,2341.7,4400,1530.4,3588.6C751.6,2809.9,287.5,1860.5,124.4,723.1c-32.6-226.3-32.6-982,0-1208.3c163-1137.4,629.1-2086.8,1405.9-2865.5c776.8-776.8,1730-1244.8,2865.5-1405.9c226.3-32.6,982-32.6,1208.3,0c939.8,134.3,1779.9,491,2474.2,1053c987.8,797.9,1611.1,1916.1,1797.2,3218.4c32.6,226.3,32.6,982,0,1208.3c-161.1,1135.5-629.1,2088.7-1405.9,2865.5c-759.5,759.5-1687.8,1223.7-2779.2,1392.5C5448.8,5017.5,4775.6,5034.8,4530.1,5007.9z M7142.4,2957.6c588.8-78.6,1070.2-462.2,1269.7-1010.8c314.5-857.3-189.9-1806.7-1076-2029.2L7209.5-115l9.6-184.1c5.8-103.6,13.4-188,17.2-191.8c1.9-3.8,46-17.3,97.8-30.7l92.1-23l3.8-991.6l3.8-989.7l-71-59.4c-103.6-86.3-258.9-138.1-408.5-140c-105.5,0-149.6,11.5-249.3,59.5c-67.1,32.6-141.9,76.7-165,97.8l-44.1,36.4v995.4v995.4l105.5,34.5l105.5,32.6v180.3v182.2l-51.8,11.5c-134.3,28.8-364.4,117-471.8,182.2l-118.9,71l-9.6-1248.6l-9.6-1250.5l-53.7-90.2c-59.5-101.6-151.5-180.3-257-218.6c-59.5-21.1-410.4-25-1818.3-25c-1714.7-1.9-1747.3,0-1831.7,38.4c-115.1,51.8-188,122.8-241.7,237.9l-46,95.9v1743.4c0,1311.9,5.7,1762.6,23,1822.1c30.7,105.5,189.9,264.7,295.4,295.4c59.4,17.3,481.4,23,1691.7,23h1611.1l23,128.5c111.2,638.7,667.5,1168.1,1313.8,1250.5C6944.9,2978.7,6973.6,2978.7,7142.4,2957.6z"/><path d="M6668.7,2572.1c-230.2-59.5-374-141.9-546.6-314.6c-176.5-176.5-260.8-320.3-316.5-539C5611.8,964.8,6166.1,236,6937.2,228.3c222.5-1.9,345.2,24.9,554.3,124.7c297.3,141.9,542.8,443.1,625.3,772.9c36.4,145.8,36.4,429.6,0,575.4c-109.3,433.5-477.6,792.1-903.4,882.3C7035,2622,6841.3,2618.1,6668.7,2572.1z"/><path d="M2583.3,502.6V349.1h1333h1333v153.4V656h-1333h-1333V502.6z"/><path d="M2583.3-552.3v-153.4h1333h1333v153.4v153.4h-1333h-1333V-552.3z"/><path d="M2583.3-1607.2v-153.4h1333h1333v153.4v153.4h-1333h-1333V-1607.2z"/></g></g>
        </svg>
        <span>随机下单</span>
      </router-link>
      <router-link :to="{ path: '/userorderlist' }" tag="div" class="each-nav" 
        :class="{'active': curSubject == 'userOrderList'}">
        <!-- <img src="./user-center.svg"> -->
        <!-- <i class='user-center'></i> -->
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
        <metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
        <g><g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"><path d="M4530.1,5007.9C3375.4,4889,2341.7,4400,1530.4,3588.6C751.6,2809.9,287.5,1860.5,124.4,723.1c-32.6-226.3-32.6-982,0-1208.3c163-1137.4,629.1-2086.8,1405.9-2865.5c776.8-776.8,1730-1244.8,2865.5-1405.9c226.3-32.6,982-32.6,1208.3,0c939.8,134.3,1779.9,491,2474.2,1053c987.8,797.9,1611.1,1916.1,1797.2,3218.4c32.6,226.3,32.6,982,0,1208.3c-161.1,1135.5-629.1,2088.7-1405.9,2865.5c-759.5,759.5-1687.8,1223.7-2779.2,1392.5C5448.8,5017.5,4775.6,5034.8,4530.1,5007.9z M6879.6,2593.2v-882.3h-147.7c-82.5,0-168.8-5.8-191.8-11.5l-44.1-11.5v702v702h-2129h-2129V761.5v-2330.4h1390.5h1390.5v-191.8v-191.8H3436.8H1854.5v2714v2714h2512.6h2512.6V2593.2z M5959,2017.8V1826H4376.6H2794.3v191.8v191.8h1582.3H5959V2017.8z M6965.9,1336.9c504.4-107.4,859.3-567.7,828.6-1074.1C7740.8-619.4,6699.3-1041.4,6053-441.1c-186,170.7-289.6,370.2-324.2,623.3c-74.8,523.6,287.7,1041.5,811.3,1154.6C6697.4,1371.4,6802.9,1371.4,6965.9,1336.9z M5517.9,953.3c0-5.8-15.3-42.2-36.4-82.5c-34.5-71-65.2-159.2-86.3-257l-11.5-53.7H4088.9H2794.3v201.4v201.4h1361.8C4906,962.9,5517.9,959.1,5517.9,953.3z M5571.6-383.5c30.7-55.6,72.9-122.8,94-147.7l38.4-47.9l-113.2-53.7l-115.1-53.7H4135H2794.3v201.4v201.4h1359.9H5514L5571.6-383.5z M7834.8-964.7c122.8-67.1,184.1-136.2,251.3-278.1l49.9-105.5v-939.8v-939.8l-1377.1-5.7l-1377.1-3.8l5.8,953.2l5.8,955.2l53.7,109.3c30.7,61.4,92.1,143.8,140,186c155.4,136.2,134.3,134.3,1196.8,130.4l949.4-3.8L7834.8-964.7z"/></g></g>
        </svg>
        <span>我的订单</span>
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
  name: 'UserFooter',
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
@import "common/sass/mixin.scss";

.user-footer {
  width: 6.4rem;
  position: fixed;
  left: 50%;
  bottom: 0;
  margin-left: -3.2rem;
  z-index: 100;
  box-sizing: border-box;
  border-top: 1px solid #f1f1f1;
  .user-footer-wrapper {
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
        svg {
          path {
            fill: $color-sub-red;
          }
        }
      }

      img {
        display: inline-flex;
        width: .5rem;
        height: .5rem;
      }
      i {
        display: inline-flex;
        width: .5rem;
        height: .5rem;
        background-size: cover;
        &.common-order {
          @include background_fill("./common-order.svg");
        }
        &.random-order {
          @include background_fill("./random-order.svg");
        }
        &.user-center {
          @include background_fill("./user-center.svg");
        }
      }
      svg {
        display: inline-flex;
        width: .5rem;
        height: .5rem;
        path {
          fill: $color-text-d;
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
