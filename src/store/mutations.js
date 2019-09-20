import * as types from './mutations-type.js'

const mutations = {
  [types.SET_TOKEN] (state, tokenStr) {
    state.token = tokenStr
  },
  [types.SET_USER_INFO] (state, userInfoStr) {
    state.userInfo = userInfoStr
  },
}

export default mutations