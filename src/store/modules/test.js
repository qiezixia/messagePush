
/* 用于存储公用简单的vuex状态 */

const state = {
  loading: true // 网络请求状态
}

const getters = {
  // 用户信息
  globalState: state => {
    return state
  }
}

const mutations = {
  // 初始化state
  initGlobalState (state, params) {
    Object.keys(state).forEach(key => {
      state[key] = params[key]
    })
  }
}

const actions = {

  changeGlobalState ({ commit }, params) {
    commit('initGlobalState', params)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
