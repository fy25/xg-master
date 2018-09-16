//app.js
const util = require('utils/md5.js');
App({
  onLaunch: function () {
    wx.login({
      success: function (res) {
        console.log(res)
        if (res.code) {
          //发起网络请求
          wx.setStorageSync('code', res.code)
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },
  // 封装请求
  request(params) {
    let timestamp = Math.round(new Date());
    let key = '7e0ae0f85f4a';
    let url = 'https://api.xusteel.cn/Api/' + params.url;
    let header = null;
    var keyArr = Object.keys(params.data).sort();
    let newArr = [];
    for (let i = 0; i < keyArr.length; i++) {
      newArr.push(keyArr[i] + params.data[keyArr[i]])
    }
    let requestCheck = util.md5(newArr.join('') + timestamp + key);
    if (!params.type) {
      params.type = 'GET';
      header = {
        'content-type': 'application/json',
        'timestamp': timestamp,
        'requestCheck': requestCheck
      }
    } else {
      header = {
        'content-type': 'application/x-www-form-urlencoded',
        'timestamp': timestamp,
        'requestCheck': requestCheck
      }
    }
    wx.request({
      url: url,
      data: params.data,
      method: params.type,
      header: header,
      success: function (res) {
        params.sCallback && params.sCallback(res.data);
      }
    })
  },

  globalData: {
    key: '7e0ae0f85f4a',
    domain: 'https://api.xusteel.cn/Api/'
  }
})