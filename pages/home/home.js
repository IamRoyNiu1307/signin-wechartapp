// pages/home/home.js
const config = require('../../config')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msgList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    if(app.globalData.studentInfo==null){
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

            // 获取studentInfo
            if (app.globalData.studentInfo == null) {
              wx.request({
                url: config.getStudentInfoUrl,
                data: app.globalData.openid,
                header: {
                  'content-type': 'application/json' // 默认值
                },
                method: "POST",
                success(res) {
                  console.log(res.data)
                  if (res.data.studentInfo!=null){
                    app.globalData.studentInfo = res.data.studentInfo
                  }
                  if (res.data.courseList!=null){
                    app.globalData.courseList = res.data.courseList
                  }
                  app.globalData.has_registed = res.data.has_registed
                  //获取公告
                  wx.request({
                    url: config.getMsgListUrl + app.globalData.studentInfo.classId,
                    header: {
                      'content-type': 'application/json' // 默认值
                    },
                    method: "POST",
                    success(res) {
                      if(res.data.status==1){
                        that.setData({
                          msgList:res.data.msgList
                        })
                        console.log("msgList",res.data.msgList)
                      }
                    }
                  })
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
    }
    



    if (app.globalData.studentInfo != null) {
      
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  checkIn: function(){
    if (app.globalData.studentInfo==null){
      wx.showToast({
        title: '获取学生信息失败！请检查账号',
        icon: 'none',
        duration: 2000,
        mask: true

      })
    }else{
      wx.request({
        url: config.getCurrentCheckinUrl,
        data: app.globalData.studentInfo.studentId,
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: "POST",
        success(res) {
          console.log(res.data)
          if(res.data.msg=="success"){
            if (res.data.map.status=="未签到"){
              wx.navigateTo({
                url: '../faceCheckin/faceCheckin?checkinId=' + res.data.map.id,
                success: function (res) { },
                fail: function (res) { }
              })
            }else{
              wx.showToast({
                title: '已经签过到了哦~',
                icon: 'none',
                duration: 2000,
                mask: true

              })
            }
            
          } else if (res.data.msg == "null"){
            wx.showToast({
              title: '老师还没有开始考勤哦~',
              icon: 'none',
              duration: 2000,
              mask: true

            })
          }else{
            wx.showToast({
              title: '出错啦',
              icon: 'none',
              duration: 2000,
              mask: true

            })
          }
        }
      })
      wx.showToast({
        title: '正在加载···',
        icon: 'loading',
        duration: 20000,
        mask: true

      })
      
    }
    
  },

  todayLesson(){
    if(app.globalData.studentInfo!=null){
      wx.navigateTo({
        url: '/pages/lesson/lesson',
      })
    }
  },

  vacate(){
    if(app.globalData.studentInfo!=null){
      wx.navigateTo({
        url:'/pages/vacate/vacate',
      })
    }
  },

  msgInfo(e){
    var that = this
    var selectId=e.currentTarget.id
    wx.navigateTo({
      url: '/pages/message/message?msg=' + JSON.stringify(that.data.msgList[selectId]),
    })
  }
})