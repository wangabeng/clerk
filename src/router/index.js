import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/components/Index/Index'

import ClerkLists from '@/components/ClerkLists/ClerkLists'
import ClerkInfo from '@/components/ClerkInfo/ClerkInfo'
import RandomOrder from '@/components/RandomOrder/RandomOrder'
import ApplyNew from '@/components/ApplyNew/ApplyNew'


import {BASEURL, WEIXINCERTI} from "src/api/config.js";
// import Index from '@/components/Index/Index'

import {GetQueryString, SaveStorage, GetStorage} from "src/api/utils.js";

import getToken from 'src/api/getToken.js';
import axios from 'src/api/axios';
import Qs from 'qs';

import store from '@/store/index'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
  // 如果开启history模式 会出现如果二级路由找不到 无法跳转到404页面的错误 此时需要后端配合 重定向到index.html页
  // mode: 'history',
  routes: [
    {
      path: '/',
      name:'index',
      redirect: '/clerklists'
    },
    /*{
      path: '/index',
      name: 'Index',
      component: Index,
      meta: {
        title: '首页',
        requireAuth: true // 在需要登录的路由的meta中添加响应的权限标识
      },
    },*/
    {
      path: '/clerklists',
      name: 'ClerkLists',
      component: ClerkLists,
      meta: {
        title: '店员列表',
        requireAuth: true
      },
    },
    {
      // path: '/clerkinfo/:id',
      path: '/clerkinfo/:id',
      name: 'ClerkInfo',
      component: ClerkInfo,
      meta: {
        title: '店员信息',
        requireAuth: true
      },
    },
    {
      path: '/randomorder',
      name: 'RandomOrder',
      component: RandomOrder,
      meta: {
        title: '随机下单',
        requireAuth: true
      },
    },
    {
      path: '/applynew',
      name: 'ApplyNew',
      component: ApplyNew,
      meta: {
        title: '新店员申请',
        requireAuth: true
      },
    },
    
    /*{
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        title: '首页',
        requireAuth: true // 在需要登录的路由的meta中添加响应的权限标识
      },
    },*/
    /*{
      path: '*', //全不匹配的情况下，返回404，路由按顺序从上到下，依次匹配。最后一个*能匹配全部，
      component: NotFound,
    },*/

  ],

})


// 路由卫士 鉴权 获取和设置用户token及userInfo信息
router.beforeEach((to, from, next) => {
  var storage = window.localStorage;
  console.log('to:', to.name, '获取item:' + GetStorage('userinfo'));
  
  // 设置路由页面的title
  if (to.meta.title) {
    document.title = to.meta.title;
  }

  // 获页面由参数
  /*function GetQueryString(name)
  {

       var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");

       var r = window.location.search.substr(1).match(reg);

       if(r!=null)return  unescape(r[2]); return null;

  }
  console.log(GetQueryString("code"));
  if(GetQueryString("code")) {
    setTimeout(function () {
      window.location.href = 'http://localhost:8080/'
    }, 3000);    
  }*/

  // 获取页面参数 结束
  /*console.log('yuansheng获取：' + GetQueryString("code"));
  console.log('to.query.code:' + to.query.code);*/


  // 判断将要跳转的路由是否需要鉴权
  if (to.matched.some(record => record.meta.requireAuth)) {
    // 如果需要鉴权 就去vuex读取是否有token信息，如果有 就携带上token
    // 如果vuex没有token 就去localStorage读取 前端放行

    // 1 如果在ClerkLists这个页面 且是微信跳转过来的页面 就执行获取code 发送验证请求
    if (to.name == 'ClerkLists' && !!GetQueryString("code")) {
      
      // 发送ajax请求 携带code 去服务器验证
      var prarmData = {
        code: GetQueryString("code")
      }
      axios({
        method: 'post',
        url: '/wechatauth',
        data: Qs.stringify(prarmData),
      }).then(function (response) {
        // 获取到用户信息 写入本地存储
        storage.setItem("userinfo", JSON.stringify(response.data.count));
        console.log( "token:", GetStorage("userinfo").token );


        // window.location.href = 'http://nicedevelop.nat300.top/';
        next('/clerklists');
        return;
      }).catch(function (error) {
        console.log("请求不到用户信息");
        // window.location.href = 'www.baidu.com';
        next();
        return false;
      });
    }else if (!storage.getItem("userinfo")) { // 如果没有
      console.log("需要权限 没有userinfo信息 需要跳转");
      // 跳转到微信验证页
      window.location.href = WEIXINCERTI;
      return false;
    }
 
    
    // 第2种情况 页面不带code 就判断是否已经有用户信息 
    // 注意if分支和异步问题
    
    /*console.log(window.localStorage.getItem("userinfo"));
    if (!storage.getItem("userinfo")) { // 如果没有
      console.log("需要权限 没有userinfo信息 需要跳转");
      // 跳转到微信验证页
      window.location.href = WEIXINCERTI;
      return false;
    } */

  }

  // 
  next();
})


export default router