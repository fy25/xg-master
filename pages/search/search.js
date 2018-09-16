// pages/search/search.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['招聘求职', '房屋租售', '二手市场', '餐饮美食', '顺风拼车', '休闲娱乐', '生活服务'],
    index: 0,
    block: '1',
    page: 1,
    key: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let key = options.key;
    if (key == '') {
      wx.setNavigationBarTitle({
        title: '搜索'
      })
    } else {
      wx.setNavigationBarTitle({
        title: key
      })
    }
    this.getList()
    let uid = wx.getStorageSync('uid');
    this.setData({
      uid: uid,
      key: key
    })
    this.getSearchList()
  },


  // 获取列表
  getList() {
    let params = {
      type: 'POST',
      url: 'HotSearchKeyList.aspx',
      data: {},
      sCallback: (res) => {
        console.log(res)
        this.setData({
          keyList: res.data
        })
        wx.hideLoading()
      }
    }
    app.request(params);
  },

  getSearchList() {
    wx.showLoading({
      title: '加载中',
    })
    let key = this.data.key;
    let uid = this.data.uid;
    let page = this.data.page;
    let params = {
      type: 'POST',
      url: 'SearchList.aspx',
      data: {
        uid: uid,
        key: key,
        page: page
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

  keyTap(e) {
    wx.showLoading({
      title: '加载中',
    })
    let key = e.currentTarget.dataset.key;
    let uid = this.data.uid;
    let page = '1';
    if (key == '') {
      wx.setNavigationBarTitle({
        title: '搜索'
      })
    } else {
      wx.setNavigationBarTitle({
        title: key
      })
    }
    let params = {
      type: 'POST',
      url: 'SearchList.aspx',
      data: {
        uid: uid,
        key: key,
        page: page
      },
      sCallback: (res) => {
        console.log(res)
        this.setData({
          productList: res.data,
          key: key
        })
        wx.hideLoading()
      }
    }
    app.request(params);
  },

  // 搜索开始
  filterTap(e) {
    wx.showLoading({
      title: '加载中',
    })
    let key = e.detail.value;
    if (key == '') {
      wx.setNavigationBarTitle({
        title: '搜索'
      })
    } else {
      wx.setNavigationBarTitle({
        title: key
      })
    }
    let uid = this.data.uid;
    let params = {
      type: 'POST',
      url: 'SearchList.aspx',
      data: {
        uid: uid,
        key: key,
        page: '1'
      },
      sCallback: (res) => {
        console.log(res)
        this.setData({
          productList: res.data,
          key: key
        })
        wx.hideLoading()
      }
    }
    app.request(params);
  },


  onReachBottom() {
    wx.showLoading({
      title: '加载中',
    })
    let page = this.data.page + 1;
    let key = this.data.key;
    let uid = this.data.uid;
    let params = {
      type: 'POST',
      url: 'SearchList.aspx',
      data: {
        uid: uid,
        key: key,
        page: page
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
          let newList = this.data.productList.concat(res.data)
          this.setData({
            productList: newList,
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