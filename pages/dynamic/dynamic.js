// pages/dynamic/dynamic.js
const app = getApp();
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
  },

  // 获取列表
  getList() {
    wx.showLoading({
      title: '加载中',
    })
    let page = this.data.page;
    let params = {
      type: 'POST',
      url: 'NewsList.aspx',
      data: {
        'page': page
      },
      sCallback: (res) => {
        console.log(res)
        this.setData({
          newlist: res.data
        })
        wx.hideLoading()
      }
    }
    app.request(params);
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
    wx.showLoading({
      title: '加载中',
    })
    let page = this.data.page + 1;
    let params = {
      type: 'POST',
      url: 'NewsList.aspx',
      data: {
        'page': page
      },
      sCallback: (res) => {
        console.log(res)
        if (res.data.length == 0) {
          wx.showToast({
            title: '没有更多了',
            mask: true,
            icon: 'none',
            duration: 1500
          })
        } else {
          let newArr = this.data.productList.concat(res.data)
          this.setData({
            newlist: newArr,
            page: page
          })
        }
        wx.hideLoading()
      }
    }
    app.request(params);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})