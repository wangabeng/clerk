import * as types from './mutations-type.js'

export const setToken = function ({commit, state}, tokenStr) {
  commit(types.SET_TOKEN, tokenStr)
}
export const setUserInfo = function ({commit, state}, userInfoStr) {
  // 先验证token 然后再获取userInfo 验证这一步业务 应该在前端验证
  /*if (!!state.token) {
    commit(types.SET_USER_INFO, userInfoStr)
  }*/
  commit(types.SET_USER_INFO, userInfoStr)
}
export const setModiNews = function ({commit, state}, newsStr) {
  commit(types.SET_MODI_NEWS, newsStr)
}