import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/components/Index/Index'

// 客户端
import ClerkLists from '@/components/ClerkLists/ClerkLists'
import ClerkInfo from '@/components/ClerkInfo/ClerkInfo'
import RandomOrder from '@/components/RandomOrder/RandomOrder'
import ApplyNew from '@/components/ApplyNew/ApplyNew'

// 管理端
import AdminCenter from '@/components/AdminCenter/AdminCenter'
import OrderCenter from '@/components/OrderCenter/OrderCenter'
import OrderHall from '@/components/OrderHall/OrderHall'


import {BASEURL, FRONTEURL, APPID} from "src/api/config.js";
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
      path: '/clerklists', // 店员列表
      name: 'ClerkLists',
      component: ClerkLists,
      meta: {
        title: '店员列表',
        // requireAuth: true
      },
    },
    {
      path: '/clerkinfo/:id', // 店员详情
      name: 'ClerkInfo',
      component: ClerkInfo,
      meta: {
        title: '店员信息',
        // requireAuth: true
      },
    },
    {
      path: '/randomorder', // 随机下单
      name: 'RandomOrder',
      component: RandomOrder,
      meta: {
        title: '随机下单',
        // requireAuth: true
      },
    },
    {
      path: '/applynew', // 新店员申请
      name: 'ApplyNew',
      component: ApplyNew,
      meta: {
        title: '新店员申请',
        // requireAuth: true
      },
    },

    // 以下为店员管理端页面
    {
      path: '/admincenter', // 个人中心（管理端）
      name: 'AdminCenter',
      component: AdminCenter,
      meta: {
        title: '个人中心',
        // requireAuth: true
      },
    },
    {
      path: '/ordercenter', // 订单中心 订单列表（管理端）
      name: 'OrderCenter',
      component: OrderCenter,
      meta: {
        title: '订单中心',
        // requireAuth: true
      },
    },
    {
      path: '/orderhall', // 接单大厅（管理端）
      name: 'OrderHall',
      component: OrderHall,
      meta: {
        title: '接单大厅',
        // requireAuth: true
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
  console.log('to:', to.name, 'from:',from.name); // to.name == 'ClerkLists' 
  
  // 设置路由页面的title
  if (to.meta.title) {
    document.title = to.meta.title;
  }


  // 判断将要跳转的路由是否需要鉴权
  if (to.matched.some(record => record.meta.requireAuth)) {
    console.log("需要鉴权");

    // 1 如果当前页面 是微信跳转过来的页面 就执行获取code 发送验证请求
    if (GetQueryString("code")) {
      console.log('获取到code分支');

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
        /*storage.setItem("userinfo", JSON.stringify(response.data.count));
        console.log( "token:", GetStorage("userinfo").token );*/
        console.log('response.data是：',response.data);

        if (response.data.count.token) {
          localStorage.setItem("shiguangshudong", response.data.count.token);
          console.log("进入code页面 跳转前");
          // next(false);
          window.location.href = 'http://' + FRONTEURL + '/#' + to.name;
          console.log("进入code页面 跳转后");
          return false;
        } else {
          console.log("token获取错误");
          next();
        }
        

      }).catch(function (error) {
        console.log("请求不到用户信息");
        // window.location.href = 'www.baidu.com';
        next();
        return false;
      });
    // 第2种情况 页面不带code 就判断是否已经有用户信息并且是否有token信息
    }else if (!localStorage.getItem("shiguangshudong")) {
      console.log("需要权限 没有token信息 需要跳转");
      // 跳转到微信验证页
      // FRONTEURL
      // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa3c69deeaa1b4948&redirect_uri=http%3A%2F%2Fnicedevelop.nat300.top%2F%23%2F' + to.name + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + APPID + '&redirect_uri=http%3A%2F%2F' + FRONTEURL + '%2F%23%2F' + to.name + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
      // next();
      return false;
    } else {
      next();
    }

  } else {
    console.log("不需要权限 什么都没做");
    next();
  }

  
  
})


export default router