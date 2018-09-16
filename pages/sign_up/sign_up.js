// pages/sign_up/sign_up.js
const app = getApp()
const util = require('../../utils/md5.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: null,
    cant: false,
    nickname: null,
    headImg: null,
    number: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOpenId();
  },

  xzTap() {
    wx.navigateTo({
      url: '/pages/web/web?id=2'
    })
  },

  onGotUserInfo(e) {
    wx.setStorageSync('nickname', e.detail.userInfo.nickName)
    wx.setStorageSync('headImg', e.detail.userInfo.avatarUrl)
    this.setData({
      nickname: e.detail.userInfo.nickName,
      headImg: e.detail.userInfo.avatarUrl
    })
  },

  // 获取验证码
  getCode() {
    let mobile = this.data.mobile;
    if (mobile == null) {
      wx.showToast({
        title: '请输入手机号',
        mask: true,
        icon: 'none',
        duration: 1500
      })
    } else {
      let params = {
        type: 'POST',
        url: 'VerifyCode.aspx',
        data: {
          'mobile': mobile,
          'purpose': '1'
        },
        sCallback: (res) => {
          if (res.code == '200') {
            wx.showToast({
              title: res.message,
              mask: true,
              icon: 'success',
              duration: 1500
            })
            this.setData({
              cant: true
            })
          } else {
            wx.showToast({
              title: res.message,
              mask: true,
              icon: 'none',
              duration: 1500
            })

          }
        }
      }
      app.request(params);
    }
  },

  telTap(e) {
    this.setData({
      mobile: e.detail.value
    })
  },

  codeTap(e) {
    this.setData({
      code: e.detail.value
    })
  },

  pswTap(e) {
    this.setData({
      password: e.detail.value
    })
  },

  pswTapSec(e) {
    this.setData({
      passwordSec: e.detail.value
    })
  },

  numTap(e) {
    this.setData({
      number: e.detail.value
    })
  },

  // 获取openid
  getOpenId() {
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
  // 注册
  submitTap() {
    let mobile = this.data.mobile;
    let number = this.data.number;
    let code = this.data.code;
    let password = this.data.password;
    let passwordSec = this.data.passwordSec;
    let openID = this.data.openID;
    let nickname = wx.getStorageSync('nickname');
    let headImg = wx.getStorageSync('headImg');
    if (nickname == ' ' || headImg == ' ') {
      wx.showToast({
        title: '请授权微信获取您的头像信息',
        mask: true,
        icon: 'none',
        duration: 1500
      })
    } else {
      if (mobile == null || code == null || password == null) {
        wx.showToast({
          title: '请填写完整信息',
          mask: true,
          icon: 'none',
          duration: 1500
        })
      } else {
        if (password !== passwordSec) {
          wx.showToast({
            title: '两次密码输入不一致',
            mask: true,
            icon: 'none',
            duration: 1500
          })
        } else {
          password = util.md5(password + app.globalData.key)
          if (number != '') {
            let params = {
              type: 'POST',
              url: 'UserRegister.aspx',
              data: {
                'mobile': mobile,
                'openID': openID,
                'nickname': nickname,
                'headImg': headImg,
                'code': code,
                'password': password,
                'number': number
              },
              sCallback: (res) => {
                console.log(res)
                if (res.code == '200') {
                  wx.showToast({
                    title: res.message,
                    mask: true,
                    duration: 1500,
                    icon: 'success'
                  });
                  setTimeout(() => {
                    wx.navigateBack({
                      delta: 1
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
            app.request(params);
          } else {
            let params = {
              type: 'POST',
              url: 'UserRegister.aspx',
              data: {
                'mobile': mobile,
                'openID': openID,
                'nickname': nickname,
                'headImg': headImg,
                'code': code,
                'password': password
              },
              sCallback: (res) => {
                console.log(res)
                if (res.code == '200') {
                  wx.showToast({
                    title: res.message,
                    mask: true,
                    duration: 1500,
                    icon: 'success'
                  });
                  setTimeout(() => {
                    wx.navigateBack({
                      delta: 1
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
            app.request(params);
          }
        }
      }
    }
  }
})