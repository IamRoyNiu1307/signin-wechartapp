
const config = require('../../config')
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    checkinId:null
  },
  takePhoto: function () {
    var that = this
    console.log("takephoto")
    //拍摄
    this.data.context.takePhoto({
      quality: 'normal',
      success: (res) => {
        // this.setData({
        //   src: res.tempImagePath
        // })
        this.setData({
          imgsrc: res.tempImagePath
        })
        wx.showToast({
          title: '正在识别···',
          icon: 'loading',
          duration: 20000,
          mask: true

        })
        //将照片上传
        wx.uploadFile({
          url: config.searchFaceUrl,
          filePath: res.tempImagePath,
          name: 'file',
          formData: {
            'studentid': app.globalData.studentInfo.studentId,
            'checkinId':this.data.checkinId
          },
          header: {
            'content-type': 'multipart/form-data'
          },
          success: function (res) {

            var data = res.data
            var status = JSON.parse(data)["status"]
            var msg = JSON.parse(data)["msg"]
            var studentName = JSON.parse(data)["student_name"]

            console.log(data)
            if (status == 1) {
              wx.showToast({
                title: '成功:' + studentName,
                icon: 'succes',
                duration: 1500,
                mask: true

              })
              //延迟1.5秒返回上一页
              setTimeout(function () {
                wx.navigateBack({
                  delta: 1
                })
              }, 1500)
            } else if (status == 0) {
              wx.showToast({
                title: '失败:' + msg,
                icon: 'none',
                duration: 1500,
                mask: true

              })
              //延迟1.5秒返回上一页
              setTimeout(function () {
                that.setData({
                  imgsrc: null
                })
              }, 1500)
            }

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
    console.log(options)
    this.setData({
      checkinId: options.checkinId
    })
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