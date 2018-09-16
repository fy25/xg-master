// pages/product_list/product_list.js
const app = getApp();
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    tabList: [
      {
        text: '招聘求职',
        id: '0'
      },
      {
        text: '房屋租赁',
        id: '0'
      },
      {
        text: '二手市场',
        id: '0'
      },
      {
        text: '餐饮美食',
        id: '0'
      },
      {
        text: '顺风拼车',
        id: '0'
      },
      {
        text: '休闲娱乐',
        id: '0'
      },
      {
        text: '生活服务',
        id: '0'
      }
    ],
    _num: 0,
    block: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowWidth: res.windowWidth
        })
      }
    });
    let uid = wx.getStorageSync('uid');
    this.setData({
      uid: uid
    })
    this.getList()
  },

  tabTap(e) {
    let _num = e.currentTarget.dataset.index;
    let singleWidth = this.data.windowWidth / 5;
    this.setData({
      _num: _num,
      scrollleft: (_num - 2) * singleWidth,
      block: _num + 1,
      page: 1
    })
    this.getList()
  },

  // 获取招聘求职列表
  getList() {
    wx.showLoading({
      title: '加载中',
    })
    let uid = this.data.uid;
    let block = this.data._num + 1;
    let page = this.data.page;
    let params = {
      type: 'POST',
      url: 'MyCollectionList.aspx',
      data: {
        'uid': uid,
        'block': block,
        'page': page
      },
      sCallback: (res) => {
        console.log(res)
        this.setData({
          productList: res.data
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
    let uid = this.data.uid;
    let block = this.data._num + 1;
    let page = this.data.page + 1;
    let params = {
      type: 'POST',
      url: 'MyCollectionList.aspx',
      data: {
        'uid': uid,
        'block': block,
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
            productList: newArr,
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