// const SDK = require('../../sdk/NIM_Web_SDK_v6.1.0.js')

const state = {
  nim: null, // 网络请求状态
  sessionsList: [] // 会话列表
}

const getters = {
  // 用户信息
  nim: state => { return state.nim },
  sessionsList: state => { return state.sessionsList }
}

const mutations = {

}

const actions = {
  // 初始化SDK
  initNimSDK ({ state, commit }) {
    state.nim = window.SDK.NIM.getInstance({
      // debug: true,
      appKey: '4b024821f348f78566c75dea9b0b285e',
      account: '1f7086e015e6eaad20cdc911ce025587',
      token: 'db2f198963e49a478cda900fbe2e5a6f',
      db: true, // 若不要开启数据库请设置false。SDK默认为true。
      // privateConf: {}, // 私有化部署方案所需的配置
      onconnect: onConnect,
      onwillreconnect: onWillReconnect,
      ondisconnect: onDisconnect,
      onerror: function (error) {
        console.log(error)
      },
      onsessions: onSessions,
      onupdatesession: onUpdateSession
    })
    function onConnect () {
      console.log('连接成功')
    }
    function onWillReconnect (obj) {
      // 此时说明 SDK 已经断开连接, 请开发者在界面上提示用户连接已断开, 而且正在重新建立连接
      console.log('即将重连')
      console.log(obj.retryCount)
      console.log(obj.duration)
    }
    function onDisconnect (error) {
      // 此时说明 SDK 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面
      console.log('丢失连接')
      console.log(error)
      if (error) {
        switch (error.code) {
          // 账号或者密码错误, 请跳转到登录页面并提示错误
          case 302:
            break
            // 重复登录, 已经在其它端登录了, 请跳转到登录页面并提示错误
          case 417:
            break
            // 被踢, 请提示错误后跳转到登录页面
          case 'kicked':
            break
          default:
            break
        }
      }
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

function onSessions (sessions) {
  state.sessionsList = state.nim.mergeSessions(state.sessionsList, sessions)
}
function onUpdateSession (sessions) {
  state.sessionsList = state.nim.mergeSessions(state.sessionsList, sessions)
}
