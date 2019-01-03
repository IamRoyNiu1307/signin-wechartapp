//index.js
//获取应用实例
const config = require('../../config')
const app = getApp()

Page({
  data: {
    context:null,
    userInfo: {},
    studentInfo:{},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //事件处理函数
  bindStuAccount: function () {
    if(this.data.studentInfo==null){
      wx.navigateTo({
        url: '../bind/bind'
      })
    }
  },
  searchTest:function(){
    wx.navigateTo({
      url: '../searchFace/searchFace',
    })
  },
  registerFace:function(){
    wx.navigateTo({
      url: '../registerFace/registerFace',
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    var that = this
    //获取绑定的校园网账号
    if(app.globalData.openid==null){
      // 登录
      wx.login({
        success: res => {
          wx.request({
            url: config.openIdUrl,
            data: {
              code: res.code
            },
            success(res) {
              console.log('拉取openid成功', res)
              app.globalData.openid = res.data.openId
              
            },
            fail(res) {
              console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
              callback(res)
            }
          })

        }
      })
    }
    
    
    wx.request({
      url: config.getStudentInfoUrl, 
      data: app.globalData.openid,
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: "POST",
      success(res) {
        console.log(res.data)
        app.globalData.studentInfo = res.data.studentInfo
        that.setData({
          studentInfo : res.data.studentInfo
        })
        
      }
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
