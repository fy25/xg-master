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

  nameTap(e) {
    this.setData({
      name: e.detail.value
    })
  },

  mobileTap(e) {
    this.setData({
      mobile: e.detail.value
    })
  },

  titleTap(e) {
    this.setData({
      title: e.detail.value
    })
  },

  contentTap(e) {
    this.setData({
      content: e.detail.value
    })
  },

  // 提交
  submit() {
    let uid = wx.getStorageSync('uid');
    let name = this.data.name;
    let mobile = this.data.mobile;
    let title = this.data.title;
    let content = this.data.content;
    if (name == null || mobile == null || title == null || content == null) {
      wx.showToast({
        title: '请填写完整信息',
        mask: true,
        duration: 1500,
        icon: 'none'
      })
    } else {
      let params = {
        type: 'POST',
        url: 'Feedback.aspx',
        data: {
          'uid': uid,
          'name': name,
          'mobile': mobile,
          'title': title,
          'content': content
        },
        sCallback: (res) => {
          console.log(res)
          if (res.code == '200') {
            wx.showToast({
              title: res.message,
              mask: true,
              duration: 1500,
              icon: 'success'
            });
            setTimeout(() => {
              wx.navigateBack({
                delta: 1
              })
            }, 1500)
          } else {
            wx.showToast({
              title: res.message,
              mask: true,
              duration: 1500,
              icon: 'none'
            });
          }
        }
      }
      console.log(params.data)
      app.request(params);
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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