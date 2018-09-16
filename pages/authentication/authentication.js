// pages/forget/forget.js
const app = getApp()
const util = require('../../utils/md5.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number: null,
    trueName: null,
    department: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo()
  },
  nameTap(e) {
    this.setData({
      trueName: e.detail.value
    })
  },

  numberTap(e) {
    this.setData({
      number: e.detail.value
    })
  },

  departmentTap(e) {
    this.setData({
      department: e.detail.value
    })
  },

  // 获取会员信息
  getUserInfo() {
    let uid = wx.getStorageSync('uid');
    if (uid != '') {
      let params = {
        type: 'POST',
        url: 'UserMain.aspx',
        data: {
          'uid': uid
        },
        sCallback: (res) => {
          console.log(res)
          this.setData({
            authenticationState: res.data.authenticationState,
            trueName: res.data.trueName,
            department: res.data.department,
            number: res.data.number
          })
        }
      }
      console.log(params.data)
      app.request(params);
    }
  },


  commitTap() {
    let uid = wx.getStorageSync('uid');
    let number = this.data.number;
    let trueName = this.data.trueName;
    let department = this.data.department;
    if (number == null || trueName == null || department == null) {
      wx.showToast({
        title: '请填写完整信息',
        mask: true,
        icon: 'none',
        duration: 1500
      })
    } else {
      let params = {
        type: 'POST',
        url: 'AuthenticationNumber.aspx',
        data: {
          'uid': uid,
          'number': number,
          'trueName': trueName,
          'department': department
        },
        sCallback: (res) => {
          console.log(res)
          if (res.code == '200') {
            wx.showToast({
              title: '请耐心等待审核',
              mask: true,
              duration: 1500,
              icon: 'none'
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
})