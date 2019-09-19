import * as types from './mutations-type.js'

const mutations = {
  [types.SET_TOKEN] (state, tokenStr) {
    state.token = tokenStr
  },
  [types.SET_USER_INFO] (state, userInfoStr) {
    state.userInfo = userInfoStr
  },
  [types.SET_MODI_NEWS] (state, newsStr) {
    state.modiNews = newsStr
  }
}

export default mutations