// components/share/share.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    block: {
      type: String,
      value: ''
    },
    pruduct_id: {
      type: String,
      value: ''
    },
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
    shareTap () {
      wx.showToast({
        title: '请点击页面右上角分享',
        mask: true,
        icon: 'none',
        duration: 1500
      })
    }
  }
})
