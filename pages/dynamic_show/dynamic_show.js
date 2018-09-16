// pages/dynamic_show/dynamic_show.js
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
    console.log(options.id)
    this.setData({
      url: app.globalData.domain + 'news_detail.aspx?i=' + options.id
    })
    console.log(this.data.url)
  },

  // 获取动态详情
  getNewDetail() {
    let id = this.data.id;
    let url = this.data.domain + 'news_detail.aspx?i=' + id
  }
})