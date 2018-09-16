// components/dynamic/dynamic.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    newTit: {
      type: String,
      value: ''
    },
    newDate: {
      type: String,
      value: ''
    },
    newClick: {
      type: String,
      value: ''
    },
    newImg: {
      type: String,
      value: ''
    },
    dynamic_id: {
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
    detailTap (e) {
      let id = e.currentTarget.dataset.id;
      console.log(id)
      wx.navigateTo({
        url: '../dynamic_show/dynamic_show?id=' + id
      })
    }
  }
})
