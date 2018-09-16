// pages/helpList/helpList.js
const app = getApp();
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
    let uid = wx.getStorageSync('uid');
    let page = this.data.page;
    let params = {
      type: 'POST',
      url: 'HelpList.aspx',
      data: {
        'uid': uid,
        'page': page
      },
      sCallback: (res) => {
        console.log(res)
        this.setData({
          list: res.data
        })
      }
    }
    console.log(params.data)
    app.request(params);
  },

  detailTap(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../dynamic_show/dynamic_show?id=' + id
    })
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