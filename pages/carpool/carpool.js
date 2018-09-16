// pages/carpool/carpool.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部',
    date: '出行时间',
    type: '1',
    departurePlace: '',
    destination: '',
    rideTime: '',
    rideCount: '',
    key: '',
    page: 1,
    tabList: [
      {
        text: '车找人',
        type: '1'
      },
      {
        text: '人找车',
        type: '2'
      },
    ],
    _num: 0,
    departurePlace: '',
    destination: '',
    chu: false,
    mu: false,
    block: 5
  },


  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      rideTime: e.detail.value,
      date: e.detail.value
    })
    this.getList();
  },
  // 获取出发地
  departureTap () {
    wx.chooseLocation({
      success: (res) => {
        console.log(res)
        if (!res.address) {
          wx.showToast({
            title: '请选择具体位置信息',
            icon: 'none',
            mask: true,
            duration: 1500
          })
        } else {
          this.setData({
            chu: true,
            departurePlace: res.address,
            departurePlaceLng: res.longitude,
            departurePlaceLat: res.latitude
          })
        }
      }
    })
  },

  // 获取目的地
  destinationTap () {
    wx.chooseLocation({
      success: (res) => {
        console.log(res)
        if (!res.address) {
          wx.showToast({
            title: '请选择具体位置信息',
            icon: 'none',
            mask: true,
            duration: 1500
          })
        } else {
          this.setData({
            mu: true,
            destination: res.address,
            destinationLng: res.longitude,
            destinationLat: res.latitude
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let uid = wx.getStorageSync('uid');
    this.setData({
      uid: uid
    })
    this.getList()
  },

  // 获取列表
  getList () {
    wx.showLoading({
      title: '加载中',
    })
    let uid = this.data.uid;
    let type = this.data.type;
    let departurePlace = this.data.departurePlace;
    let destination = this.data.destination;
    let rideTime = this.data.rideTime;
    let rideCount = this.data.rideCount;
    let key = this.data.key;
    let page = this.data.page;
    let params = {
      type: 'POST',
      url: 'HitchList.aspx',
      data: {
        'uid': uid,
        'type': type,
        'departurePlace': departurePlace,
        'destination': destination,
        'rideTime': rideTime,
        'rideCount': rideCount,
        'page': page,
        'key': key
      },
      sCallback: (res) => {
        console.log(res)
        this.setData({
          productList: res.data
        })
        wx.hideLoading()
      }
    }
    app.request(params);
  },

  // 切换
  tabTap (e) {
    let _num = e.currentTarget.dataset.index;
    console.log(_num)
    this.setData({
      _num: _num,
      type: _num + 1
    })
    this.getList();
  },

  // 搜索
  searchTap () {
    this.getList()
  },
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