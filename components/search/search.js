// components/search/search.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    filter: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    array: ['招聘求职', '房屋租售', '二手市场', '餐饮美食', '顺风拼车', '休闲娱乐', '生活服务'],
    index: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    searchTap(e) {
      console.log(e.detail.value)
      let myEventDetail = {
        key: e.detail.value
      } // detail对象，提供给事件监听函数
      let myEventOption = {} // 触发事件的选项
      this.triggerEvent('myevent', myEventDetail, myEventOption)
    }
  }
})
