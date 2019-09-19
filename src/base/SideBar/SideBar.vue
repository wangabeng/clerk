<template>
  <!-- 侧边栏 -->
  <!-- common-status  shrink 展开伸缩状态 切换class -->
  <nav ref="sideBar" class="side-navbar common-status mCustomScrollbar">
    <div class="sidenav-header d-flex flex-colum align-items-center justify-content-center">
      <!-- User Info -->
      <div class="sidenav-header-inner d-flex flex-column align-items-center justify-content-center">
        <img src="https://d19m59y37dris4.cloudfront.net/dashboard/1-4-5/img/avatar-7.jpg" alt="person" class="img-fluid rounded-circle user-portrait">
        <h2 class='pt-1'>Nathan Andrews</h2><span>Web Developer</span>
      </div>
      <!-- Small Brand information, appears on minimized sidebar -->
      <div class="sidenav-header-logo p-0"><a href="index.html" class="brand-small text-center d-flex flex-column h-100 justify-content-center align-items-center"><img src="https://images.unsplash.com/photo-1520719627573-5e2c1a6610f0?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=60&h=60&fit=crop&ixid=eyJhcHBfaWQiOjF9" alt="" class=''></a></div>
    </div>
    
    <!-- Sidebar Navigation Menus -->
    <div class="main-menu">
      <h5 class="sidenav-heading">Main</h5>
      <ul id="side-main-menu" class="side-main-menu list-unstyled">                  
        <!-- <li><a href="index.html"><i class="fa fa-h-square left-icon" aria-hidden="true"></i><span>Home</span><i class="fa fa-angle-right right-icon" aria-hidden="true"></i></a></li>
        <li><a href="forms.html"><i class="fa fa-h-square left-icon" aria-hidden="true"></i><span>Forms</span><i class="fa fa-angle-right right-icon" aria-hidden="true"></i></a></li>
        <li class=""><a href="charts.html"> <i class="fa fa-bar-chart left-icon"></i><span>Charts</span><i class="fa fa-angle-right right-icon" aria-hidden="true"></i></a></li>
        <li><a href="tables.html"><i class="fa fa-h-square left-icon" aria-hidden="true"></i><span>Tables</span><i class="fa fa-angle-right right-icon" aria-hidden="true"></i></a></li> -->

        <!-- 带下拉分类 -->
        <li class='active' >
          <a href="javascript:;" aria-expanded="false" data-toggle="collapse" 
            @click='outerLiTab($event)'><i class="fa fa-h-square left-icon" aria-hidden="true"></i><span>新闻相关</span><i class="fa fa-angle-right right-icon" aria-hidden="true"></i></a>
          <ul id="exampledropdownDropdown" class="collapse list-unstyled dropdown-wrpper show">
            <!-- <li><a href="javascript:;" @click='subLiTab($event)'>Page</a></li>
            <li><a href="javascript:;" class='' @click='subLiTab($event)'>Page</a></li> -->

            <li><a href="javascript:;" class='active' @click='subLiTab("/index/articlelists", $event)'>新闻中心</a></li>

            <li><a href="javascript:;" class='' @click='subLiTab("/index/publishNew", $event)'>新增新闻</a></li>

            <li><a href="javascript:;" class='' @click='subLiTab("/index/articledetail/1568701749974365048", $event)'>新闻详情</a></li>


          </ul>
        </li>

        <!-- 带下拉分类 -->
        <li class='' >
          <a href="javascript:;" aria-expanded="false" data-toggle="collapse" 
            @click='outerLiTab($event)'><i class="fa fa-h-square left-icon" aria-hidden="true"></i><span>下拉菜单</span><i class="fa fa-angle-right right-icon" aria-hidden="true"></i></a>
          <ul id="exampledropdownDropdown" class="collapse list-unstyled dropdown-wrpper show">
            <li><a href="javascript:;" @click='subLiTab($event)'>Page</a></li>
            <li><a href="javascript:;" class='' @click='subLiTab($event)'>Page</a></li>
            <li><a href="javascript:;" @click='subLiTab($event)'>Page</a></li>
          </ul>
        </li>
        
        <li>
          <a href="#"><i class="fa fa-h-square left-icon" aria-hidden="true"></i><span>Demo</span>
          <div class="badge badge-warning ml-1">6 New</div><i class="fa fa-angle-right right-icon" aria-hidden="true"></i></a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
