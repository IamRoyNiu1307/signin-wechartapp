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
          title: '正在上传···',
          icon: 'loading',
          duration: 20000,
          mask: true

        })
        wx.uploadFile({
          url: config.registerFaceUrl,
          filePath: res.tempImagePath,
          name: 'file',
          formData: {
            'studentid': app.globalData.studentInfo.studentId
          },
          header: {
            'content-type': 'multipart/form-data'
          },
          success: function (res) {
            var data = res.data
            var error_msg = JSON.parse(data)["error_msg"]
            console.log(error_msg)
            //判断是否注册成功
            if(error_msg!='面部已注册'){
              if(error_msg=='SUCCESS'){

                //获取页面栈
                var pages = getCurrentPages();
                if (pages.length > 1) {
                  //上一个页面实例对象
                  var prePage = pages[pages.length - 2];
                  //将myinfo的has_registed设为1，不能再进行注册
                  prePage.setData({
                    has_registed:1
                  })
                }
                
                wx.showToast({
                  title: '面部注册成功',
                  icon: 'succes',
                  duration: 1500,
                  mask: true
                })
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 1
                  })
                }, 1500)
              }else{
                wx.showToast({
                  title: error_msg,
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
              
            }else{
              wx.showToast({
                title: error_msg,
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