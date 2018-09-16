// pages/web/web.js
const app = getApp();
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
    let src = options.src;
    console.log(src)
    this.setData({
      src: src
    })
  }
})