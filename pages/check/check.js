// pages/check/check.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: [
      {
        text: '招聘求职',
        id: '0'
      },
      {
        text: '房屋租赁',
        id: '0'
      },
      {
        text: '二手市场',
        id: '0'
      },
      {
        text: '餐饮美食',
        id: '0'
      },
      {
        text: '顺风拼车',
        id: '0'
      },
      {
        text: '休闲娱乐',
        id: '0'
      },
      {
        text: '生活服务',
        id: '0'
      }
    ],
    _num: 0,
    page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowWidth: res.windowWidth
        })
      }
    });
    let uid = wx.getStorageSync('uid');
    let block = options.block;
    this.setData({
      uid: uid,
      block: block,
      _num: parseInt(block) - 1
    });
    this.getList();
  },

  detailTap(e) {
    let id = e.currentTarget.dataset.id;
    console.log(id)
    if (id == '') {
      console.log("没有id不跳转")
    } else {
      let block = e.currentTarget.dataset.block;
      console.log(block)
      console.log('有id跳转')
      wx.navigateTo({
        url: '../product_show/product_show?id=' + id + '&block=' + block
      })

    }
  },

  tabTap(e) {
    let _num = e.currentTarget.dataset.index;
    let singleWidth = this.data.windowWidth / 5;
    this.setData({
      _num: _num,
      scrollleft: (_num - 2) * singleWidth,
      block: (_num + 1).toString(),
      page: 1
    })
    this.getList()
  },

  deletTap(e) {
    let id = e.currentTarget.dataset.id;
    let block = this.data.block;
    let uid = this.data.uid;
    wx.showModal({
      title: '确定删除此条发布吗？',
      confirmColor: '#FF552E',
      success: (res) => {
        if (res.confirm) {
          console.log('用户点击确定')
          let params = {
            type: 'POST',
            url: 'DeleteBlock.aspx',
            data: {
              'uid': uid,
              'id': id,
              'block': block
            },
            sCallback: (res) => {
              console.log(res)
              this.getList()
            }
          }
          app.request(params);
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },

  // 获取列表
  getList() {
    let that = this;
    let block = this.data.block;
    let page = this.data.page;
    let url = null;
    switch (block) {
      case '1':
        url = 'MyJobList.aspx';
        that.getdata(url, page);
        break;
      case '2':
        url = 'MyHouseList.aspx';
        that.getdata(url, page);
        break;
      case '3':
        url = 'MySecondHandCarList.aspx';
        that.getdata(url, page);
        break;
      case '4':
        url = 'MyCateList.aspx';
        that.getdata(url, page);
        break;
      case '5':
        url = 'MyHitchList.aspx';
        that.getdata(url, page);
        break;
      case '6':
        url = 'MyEntertainmentList.aspx';
        that.getdata(url, page);
        break;
      case '7':
        url = 'MyLifeServicesList.aspx';
        that.getdata(url, page);
        break;
      case '8':
        url = 'MyJobList.aspx';
        that.getdata(url, page);
        break;
    };

  },

  getdata(url, page) {
    console.log("假爱")
    let uid = this.data.uid;
    let params = {
      type: 'POST',
      url: url,
      data: {
        'uid': uid,
        'page': page
      },
      sCallback: (res) => {
        console.log(res)
        this.setData({
          list: res.data
        })
        wx.hideLoading()
      }
    }
    app.request(params);
  },

  getdata2(url, page) {
    console.log("假爱")
    let uid = this.data.uid;
    let params = {
      type: 'POST',
      url: url,
      data: {
        'uid': uid,
        'page': page
      },
      sCallback: (res) => {
        console.log(res)
        if (res.data.length == 0) {
          wx.showToast({
            title: '没有更多了',
            mask: true,
            duration: 1500,
            icon: 'none'
          })
        } else {
          let newArr = this.data.list.concat(res.data)
          this.setData({
            list: newArr,
            page: page
          })
        }
        wx.hideLoading()
      }
    }
    app.request(params);
  },

  onReachBottom() {
    console.log("45")
    let that = this;
    let block = this.data.block;
    let page = this.data.page + 1;
    let url = null;
    switch (block) {
      case '1':
        url = 'MyJobList.aspx';
        that.getdata2(url, page);
        break;
      case '2':
        url = 'MyHouseList.aspx';
        that.getdata2(url, page);
        break;
      case '3':
        url = 'MySecondHandCarList.aspx';
        that.getdata2(url, page);
        break;
      case '4':
        url = 'MyCateList.aspx';
        that.getdata2(url, page);
        break;
      case '5':
        url = 'MyHitchList.aspx';
        that.getdata2(url, page);
        break;
      case '6':
        url = 'MyEntertainmentList.aspx';
        that.getdata2(url, page);
        break;
      case '7':
        url = 'MyLifeServicesList.aspx';
        that.getdata2(url, page);
        break;
      case '8':
        url = 'MyJobList.aspx';
        that.getdata2(url, page);
        break;
    };
  }
})