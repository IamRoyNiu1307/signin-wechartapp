// pages/bind/bind.js
const config = require('../../config')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

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

  accountSubmit:function(e){
    var json = e.detail.value
    json["openid"] = app.globalData.openid
    console.log(json)
    wx.request({
      url: config.bindUrl, 
      data: json,
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: "POST",
      success(res) {
        console.log(res.data)
        
        if(res.data.status==1){
          wx.showToast({
            title: '绑定成功！',
            icon: 'success',
            duration: 1500,
            mask: true

          })
          //延迟1.5秒返回上一页
          setTimeout(function () {
            app.globalData.studentInfo = res.data.studentInfo
            wx.navigateBack({
              detal: 1
            })
          }, 1500)
        }else{
          wx.showToast({
            title: res.data.msg+'！',
            icon: 'none',
            duration: 1500,
            mask: true

          })
        }
        
      }
    })
  }
})