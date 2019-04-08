// pages/home/home.js
const config = require('../../config')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msgList:['','']
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
    
  }
})