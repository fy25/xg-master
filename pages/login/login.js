// pages/login/login.js
const app = getApp()
const util = require('../../utils/md5.js');
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
    this.getOpenId()
  },

  // 去哪里
  goWhere (e) {
    let path = e.currentTarget.dataset.path;
    wx.navigateTo({
      url: path
    })
  },

  telTap (e) {
    this.setData({
      mobile: e.detail.value
    })
  },

  pswTap (e) {
    this.setData({
      password: e.detail.value
    })
  },

  // 获取openid
  getOpenId () {
    wx.login({
      success: (res) => {
        if (res.code) {
          let code = res.code;
          let params = {
            type: 'POST',
            url: 'GetOpenID.aspx',
            data: {
              'code': code,
            },
            sCallback: (res) => {
              console.log(res)
              this.setData({
                openID: res.data
              })
            }
          }
          app.request(params);
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },

  onGotUserInfo (e) {
    console.log(e)
    wx.setStorageSync('nickname', e.detail.userInfo.nickName)
    wx.setStorageSync('headImg', e.detail.userInfo.avatarUrl)
    this.setData({
      nickname: e.detail.userInfo.nickName,
      headImg: e.detail.userInfo.avatarUrl
    })
  },

  // 登陆
  loginTap () {
    let mobile = this.data.mobile;
    let password = this.data.password;
    let openID = this.data.openID;
    let nickname = wx.getStorageSync('nickname');
    let headImg = wx.getStorageSync('headImg');
    if (!nickname || !headImg) {
      wx.showToast({
        title: '请先授权获取信息,再点击登录',
        mask: true,
        duration: 1500,
        icon: 'none'
      })
    } else {
      if (mobile == null || password == null) {
        wx.showToast({
          title: '请检查是否填写用户名或密码',
          mask: true,
          duration: 1500,
          icon: 'none'
        })
      } else {
        password = util.md5(password + app.globalData.key)
        let params = {
          type: 'POST',
          url: 'UserLogin.aspx',
          data: {
            'mobile': mobile,
            'openID': openID,
            'nickname': nickname,
            'headImg': headImg,
            'password': password
          },
          sCallback: (res) => {
            console.log(res)
            if (res.code == '200') {
              wx.showToast({
                title: '登录成功',
                mask: true,
                duration: 1500,
                icon: 'success',
                success: () => {
                  wx.setStorageSync('uid', res.data)
                }
              });
              setTimeout(() => {
                wx.reLaunch({
                  url: '/pages/personal/personal'
                })
              }, 1500)
            } else {
              wx.showToast({
                title: res.message,
                mask: true,
                duration: 1500,
                icon: 'none'
              });
            }
          }
        }
        console.log(params.data)
        app.request(params);
      }
    }
  }
})