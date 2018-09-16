// pages/release/release.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recruitList: ['招聘', '求职'],
    sellList: ['出售', '出租', '求租', '求购'],
    secondList: ['出售', '求购'],
    hitchList: ['车找人', '人找车'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCurrentPageUrl();
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
  haveLogin() {
    let uid = wx.getStorageSync('uid');
    if (uid == '') {
      wx.navigateTo({
        url: '/pages/login/login'
      })
    } else {
      console.log("已经登录")
    }
  },
  // 选择招聘还是求职
  recruitTap() {
    let uid = wx.getStorageSync('uid');
    if (uid == '') {
      wx.navigateTo({
        url: '/pages/login/login'
      })
    } else {
      wx.showActionSheet({
        itemList: this.data.recruitList,
        itemColor: '#474747',
        success: function (res) {
          wx.navigateTo({
            url: '/pages/recruitRelease/recruitRelease?type=' + res.tapIndex
          })
        },
        fail: function (res) {
          console.log(res.errMsg)
        }
      })
    }
  },

  // 选择出售出租还是求租求购
  sellTap() {
    let uid = wx.getStorageSync('uid');
    if (uid == '') {
      wx.navigateTo({
        url: '/pages/login/login'
      })
    } else {
      wx.showActionSheet({
        itemList: this.data.sellList,
        itemColor: '#474747',
        success: function (res) {
          wx.navigateTo({
            url: '/pages/sellRelease/sellRelease?type=' + res.tapIndex
          })
        },
        fail: function (res) {
          console.log(res.errMsg)
        }
      })
    }
  },

  // 选择出售出租还是求租求购
  secondTap() {
    let uid = wx.getStorageSync('uid');
    if (uid == '') {
      wx.navigateTo({
        url: '/pages/login/login'
      })
    } else {
      wx.showActionSheet({
        itemList: this.data.secondList,
        itemColor: '#474747',
        success: function (res) {
          wx.navigateTo({
            url: '/pages/secondRelease/secondRelease?type=' + res.tapIndex
          })
        },
        fail: function (res) {
          console.log(res.errMsg)
        }
      })
    }
  },

  cateTap() {
    let uid = wx.getStorageSync('uid');
    if (uid == '') {
      wx.navigateTo({
        url: '/pages/login/login'
      })
    } else {
      wx.navigateTo({
        url: '/pages/cateRelease/cateRelease'
      })
    }
  },

  enterTap() {
    let uid = wx.getStorageSync('uid');
    if (uid == '') {
      wx.navigateTo({
        url: '/pages/login/login'
      })
    } else {
      wx.navigateTo({
        url: '/pages/enterRelease/enterRelease'
      })
    }
  },

  lifeTap() {
    let uid = wx.getStorageSync('uid');
    if (uid == '') {
      wx.navigateTo({
        url: '/pages/login/login'
      })
    } else {
      wx.navigateTo({
        url: '/pages/lifeRelease/lifeRelease'
      })
    }
  },

  hitchTap() {
    let uid = wx.getStorageSync('uid');
    if (uid == '') {
      wx.navigateTo({
        url: '/pages/login/login'
      })
    } else {
      wx.showActionSheet({
        itemList: this.data.hitchList,
        itemColor: '#474747',
        success: function (res) {
          wx.navigateTo({
            url: '/pages/hitchRelease/hitchRelease?type=' + res.tapIndex
          })
        },
        fail: function (res) {
          console.log(res.errMsg)
        }
      })
    }
  }
})