// import mcustomscrollbar from 'malihu-custom-scrollbar-plugin'

export default {
  name: 'SideBar',
  props: {
    msg: String
  },
  methods: {
    // 一级分类收缩展开
    outerLiTab: function (e) {
      $(e.currentTarget).find(".right-icon").toggleClass("collapse-status");
      $(e.currentTarget).parent().find('ul.collapse').slideToggle();
    },
    // 二级分类切换
    subLiTab: function (path, e) {
      this.$router.push({ path: path, /*query: {type: 1, page: 1}*/});

      $(".dropdown-wrpper li a").removeClass('active');
      $(e.currentTarget).addClass('active');
      
      $(".side-main-menu>li").removeClass('active');
      $(e.currentTarget).parent().parents("li").addClass('active');
      return false;
    },
  },
  mounted () {
    // console.log(mcustomscrollbar);
    /*$(this.$refs.sideBar).mCustomScrollbar({
      axis:"y" // 水平滚动条
      ,theme: "light"
    });*///content为需要增加滚动条的class
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "common/sass/variable.scss";
@import "common/sass/index.scss";
/* 侧边栏展开状态 */
.side-navbar.common-status {
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
  /*相对视窗高度*/
  height: 100%;
  width: 200px;
  text-align: left;
  color: #fff;
  z-index: 999;
  overflow-y: auto;
  transition: all 0.3s;
  background-color: #393836;

  &::-webkit-scrollbar {
    display: none;
  }

  .sidenav-header {
    background: #292929;
    padding: 14px;
    margin-bottom: 10px;
    width: 100%;
    line-height: 1;

    .sidenav-header-inner {
      img.user-portrait {
        width: 50px!important;
        height: 50px!important;
      }
      h2 {
        font-size: 1.2rem;
        font-weight: bold;
        color: #fff;
        text-align: center;
      }
      span {
        font-size: .8rem;
        color: #aaa;
      }
    }

    .sidenav-header-logo {
      height: 75px;
      box-sizing: border-box;
      display: none;
    }
  }

  .main-menu {
    h5 {
      font-weight: 700;
      color: #adb5bd;
      font-size: .9rem;
      text-transform: uppercase;
      letter-spacing: .1em;
      margin-left: 10px;
      margin-top: 10px;
      margin-bottom: 10px;
    }
    ul.side-main-menu {
      >li {
        &.active {
          >a {
            background-color: #2b90d9;
          }
          /* 次级分类 */
          >ul.collapse {
            >li {
              >a {
                border-left: 2px solid #2b90d9;
              }
            }
          }
        }
        >a {
          position: relative;
          font-size: .9rem;
          font-weight: 300;
          color: #fff;
          text-decoration: none;
          width: 100%;
          padding: 12px;
          display: flex;
          flex-direction: row;
          align-items: center;
          i.left-icon {
            margin-right: .6rem;
            font-size: 1.2rem;
            width: 1.2rem;
          }
          i.right-icon {
            margin-left: auto;
            margin-right: .3rem;
            transform: rotate(0deg);
            transition: all 100ms ease;

            &.collapse-status {
              transform: rotate(90deg);
            }
          }
        }
        
        /* 次级分类 */
        >ul.collapse {
          >li {
            >a {
              color: #007bff;
              display: flex;
              text-decoration: none;
              background-color: transparent;
              font-size: .9rem;
              font-weight: 300;
              color: #fff;
              text-decoration: none;
              width: 100%;
              padding: 12px;
              padding-left: 20px;
              // border-left: 2px solid #2b90d9;
              &.active {
                background-color: #2b90d9;
              }
            }
          }
        }
      }
    }
  }
}

/* 侧边栏伸缩状态 */
.side-navbar.shrink {
  width: 70px;
  text-align: left;
  color: #fff;
  z-index: 999;
  overflow-y: auto;
  transition: all 0.3s;
  background-color: #393836;

  .sidenav-header {
    background: #292929;
    width: 100%;
    line-height: 1;
    padding: 0;

    .sidenav-header-inner {
      display: none!important;
      img.user-portrait {
        width: 50px!important;
        height: 50px!important;
      }
      h2 {
        font-size: 1.2rem;
        font-weight: bold;
        color: #fff;
        text-align: center;
      }
      span {
        font-size: .8rem;
        color: #aaa;
      }
    }

    .sidenav-header-logo {
      display: flex;
      height: 75px;
      box-sizing: border-box;
      a {
        img {
          width: 3rem;
          height: 3rem;
          border-radius: 50%!important;
        }
      }
    }
  }

  .main-menu {
    h5 {
      font-weight: 700;
      color: #adb5bd;
      font-size: .9rem;
      text-transform: uppercase;
      letter-spacing: .1em;
      margin-left: 10px;
      margin-top: 10px;
      margin-bottom: 10px;
    }
    ul.side-main-menu {
      >li {
        &.active {
          >a {
            background-color: #2b90d9;
          }
        }
        >a {
          position: relative;
          font-size: .9rem;
          font-weight: 300;
          color: #fff;
          text-decoration: none;
          width: 100%;
          padding: 12px 2px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          i.left-icon {
            font-size: 1.2rem;
            margin-right: 0;
            width: 1.2rem;
            text-align: center;
          }
          span {
            margin: .2rem 0;
          }
          i.right-icon {
            transform: rotate(0deg);
            transition: all 100ms ease;

            margin: 0;

            &.collapse-status {
              transform: rotate(90deg);
            }
          }
        }
        
      }
    }
  }
}
/* .side-bar {
  col-md-2 列宽
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 250px;
  min-height: 100%;
  z-index: 10003!important;
  // box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
  background-color: rgb(33, 42, 57);
  overflow: hidden;
  padding: 0;
  margin: 0;


  .app-brand {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    display: block;
    background-color: #4c84ff;
    z-index: 101;
    a {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 75px;
      line-height: 75px;
      width: 250px;
      transition: width 0.3s ease-in-out;
      padding-left: 1.56rem;
      color: #fff;
      span {
        padding-left: 10px;
      }
    }
  }

  .slimScrollDiv {
    width: 100%;
    height: 100%;
    padding-top: 75px;
    box-sizing: border-box;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 0;
    }
    >ul {
      width: 100%;
      >li {
        width: 100%;
        >a {
          padding: 1.25rem 1.56rem;
          width: 100%;
          display: flex;
          flex-direction: row;
          font-size: 1rem;
          align-items: center;
          color: #a6aab4;
          background-color: #212a39;
          >.type-icon {
            padding: 0 10px 0 0;
            // color: #4c84ff;
            color: #a6aab4;
            font-size: 1.5rem;
          }
          >.arrow-icon {
            display: flex;
            margin-left: auto;
          }
        }
        二级菜单
        .sub-menu {
          list-style-type: none;
          padding: .1rem 0 .1rem 2.2rem;
          width: 100%;
          box-sizing: border-box;
          margin: 0;
          position: relative;
          background: #1d2531;
          >li {
            width: 100%;
            height: 3rem;
            align-items: center;
            display: flex;
            justify-content: center;
            position: relative;
            vue路由 a激活状态样式
            &.router-link-exact-active, &.router-link-active {
              a {
                text-decoration: none;
                color: #fff!important;
                font-weight: 500!important;                
              }
              &:after {
                content: "";
                position: absolute;
                width: 5px;
                height: 100%;
                right: 0;
                top: 0;
                background-color: #4c84ff;
              }
            }

            >a {
              width: 100%;
              color: #b7c0cd;
              font-size: 1rem;
              padding: 0 1.25rem 0 1.5rem;
              box-sizing: border-box;
              text-align: left;

            }
          }
        }
      }
    }
  }


} */
</style>
