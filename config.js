const host = '4g4j8c.natappfree.cc'

const config = {

  // 下面的地址配合云端 Server 工作
  host,

  bindUrl: `http://${host}/bind`,

  registerFaceUrl: `http://${host}/registerFace`,

  searchFaceUrl: `http://${host}/searchFace`,

  getStudentInfoUrl: `http://${host}/getStudentInfo`,

  // 登录地址，用于建立会话
  loginUrl: `http://${host}/login`,

  // 测试的请求地址，用于测试会话
  requestUrl: `https://${host}/testRequest`,

  // 用code换取openId
  openIdUrl: `http://${host}/getopenid`,

  // 测试的信道服务接口
  tunnelUrl: `https://${host}/tunnel`,

  // 生成支付订单的接口
  paymentUrl: `https://${host}/payment`,

  // 发送模板消息接口
  templateMessageUrl: `https://${host}/templateMessage`,

  // 发送订阅消息接口
  subscribeMessageUrl: `https://${host}/subscribeMessage`,

  // 上传文件接口
  upLoadFileUrl: `https://${host}/upLoadFile`,

  // 下载示例图片接口
  downloadExampleUrl: `https://${host}/static/weapp.jpg`
}

module.exports = config