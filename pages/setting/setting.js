// pages/feedback/feedback.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: null,
    mobile: null,
    title: null,
    content: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  webTap(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/web/web?id=' + id
    })
  },

  helpTap() {
    wx.navigateTo({
      url: '/pages/helpList/helpList'
    })
  },

  logout() {
    // wx.clearStorage();
    wx.removeStorageSync('uid')
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let shareObj = {
      title: "徐钢生活圈",
      path: '/pages/index/index'
    }
    return shareObj
  }
})