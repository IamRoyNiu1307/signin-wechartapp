//app.js
const config = require('config')
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        var that = this
        wx.request({
          url: config.openIdUrl,
          data: {
            code: res.code
          },
          success(res) {
            console.log('拉取openid成功', res)
            that.globalData.openid = res.data.openId
            
            // 获取studentInfo
            if (that.globalData.studentInfo == null) {
              wx.request({
                url: config.getStudentInfoUrl,
                data: that.globalData.openid,
                header: {
                  'content-type': 'application/json' // 默认值
                },
                method: "POST",
                success(res) {
                  console.log(res.data)
                  that.globalData.studentInfo = res.data.studentInfo
                  that.globalData.has_registed = res.data.has_registed
                }
              })
            } 
            // ++++++++++++++++++
          },  
          fail(res) {
            console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
            callback(res)
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    studentInfo:null,
    has_registed:null
  }
})