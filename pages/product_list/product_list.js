// pages/product_list/product_list.js
const app = getApp();
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    key: '',
    positionId: ' '
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let uid = wx.getStorageSync('uid');
    this.setData({
      block: options.block,
      uid: uid
    })
    this.geKeytList()
    this.gePositionList()
    switch (options.block) {
      case '1':
        wx.setNavigationBarTitle({
          title: '招聘求职'
        })
        this.getJobList();
        break;
      case '2':
        wx.setNavigationBarTitle({
          title: '房屋租售'
        })
        this.getHouseList();
        break;
      case '3':
        wx.setNavigationBarTitle({
          title: '二手市场'
        })
        this.getCarList();
        break;
      case '4':
        wx.setNavigationBarTitle({
          title: '餐饮美食'
        })
        this.getCateList();
        break;
      case '6':
        wx.setNavigationBarTitle({
          title: '休闲娱乐'
        })
        this.getEntertainmentList();
        break;
      case '7':
        wx.setNavigationBarTitle({
          title: '生活服务'
        })
        this.getLifeServicesList();
        break;
    }
  },

  // 获取招聘求职列表
  getJobList () {
    wx.showLoading({
      title: '加载中',
    })
    let uid = this.data.uid;
    let positionId = this.data.positionId;
    let key = this.data.key;
    let page = this.data.page;
    let params = {
      type: 'POST',
      url: 'JobList.aspx',
      data: {
        'positionId': positionId,
        'uid': uid,
        'page': page,
        'key': key
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

  // 获取房屋租售列表
  getHouseList () {
    wx.showLoading({
      title: '加载中',
    })
    let uid = this.data.uid;
    let key = this.data.key;
    let page = this.data.page;
    let params = {
      type: 'POST',
      url: 'HouseList.aspx',
      data: {
        'uid': uid,
        'page': page,
        'key': key
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

  // 获取二手市场列表
  getCarList () {
    wx.showLoading({
      title: '加载中',
    })
    let uid = this.data.uid;
    let key = this.data.key;
    let page = this.data.page;
    let params = {
      type: 'POST',
      url: 'CarList.aspx',
      data: {
        'uid': uid,
        'page': page,
        'key': key
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

  // 获取餐饮美食列表
  getCateList () {
    wx.showLoading({
      title: '加载中',
    })
    let uid = this.data.uid;
    let key = this.data.key;
    let page = this.data.page;
    let params = {
      type: 'POST',
      url: 'CateList.aspx',
      data: {
        'uid': uid,
        'page': page,
        'key': key
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

  // 获取休闲娱乐列表
  getEntertainmentList () {
    wx.showLoading({
      title: '加载中',
    })
    let uid = this.data.uid;
    let key = this.data.key;
    let page = this.data.page;
    let params = {
      type: 'POST',
      url: 'EntertainmentList.aspx',
      data: {
        'uid': uid,
        'page': page,
        'key': key
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

  // 获取生活服务列表
  getLifeServicesList () {
    wx.showLoading({
      title: '加载中',
    })
    let uid = this.data.uid;
    let key = this.data.key;
    let page = this.data.page;
    let params = {
      type: 'POST',
      url: 'LifeServicesList.aspx',
      data: {
        'uid': uid,
        'page': page,
        'key': key
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

  // 获取key列表
  geKeytList () {
    let params = {
      type: 'POST',
      url: 'HotSearchKeyList.aspx',
      data: {},
      sCallback: (res) => {
        console.log(res)
        this.setData({
          keyList: res.data,
        })
        wx.hideLoading()
      }
    }
    app.request(params);
  },

  // 获取职位列表
  gePositionList () {
    let params = {
      type: 'POST',
      url: 'PositionList.aspx',
      data: {},
      sCallback: (res) => {
        console.log(res)
        this.setData({
          positionList: res.data,
        })
        wx.hideLoading()
      }
    }
    app.request(params);
  },

  // 搜索开始
  filterTap (e) {
    let key = e.detail.key;
    let block = this.data.block;
    this.setData({
      key: key
    })
    switch (block) {
      case '1':
        this.getJobList();
        break;
      case '2':
        this.getHouseList();
        break;
      case '3':
        this.getCarList();
        break;
      case '4':
        this.getCateList();
        break;
      case '6':
        this.getEntertainmentList();
        break;
      case '7':
        this.getLifeServicesList();
        break;
    }
  },

  // 职位关键词搜索开始
  PositionTap (e) {
    let key = this.data.key;
    let positionId = e.currentTarget.dataset.id;
    let block = this.data.block;
    this.setData({
      positionId: positionId,
      page: 1
    })
    switch (block) {
      case '1':
        this.getJobList();
        break;
      case '2':
        this.getHouseList();
        break;
      case '3':
        this.getCarList();
        break;
      case '4':
        this.getCateList();
        break;
      case '6':
        this.getEntertainmentList();
        break;
      case '7':
        this.getLifeServicesList();
        break;
    }
  },


  // 关键词搜索开始
  keyTap (e) {
    let key = e.currentTarget.dataset.key;
    let block = this.data.block;
    this.setData({
      key: key
    })
    switch (block) {
      case '1':
        this.getJobList();
        break;
      case '2':
        this.getHouseList();
        break;
      case '3':
        this.getCarList();
        break;
      case '4':
        this.getCateList();
        break;
      case '6':
        this.getEntertainmentList();
        break;
      case '7':
        this.getLifeServicesList();
        break;
    }
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let block = this.data.block;
    switch (block) {
      case '1':
        wx.showLoading({
          title: '加载中',
        })
        let uid = this.data.uid;
        let positionId = this.data.positionId;
        let key = this.data.key;
        let page = this.data.page + 1;
        let params = {
          type: 'POST',
          url: 'JobList.aspx',
          data: {
            'positionId': positionId,
            'uid': uid,
            'page': page,
            'key': key
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
        break;
      case '2':
        wx.showLoading({
          title: '加载中',
        })
        uid = this.data.uid;
        key = this.data.key;
        page = this.data.page + 1;
        params = {
          type: 'POST',
          url: 'HouseList.aspx',
          data: {
            'uid': uid,
            'page': page,
            'key': key
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
        break;
      case '3':
        wx.showLoading({
          title: '加载中',
        })
        uid = this.data.uid;
        key = this.data.key;
        page = this.data.page + 1;
        params = {
          type: 'POST',
          url: 'CarList.aspx',
          data: {
            'uid': uid,
            'page': page,
            'key': key
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
        break;
      case '4':
        wx.showLoading({
          title: '加载中',
        })
        uid = this.data.uid;
        key = this.data.key;
        page = this.data.page + 1;
        params = {
          type: 'POST',
          url: 'CateList.aspx',
          data: {
            'uid': uid,
            'page': page,
            'key': key
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
        break;
      case '6':
        wx.showLoading({
          title: '加载中',
        })
        uid = this.data.uid;
        key = this.data.key;
        page = this.data.page + 1;
        params = {
          type: 'POST',
          url: 'EntertainmentList.aspx',
          data: {
            'uid': uid,
            'page': page,
            'key': key
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
        break;
      case '7':
        wx.showLoading({
          title: '加载中',
        })
        uid = this.data.uid;
        key = this.data.key;
        page = this.data.page + 1;
        params = {
          type: 'POST',
          url: 'LifeServicesList.aspx',
          data: {
            'uid': uid,
            'page': page,
            'key': key
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
        break;
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})