// components/collection/collection.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isColletion: {
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
    collectionTap() {
      let uid = wx.getStorageSync('uid');
      console.log(uid)
      if (uid == '') {
        wx.showToast({
          title: '请登录',
          icon: 'none',
          mask: true,
          duration: 1500
        })
      } else {
        let isColletion = this.data.isColletion;
        let uid = wx.getStorageSync('uid');
        let block = this.data.block;
        console.log(block)
        let id = this.data.productId;
        if (isColletion == '0') {
          let params = {
            type: 'POST',
            url: 'OperationCollection.aspx',
            data: {
              uid: uid,
              block: block,
              objectID: id,
              state: '1',
            },
            sCallback: (res) => {
              console.log(res)
              this.setData({
                isColletion: '1'
              })
            }
          }
          app.request(params);
        } else {
          let params = {
            type: 'POST',
            url: 'OperationCollection.aspx',
            data: {
              uid: uid,
              block: block,
              objectID: id,
              state: '0',
            },
            sCallback: (res) => {
              console.log(res)
              this.setData({
                isColletion: '0'
              })
            }
          }
          app.request(params);
        }
        this.triggerEvent('myevent')
      }
    }
  }
})
