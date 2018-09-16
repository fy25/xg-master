// components/product/product.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    block: {
      type: String,
      value: ''
    },
    headImg: {
      type: String,
      value: ''
    },
    typeName: {
      type: String,
      value: ''
    },
    name: {
      type: String,
      value: ''
    },
    date: {
      type: String,
      value: ''
    },
    itemList: {
      type: Array,
      value: ''
    },
    describe: {
      type: String,
      value: ''
    },
    mobile: {
      type: String,
      value: ''
    },
    imageList: {
      type: Array,
      value: ''
    },
    stickState: {
      type: String,
      value: ''
    },
    clickRate: {
      type: String,
      value: ''
    },
    salaryName: {
      type: String,
      value: ''
    },
    positionName: {
      type: String,
      value: ''
    },
    product_id: {
      type: String,
      value: ''
    },
    likeCount: {
      type: String,
      value: ''
    },
    isColletion: {
      type: String,
      value: ''
    },
    isLike: {
      type: String,
      value: ''
    },
    mobile: {
      type: String,
      value: ''
    },
    navigate: {
      type: String,
      value: ''
    },
    acreage: {
      type: String,
      value: ''
    },
    bedroomCount: {
      type: String,
      value: ''
    },
    parlourCount: {
      type: String,
      value: ''
    },
    toiletCount: {
      type: String,
      value: ''
    },
    location: {
      type: String,
      value: ''
    },
    departurePlace: {
      type: String,
      value: ''
    },
    destination: {
      type: String,
      value: ''
    },
    rideTime: {
      type: String,
      value: ''
    },
    rideCount: {
      type: String,
      value: ''
    },
    houseDecorationTypeName: {
      type: String,
      value: ''
    },
    sellPrice: {
      type: String,
      value: ''
    },
    authenticationState: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    // 查看详情
    detailTap(e) {
      let navigate = this.data.navigate;
      let id = e.currentTarget.dataset.id;
      if (navigate == '1') {
        console.log("没有id不跳转")
      } else {
        let block = e.currentTarget.dataset.block;
        wx.navigateTo({
          url: '../product_show/product_show?id=' + id + '&block=' + block
        })

      }
    },
    // 预览图片
    imgTap(e) {
      let imageList = this.data.imageList;
      let index = e.currentTarget.dataset.index;
      console.log(imageList[index])
      wx.previewImage({
        current: imageList[index],
        urls: imageList
      })
    },

    // 拨打电话
    telTap(e) {
      let tel = e.currentTarget.dataset.tel;
      wx.makePhoneCall({
        phoneNumber: tel
      })
    },

    tt() {
      this.triggerEvent('jj')
    }

  }
})
