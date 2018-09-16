// components/tabbar/tabbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    path: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    homeTap () {
      wx.reLaunch({
        url: '/pages/index/index'
      })
    },
    personalTap () {
      wx.reLaunch({
        url: '/pages/personal/personal'
      })
    },
    releaseTap () {
      wx.reLaunch({
        url: '/pages/release/release'
      })
    },
  }
})
