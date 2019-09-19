import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/components/Index/Index'
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
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      meta: {
        title: '首页',
        requireAuth: true // 在需要登录的路由的meta中添加响应的权限标识
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
  // 判断将要跳转的路由是否需要鉴权
  if (to.matched.some(record => record.meta.requireAuth)) {
    /*console.log("需要权限");*/

  }
  // 如果不需要登陆权限 直接进入要跳转的路由页面
  next();
})


export default router