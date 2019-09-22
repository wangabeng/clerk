import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/components/Index/Index'

import ClerkLists from '@/components/ClerkLists/ClerkLists'
import ClerkInfo from '@/components/ClerkInfo/ClerkInfo'
import RandomOrder from '@/components/RandomOrder/RandomOrder'
import ApplyNew from '@/components/ApplyNew/ApplyNew'

// import Index from '@/components/Index/Index'

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
  // 设置路由页面的title
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  // 判断将要跳转的路由是否需要鉴权
  if (to.matched.some(record => record.meta.requireAuth)) {
    // 如果需要鉴权 就去vuex读取是否有token信息，如果有 就携带上token
    // 如果vuex没有token 就去localStorage读取 前端放行

    // 如果没有 1 发送微信链接get请求 获取code的请求  
    // 2 在回调看是否有code 如果有 就去api获取token
    //       如果回调没有code 就继续请求code 或不处理
    // 3  在第二次回调中获取token 存入vuex和localstorage      


    /*console.log("需要权限");
    console.log(to);
    console.log("需要权限 end");*/
    // 如果未登陆 跳转到登陆页
    /*if(!store.getters.token) {
      next('/login');
      return;
    }*/
  }

  // 
  next();
})


export default router