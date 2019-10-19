<template>
  <div class="home">
    <div>首页</div>
    <div class="message">{{messageNum}}</div>
    <div class="list">
      <div class="item" v-for="item in messsageList" :key="item.idClient">{{item.text}}111</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'test-component',
  data () {
    return {
      nim: null, // 网络请求状态
      sessionsList: [], // 会话列表,
      messsageList: []
    }
  },
  created () {
    this.initNimSDK()
  },
  methods: {
    initNimSDK () {
      var that = this
      window.min = this.nim = window.SDK.NIM.getInstance({
      // debug: true,
        appKey: '4b024821f348f78566c75dea9b0b285e',
        account: '1f7086e015e6eaad20cdc911ce025587',
        token: 'db2f198963e49a478cda900fbe2e5a6f',
        db: true, // 若不要开启数据库请设置false。SDK默认为true。
        // privateConf: {}, // 私有化部署方案所需的配置
        onconnect: onConnect,
        onwillreconnect: onWillReconnect,
        ondisconnect: onDisconnect,
        onerror: function () {
        },
        onsessions: this.onSessions,
        onupdatesession: this.onUpdateSession
      })
      function onConnect () {
        that.getMessage()
      }
      function onWillReconnect (obj) {
      // 此时说明 SDK 已经断开连接, 请开发者在界面上提示用户连接已断开, 而且正在重新建立连接
      }
      function onDisconnect (error) {
      // 此时说明 SDK 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面
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
    },
    onSessions (sessions) {
      this.sessionsList = this.nim.mergeSessions(this.sessionsList, sessions)
    },
    onUpdateSession (sessions) {
      this.sessionsList = this.nim.mergeSessions(this.sessionsList, sessions)
    },
    getMessage () {
      let that = this
      this.nim.getLocalMsgs({
        sessionId: 'p2p-test123',
        limit: 100,
        // eslint-disable-next-line
        done: (error, obj) => {
          that.messsageList = [].concat(obj.msgs)
        }
      })
    }
  },
  computed: {
    messageNum () {
      let unread = 0
      this.sessionsList.length ? unread = this.sessionsList[1].unread : unread = 0
      return unread
    }
  }
}
</script>

<style lang="scss" scoped>
.message{
  height: 20px;
  background: red;
  text-align: center;
  line-height: 20px;
  border-radius: 10px;
  color: #fff;
  max-width: 30px;
}
.home{
  position: relative;
}
</style>
