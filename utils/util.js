const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}

const endDate = (date,monthNum) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1+ monthNum
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//多张图片上传
function uploadimg(data) {
  var that = this,
    i = data.i ? data.i : 0,//当前上传的哪张图片
    success = data.success ? data.success : 0,//上传成功的个数
    fail = data.fail ? data.fail : 0;//上传失败的个数
  wx.uploadFile({
    url: data.url,
    filePath: data.path[i],
    name: 'file',//这里根据自己的实际情况改
    formData: {id:data.id},//这里是上传图片时一起上传的数据
    success: (resp) => {
      var json = JSON.parse(resp.data)
      if(json.status==1){
        success++;//图片上传成功，图片上传成功的变量+1
      }
    },
    fail: (res) => {
      fail++;//图片上传失败，图片上传失败的变量+1
    },
    complete: () => {
      i++;//这个图片执行完上传后，开始上传下一张
      if (i == data.path.length) {   //当图片传完时，停止调用     
        console.log('执行完毕');
        console.log('成功：' + success + " 失败：" + fail);
        if(fail==0){
          wx.showToast({
            title: '上传成功！',
            icon: 'success',
            duration: 2000,
            mask: true

          })
        }else{
          wx.showToast({
            title: fail+'张上传失败！',
            icon: 'none',
            duration: 2000,
            mask: true
          })
          return true;
        }
      } else {//若图片还没有传完，则继续调用函数
        console.log(i);
        data.i = i;
        data.success = success;
        data.fail = fail;
        that.uploadimg(data);
      }

    }
  });
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  endDate:endDate,
  uploadimg: uploadimg
}
