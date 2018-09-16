// components/praise/praise.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    likeCount: {
      type: String,
      value: ''
    },
    productId: {
      type: String,
      value: ''
    },
    block: {
      type: String,
      value: ''
    },
    isLike: {
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
    praiseTap() {
      let uid = wx.getStorageSync('uid');
      let likeCount = parseInt(this.data.likeCount);
      console.log(uid)
      if (uid == '') {
        wx.showToast({
          title: '请登录',
          icon: 'none',
          mask: true,
          duration: 1500
        })
      } else {
        let isLike = this.data.isLike;
        let uid = wx.getStorageSync('uid');
        let block = this.data.block;
        console.log(block)
        let id = this.data.productId;
        if (isLike == '0') {
          let params = {
            type: 'POST',
            url: 'OperationLike.aspx',
            data: {
              uid: uid,
              block: block,
              objectID: id,
              state: '1'
            },
            sCallback: (res) => {
              console.log(res)
              this.setData({
                isLike: '1',
                likeCount: likeCount + 1
              })
            }
          }
          app.request(params);
        } else {
          let params = {
            type: 'POST',
            url: 'OperationLike.aspx',
            data: {
              uid: uid,
              block: block,
              objectID: id,
              state: '0'
            },
            sCallback: (res) => {
              console.log(res)
              this.setData({
                isLike: '0',
                likeCount: likeCount - 1
              })
            }
          }
          app.request(params);
        }
        var myEventDetail = {} // detail对象，提供给事件监听函数
        var myEventOption = {} // 触发事件的选项
        this.triggerEvent('myevent', myEventDetail, myEventOption)
      }
    }
  }
})
