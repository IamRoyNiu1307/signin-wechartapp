// pages/vacate/vacate.js
const sourceType = [['camera'], ['album'], ['camera', 'album']]
const sizeType = [['compressed'], ['original'], ['compressed', 'original']]
const util = require('../../utils/util.js')
const config = require('../../config')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    start:'',
    end:'',
    date: '',
    reason:[
      { value: 1, name: '病假' },
      { value: 2, name: '事假' },
    ],
    selectReason: { value: 2, name: '事假' },
    selectCourse:0,
    courseList:[],
    courseNames:[],
    detail:"",
    //图片相关
    imageList: [],
    sourceTypeIndex: 2,
    sourceType: ['拍照', '相册', '拍照或相册'],

    sizeTypeIndex: 2,
    sizeType: ['压缩', '原图', '压缩或原图'],

    countIndex: 8,
    count: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var date = new Date()
    //设定请假日期的范围（月）
    var monthNum = 1
    var formatDate = util.formatDate(date)
    var courseNames = []
    for(var index in app.globalData.courseList){
      courseNames.push(app.globalData.courseList[index].courseName)
    }
    
    this.setData({
      start: formatDate,
      end:util.endDate(date,monthNum),
      date: formatDate,
      courseList:app.globalData.courseList,
      courseNames:courseNames
    })
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
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindCourseChange(e){
    var selectIndex = e.detail.value
    this.setData({
      selectCourse: selectIndex
    })
  },
  sourceTypeChange(e) {
    this.setData({
      sourceTypeIndex: e.detail.value
    })
  },
  sizeTypeChange(e) {
    this.setData({
      sizeTypeIndex: e.detail.value
    })
  },
  countChange(e) {
    this.setData({
      countIndex: e.detail.value
    })
  },
  chooseImage() {
    const that = this
    wx.chooseImage({
      sourceType: sourceType[this.data.sourceTypeIndex],
      sizeType: sizeType[this.data.sizeTypeIndex],
      count: this.data.count[this.data.countIndex],
      success(res) {
        console.log(res)
        that.setData({
          imageList: res.tempFilePaths
        })
      }
    })
  },
  previewImage(e) {
    const current = e.target.dataset.src
    wx.previewImage({
      current,
      urls: this.data.imageList
    })
  },
  radioChange(e){
    var that = this
    var selectReason = e.detail.value
    var reason = this.data.reason
    for(var i = 0;i<reason.length;i++){
      if(reason[i].value==selectReason){
        that.setData({
          selectReason:reason[i]
        })
      }
    }
  },
  bindTextAreaInput(e){
    var detail = e.detail.value
    this.setData({
      detail:detail
    })
  },
  formSubmit(){
    var data = this.data
    var imageList = data.imageList
    var course = data.courseList[data.selectCourse]
    var date = data.date
    var reason = data.selectReason
    var detail = data.detail
    var id = Date.parse(new Date())/1000;
    wx.request({
      url: config.submitLeaveApplicationUrl,
      data: {
        id: id,
        course: data.courseList[data.selectCourse].id,
        date: data.date,
        reason: data.selectReason.name,
        detail: data.detail,
        studentId: app.globalData.studentInfo.studentId
      },
      success(res) {
        if(res.data.status==1&&imageList.length>0){
          util.uploadimg({
            url: config.submitLeaveApplicationUrl,
            path: imageList,
            id: id,
            success:0,
            fail:0
          })
          //延迟2秒返回上一页
          setTimeout(function () {
            wx.navigateBack({
              detal: 1
            })
          }, 2000)
        }
      }
    })

    
  }
})