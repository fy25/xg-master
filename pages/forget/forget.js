// pages/forget/forget.js
const app = getApp()
const util = require('../../utils/md5.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: null,
    cant: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  telTap(e) {
    console.log(e.detail.value)
    this.setData({
      mobile: e.detail.value
    })
  },

  codeTap(e) {
    console.log(e.detail.value)
    this.setData({
      code: e.detail.value
    })
  },

  pswTap(e) {
    console.log(e.detail.value)
    this.setData({
      password: e.detail.value
    })
  },

  pswTapSec(e) {
    console.log(e.detail.value)
    this.setData({
      passwordSec: e.detail.value
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
          'purpose': '2'
        },
        sCallback: (res) => {
          console.log(res)
          if (res.code == '200') {
            wx.showToast({
              title: '获取成功',
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

  // 找回密码
  findTap() {
    let mobile = this.data.mobile;
    let code = this.data.code;
    let password = this.data.password;
    let passwordSec = this.data.passwordSec;
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
        let params = {
          type: 'POST',
          url: 'ForgetPwd.aspx',
          data: {
            'mobile': mobile,
            'code': code,
            'password': password
          },
          sCallback: (res) => {
            console.log(res)
            if (res.code == '200') {
              wx.showToast({
                title: '重设密码成功',
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
        console.log(params.data)
        app.request(params);
      }
    }
  }
})