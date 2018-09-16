import { Base } from '../../utils/base.js';
const app = getApp();
const util = require('../../utils/util.js');

Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 1500,
    duration: 500,
    indicatorActiveColor: '#FF552E',
    tabList: [
      {
        text: '徐钢动态',
        icon: '/images/icon1.png',
        id: '1',
        path: '../dynamic/dynamic'
      },
      {
        text: '招聘求职',
        icon: '/images/icon2.png',
        id: '1',
        path: '../product_list/product_list?block=1'
      },
      {
        text: '房屋租售',
        icon: '/images/icon3.png',
        id: '1',
        path: '../product_list/product_list?block=2'
      },
      {
        text: '二手市场',
        icon: '/images/icon4.png',
        id: '1',
        path: '../product_list/product_list?block=3'
      },
      {
        text: '餐饮美食',
        icon: '/images/icon5.png',
        id: '1',
        path: '../product_list/product_list?block=4'
      },
      {
        text: '顺风拼车',
        icon: '/images/icon6.png',
        id: '1',
        path: '../carpool/carpool'
      },
      {
        text: '休闲娱乐',
        icon: '/images/icon7.png',
        id: '1',
        path: '../product_list/product_list?block=6'
      },
      {
        text: '生活服务 ',
        icon: '/images/icon8.png',
        id: '1',
        path: '../product_list/product_list?block=7'
      }
    ],
    block: '1',
    sortType: '0',
    blockarray: ['招聘求职', '房屋租售', '二手市场', '餐饮美食', '顺风拼车', '休闲娱乐', '生活服务'],
    blockindex: 0,
    typearray: ['默认', '热门', '最新'],
    typeindex: 0
  },
  onLoad: function () {
    this.getIndexInfo()
    this.getBlockList()
    this.getCurrentPageUrl();
    let authenticationState = wx.getStorageSync('authenticationState');
    this.setData({
      authenticationState: authenticationState
    })
  },

  // 搜索
  searchTap(e) {
    let key = e.detail.value;
    wx.navigateTo({
      url: '../search/search?key=' + key
    })
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
  // 首页信息
  getIndexInfo() {
    let params = {
      type: 'POST',
      url: 'Home.aspx',
      data: {},
      sCallback: (res) => {
        this.setData({
          topAdsense: res.data.topAdsense,
          middleAdsense: res.data.middleAdsense,
          newlist: res.data.news,
        })
      }
    }
    app.request(params);
  },

  // 获取分类列表
  getBlockList() {
    wx.showLoading({
      title: '加载中',
    })
    let uid = wx.getStorageSync('uid');
    let block = this.data.block;
    let sortType = this.data.sortType;
    let params = {
      type: 'POST',
      url: 'HomeBlockList.aspx',
      data: {
        'block': block,
        'sortType': sortType,
        'uid': uid
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

  // 切换分类
  blockChange(e) {
    console.log(parseInt(e.detail.value) + 1)
    this.setData({
      blockindex: e.detail.value,
      block: parseInt(e.detail.value) + 1
    });
    this.getBlockList();
  },

  // 排序切换
  typeChange(e) {
    console.log(parseInt(e.detail.value) + 1)
    this.setData({
      typeindex: e.detail.value,
      sortType: e.detail.value
    });
    this.getBlockList();
  },
  goWhere(e) {
    let path = e.currentTarget.dataset.path;
    console.log(path)
    wx.navigateTo({
      url: path
    })
  },

  bannerTap(e) {
    let src = e.currentTarget.dataset.src;
    console.log(src)
    wx.navigateTo({
      url: '/pages/bannerWeb/bannerWeb?src=' + src
    })
  },

  onPullDownRefresh() {
    this.getIndexInfo()
    this.getBlockList()
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1500)
  },

  onShareAppMessage() {
    let shareObj = {
      title: "徐钢生活圈",
      path: '/pages/index/index'
    }
    return shareObj
  }
})
