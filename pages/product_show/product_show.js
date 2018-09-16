// pages/product_show/product_show.js
const app = getApp();
const util = require('../../utils/util.js');
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
    this.getAd()
    let uid = wx.getStorageSync('uid');
    this.setData({
      uid: uid,
      id: options.id,
      block: options.block
    })
    switch (options.block) {
      case '1':
        console.log("招聘");
        this.getJobDetail()
        break;
      case '2':
        this.getHouseDetail()
        console.log("房屋租售");
        break;
      case '3':
        console.log("二手市场");
        this.getSecDetail()
        break;
      case '4':
        console.log("餐饮美食");
        this.getCateDetail()
        break;
      case '5':
        console.log("顺风拼车");
        this.getHitchDetail()
        break;
      case '6':
        console.log("休闲娱乐");
        this.getEnterDetail()
        break;
      case '7':
        console.log("生活服务");
        this.getLifeDetail()
        break;
    };
    this.getRecInfoList();
  },
  showTap(e) {
    let src = e.currentTarget.dataset.src;
    wx.navigateTo({
      url: '/pages/bannerWeb/bannerWeb?src=' + src
    })
  },

  // 获取为您推荐
  getRecInfoList() {
    let uid = this.data.uid;
    let block = this.data.block;
    let params = {
      type: 'POST',
      url: 'RecInfoList.aspx',
      data: {
        'block': block,
        'uid': uid
      },
      sCallback: (res) => {
        console.log(res)
        this.setData({
          recInfoList: res.data
        })
        wx.hideLoading()
      }
    }
    app.request(params);
  },

  // 获取招聘
  getJobDetail() {
    let id = this.data.id;
    let uid = this.data.uid;
    let params = {
      type: 'POST',
      url: 'JobDetail.aspx',
      data: {
        'id': id,
        'uid': uid
      },
      sCallback: (res) => {
        console.log(res)
        this.setData({
          item: res.data
        })
        wx.hideLoading()
      }
    }
    app.request(params);
  },

  // 获取租房
  getHouseDetail() {
    let id = this.data.id;
    let uid = this.data.uid;
    let params = {
      type: 'POST',
      url: 'HouseDetail.aspx',
      data: {
        'id': id,
        'uid': uid
      },
      sCallback: (res) => {
        console.log(res)
        this.setData({
          item: res.data
        })
        wx.hideLoading()
      }
    }
    app.request(params);
  },

  // 获取二手车
  getSecDetail() {
    let id = this.data.id;
    let uid = this.data.uid;
    let params = {
      type: 'POST',
      url: 'CarDetail.aspx',
      data: {
        'id': id,
        'uid': uid
      },
      sCallback: (res) => {
        console.log(res)
        this.setData({
          item: res.data
        })
        wx.hideLoading()
      }
    }
    app.request(params);
  },

  // 获取美食
  getCateDetail() {
    let id = this.data.id;
    let uid = this.data.uid;
    let params = {
      type: 'POST',
      url: 'CateDetail.aspx',
      data: {
        'id': id,
        'uid': uid
      },
      sCallback: (res) => {
        console.log(res)
        this.setData({
          item: res.data
        })
        wx.hideLoading()
      }
    }
    app.request(params);
  },

  // 获取顺风拼车
  getHitchDetail() {
    let id = this.data.id;
    let uid = this.data.uid;
    let params = {
      type: 'POST',
      url: 'HitchDetail.aspx',
      data: {
        'id': id,
        'uid': uid
      },
      sCallback: (res) => {
        console.log(res)
        this.setData({
          item: res.data
        })
        wx.hideLoading()
      }
    }
    app.request(params);
  },

  // 获取休闲娱乐
  getEnterDetail() {
    let id = this.data.id;
    let uid = this.data.uid;
    let params = {
      type: 'POST',
      url: 'EntertainmentDetail.aspx',
      data: {
        'id': id,
        'uid': uid
      },
      sCallback: (res) => {
        console.log(res)
        this.setData({
          item: res.data
        })
        wx.hideLoading()
      }
    }
    app.request(params);
  },

  // 获取生活服务
  getLifeDetail() {
    let id = this.data.id;
    let uid = this.data.uid;
    let params = {
      type: 'POST',
      url: 'LifeServicesDetail.aspx',
      data: {
        'id': id,
        'uid': uid
      },
      sCallback: (res) => {
        console.log(res)
        this.setData({
          item: res.data
        })
        wx.hideLoading()
      }
    }
    app.request(params);
  },

  // 获取广告
  getAd() {
    let params = {
      type: 'POST',
      url: 'DetailAdsenseList.aspx',
      data: {},
      sCallback: (res) => {
        console.log(res)
        this.setData({
          ad: res.data[0].imgUrl,
          src: res.data[0].linkUrl
        })
        wx.hideLoading()
      }
    }
    app.request(params);
  },

  goHome() {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },

  telTap(e) {
    let tel = e.currentTarget.dataset.tel;
    let uid = wx.getStorageSync('uid');
    if (uid == '') {
      wx.showToast({
        title: '请先登录',
        mask: true,
        icon: 'none',
        duration: 1500
      })
    } else {
      wx.makePhoneCall({
        phoneNumber: tel
      })
    }
  },

  goRelease() {
    wx.reLaunch({
      url: '/pages/release/release'
    })
  },

  onShareAppMessage: function () {
    let id = this.data.id;
    let block = this.data.block;
    let shareObj = {
      title: "徐钢生活圈",
      path: '../product_show/product_show?id=' + id + '&block=' + block
    }
    return shareObj
  }
})