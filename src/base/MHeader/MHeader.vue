<template>
  <!-- <div class="m-header container-fluid">
    <nav class="navbar navbar-expand navbar-light bg-white topbar row align-items-center justify-content-start
      row h100 nav-contant
    ">
  
      Sidebar Toggle (Topbar)
      <button id="sidebar-toggler" class="sidebar-toggle ml-3 mr-5 category-nav">
        <i class="fa fa-bars" aria-hidden="true"></i>
      </button>
  
      Topbar Search
      <form class="d-none d-sm-inline-block form-inline navbar-search col-4 search-container">
        <div class="input-group">
          <input type="text" class="form-control bg-light border-0 small" placeholder="Search for..1111." aria-label="Search" aria-describedby="basic-addon2">
          <div class="input-group-append">
            <button class="btn btn-primary" type="button">
              <i class="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </form>
  
      Topbar Navbar
      <ul class="navbar-nav user-container ml-auto">
  
         Nav Item - User Information
        <li class="nav-item dropdown no-arrow show">
          <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            <span class="mr-3 d-none d-lg-inline ">{{token}}</span>
            <img class="img-profile rounded-circle ml-2 mr-2" src="https://source.unsplash.com/QAB-WJcbgJk/60x60">
          </a>
          Dropdown - User Information
          <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in hide" aria-labelledby="userDropdown">
            <a class="dropdown-item" href="#">
              <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
              Profile
            </a>
            <a class="dropdown-item" href="#">
              <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
              Settings
            </a>
            <a class="dropdown-item" href="#">
              <i class="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
              Activity Log
            </a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
              <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
              Logout
            </a>
          </div>
        </li>
  
      </ul>
  
    </nav>
  </div> -->

</template>

<script>
import {mapGetters, mapActions} from 'vuex';

export default {
  name: 'MHeader',
  date () {
    return {};
  },
  computed: {
    ...mapGetters([
      'token',
      'userInfo'
    ])
  },
  methods: {
    ...mapActions([
      'setToken',
      'setUserInfo'
    ])
  },
  props: {
    msg: String
  },
  mounted () {
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "common/sass/variable.scss";
/* .m-header {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: fixed;
  z-index: 10002!important;
  top: 0;
  left: 0;
  right: 0;
  height: 75px;
  padding-left: 250px;
  padding-right: 0;
  box-sizing: border-box;
  z-index:99;
  background-color: #ffffff;
  border-bottom: $border-1px;
  
  .nav-contant {
    width: 100%;
    padding: 0;
    margin: 0;

    .category-nav {
      background-color: transparent;
      border: 0;
      cursor: pointer;
      color: #8a909d;
      >i {
        font-size: 2rem;
      }
    }

    .search-container {}
    .user-container {
      margin-right: 1rem;
      >li {
        >a {
          img {
            width: 3.5rem;
            height: 3.5rem;
          }
        }
      }
    }
  }
} */

</style>
