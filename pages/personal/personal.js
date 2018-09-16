// pages/personal/personal.js
const app = getApp()
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: [
      {
        text: '招聘求职',
        img: '/images/picon1.png',
        path: '/pages/check/check?block=1'
      },
      {
        text: '房屋租赁',
        img: '/images/picon2.png',
        path: '/pages/check/check?block=2'
      },
      {
        text: '二手市场',
        img: '/images/picon3.png',
        path: '/pages/check/check?block=3'
      },
      {
        text: '餐饮美食',
        img: '/images/picon4.png',
        path: '/pages/check/check?block=4'
      },
      {
        text: '顺风拼车',
        img: '/images/picon5.png',
        path: '/pages/check/check?block=5'
      },
      {
        text: '休闲娱乐',
        img: '/images/picon6.png',
        path: '/pages/check/check?block=6'
      },
      {
        text: '生活服务',
        img: '/images/picon7.png',
        path: '/pages/check/check?block=7'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      uid: wx.getStorageSync('uid')
    });
    this.getUserInfo()
    this.haveLogin()
    this.getCurrentPageUrl();
  },

  // 获取页面路径
  getCurrentPageUrl() {
    var pages = getCurrentPages()    //获取加载的页面
    var currentPage = pages[pages.length - 1]    //获取当前页面的对象
    var url = currentPage.route    //当前页面url
    console.log(url)
    this.setData({
      path: url
    })
    return url
  },
  haveLogin() {
    let uid = wx.getStorageSync('uid');
    if (uid == '') {
      this.setData({
        haveLogin: false
      })
    } else {
      this.setData({
        haveLogin: true
      })
    }
  },
  // 获取会员信息
  getUserInfo() {
    let uid = wx.getStorageSync('uid');
    if (uid != '') {
      let uid = this.data.uid;
      let params = {
        type: 'POST',
        url: 'UserMain.aspx',
        data: {
          'uid': uid
        },
        sCallback: (res) => {
          console.log(res)
          this.setData({
            mobile: res.data.mobile,
            servicePhone: res.data.servicePhone,
            nickname: res.data.nickname,
            headImg: res.data.headImg,
            authenticationState: res.data.authenticationState
          });
          // wx.setStorageSync('authenticationState', res.data.authenticationState)
        }
      }
      console.log(params.data)
      app.request(params);
    }
  },
  gowhere(e) {
    let uid = wx.getStorageSync('uid');
    if (uid == '') {
      wx.navigateTo({
        url: '/pages/login/login'
      })
    } else {
      let path = e.currentTarget.dataset.path
      wx.navigateTo({
        url: path
      })
    }
  },

  telTap(e) {
    let tel = e.currentTarget.dataset.tel;
    wx.makePhoneCall({
      phoneNumber: tel,
      success: function (res) {
        // success
      }
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
    this.onLoad()
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