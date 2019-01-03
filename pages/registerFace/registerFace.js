// pages/registerFace/registerFace.js
const config = require('../../config')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  takePhoto:function(){
    
    console.log("takephoto")
    //拍摄
    this.data.context.takePhoto({
      quality: 'normal',
      success: (res) => {
        // this.setData({
        //   src: res.tempImagePath
        // })
        wx.uploadFile({
          url: config.registerFaceUrl,
          filePath: res.tempImagePath,
          name: 'file',
          formData: {
            'userid': app.globalData.studentInfo.userId
          },
          header: {
            'content-type': 'multipart/form-data'
          },
          success: function (res) {
            var data = res.data
            console.log(data)
            wx.showToast({
              title: '面部注册成功',
              icon: 'succes',
              duration: 1000,
              mask: true
              
            })
            setTimeout(function () {
              wx.navigateBack({
                delta:1
              })
            }, 1500)
            

            
            //do something
          }, fail: function (err) {
            console.log(err)
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("createContext")
    //创建相机上下文
    if (this.context == null) {
      this.setData({
        context: wx.createCameraContext()
      })
    }
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

  }
})