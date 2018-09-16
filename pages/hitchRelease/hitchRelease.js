// pages/release_main/release_main.js
const app = getApp();
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths: [],
    len: 0,
    imageList: [],
    describe: null,
    name: null,
    mobile: null,
    hitchItemId: '',
    departurePlace: ' ',
    departurePlaceLng: null,
    departurePlaceLat: null,
    destination: ' ',
    destinationLng: null,
    destinationLat: null,
    stringImageList: '',
    read: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let uid = wx.getStorageSync('uid');
    let type = options.type;
    this.setData({
      uid: uid,
      type: type
    })
    this.getLuminousList()
  },

  readTap() {
    if (this.data.read == false) {
      this.setData({
        read: true
      })
    } else {
      this.setData({
        read: false
      })
    }
  },

  xzTap() {
    wx.navigateTo({
      url: '/pages/web/web?id=2'
    })
  },

  // 获取出发地
  departureTap() {
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
            departurePlace: res.address,
            departurePlaceLng: res.longitude,
            departurePlaceLat: res.latitude
          })
        }
      }
    })
  },

  // 获取目的地
  destinationTap() {
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
            destination: res.address,
            destinationLng: res.longitude,
            destinationLat: res.latitude
          })
        }
      }
    })
  },

  // 选取日期
  dateChange(e) {
    this.setData({
      rideTimeF: e.detail.value
    })
  },

  // 选取时间
  timeChange(e) {
    this.setData({
      rideTimeS: e.detail.value
    })
  },



  // 获取附加列表
  getLuminousList() {
    let type = this.data.type + 1;
    let params = {
      type: 'POST',
      url: 'HitchItemList.aspx',
      data: {
        type: type
      },
      sCallback: (res) => {
        console.log(res)
        this.setData({
          luminousItemList: res.data
        })
      }
    }
    app.request(params);
  },

  // 选择附加
  luminousChange(e) {
    let hitchItemId = e.detail.value.join(',');
    this.setData({
      hitchItemId: hitchItemId
    })
  },

  // 姓名
  nameTap(e) {
    this.setData({
      name: e.detail.value
    })
  },

  // 电话
  telTap(e) {
    this.setData({
      mobile: e.detail.value
    })
  },

  // 人数
  countTap(e) {
    this.setData({
      rideCount: e.detail.value
    })
  },

  // 描述
  describeTap(e) {
    console.log(e.detail.value)
    this.setData({
      describe: e.detail.value
    })
  },


  // 上传照片按钮
  imgTap() {
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#f7982a",
      success: (res) => {
        if (res.tapIndex == 0) {
          this.chooseImg('album')
        } else {
          this.chooseImg('camera')
        }
      },
      fail: function (res) {
      }
    })
  },

  // 选择照片
  chooseImg(type) {
    let tempFilePaths = this.data.tempFilePaths;
    let len = tempFilePaths.length;
    let count = 9 - len;
    console.log(len);
    if (len == 0) {
      console.log("空照片")
      wx.chooseImage({
        count: count,
        sizeType: ['original', 'compressed'],
        sourceType: [type],
        success: (res) => {
          console.log(res)
          this.setData({
            tempFilePaths: res.tempFilePaths,
            len: res.tempFilePaths.length
          })
        }
      })
    } else {
      console.log("有照片，不为空追加")
      wx.chooseImage({
        count: count,
        sizeType: ['original', 'compressed'],
        sourceType: [type],
        success: (res) => {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          let newtempFilePaths = tempFilePaths.concat(res.tempFilePaths)
          console.log(res)
          this.setData({
            tempFilePaths: newtempFilePaths,
            len: res.tempFilePaths.length + len
          })
        }
      })
    }
  },

  // 上传图片
  uploadImg(filePath, number) {
    let url = app.globalData.domain + 'UploadImg.aspx';
    wx.showLoading({
      title: '正在发布',
    })
    wx.uploadFile({
      url: url,
      filePath: filePath,
      name: 'fileData',
      formData: {
        number: number
      },
      success: (res) => {
        let imageList = this.data.imageList;
        let newArr = [];
        let data = JSON.parse(res.data);
        newArr.push(data.data)
        let newimageList = imageList.concat(newArr)
        let stringImageList = newimageList.join(',')
        this.setData({
          imageList: newimageList,
          stringImageList: stringImageList
        })
        return stringImageList;
      },
      fail: (res) => {
      },
      complete: () => {
      }
    });
  },

  // 删除图片
  delTap(e) {
    let index = e.currentTarget.dataset.index;
    let tempFilePaths = this.data.tempFilePaths;
    let len = tempFilePaths.length - 1;
    wx.showModal({
      title: '确定删除这张照片？',
      success: (res) => {
        if (res.confirm) {
          tempFilePaths.splice(index, 1)
          this.setData({
            tempFilePaths: tempFilePaths,
            len: len
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  // 发布按钮
  submitTap() {
    console.log("出售")
    let uid = this.data.uid;
    let type = parseInt(this.data.type);
    let departurePlace = this.data.departurePlace;
    let departurePlaceLng = this.data.departurePlaceLng;
    let departurePlaceLat = this.data.departurePlaceLat;
    let destination = this.data.destination;
    let destinationLng = this.data.destinationLng;
    let destinationLat = this.data.destinationLat;
    let rideTimeF = this.data.rideTimeF;
    let rideTimeS = this.data.rideTimeS;
    let rideCount = this.data.rideCount;
    let describe = this.data.describe;
    let hitchItemId = this.data.hitchItemId;
    let name = this.data.name;
    let mobile = this.data.mobile;
    if (describe == null || rideTimeF == null || rideTimeS == null || departurePlace == null || departurePlaceLng == null || departurePlaceLat == null || destination == null || destinationLng == null || destinationLat == null || name == null || mobile == null) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none',
        mask: true,
        duration: 1500
      })
    } else {
      wx.showLoading({
        title: '正在发布',
      })
      let tempFilePaths = this.data.tempFilePaths;
      for (let index in tempFilePaths) {
        this.uploadImg(tempFilePaths[index], index)
      }
      setTimeout(() => {
        let stringImageList = this.data.stringImageList;
        if (stringImageList == null) {
          wx.showToast({
            title: '请上传照片',
            icon: 'none',
            mask: true,
            duration: 1500
          })
        } else {
          console.log(this.data.stringImageList)
          let params = {
            type: 'POST',
            url: 'ReleaseHitch.aspx',
            data: {
              'uid': uid,
              'type': parseInt(type) + 1,
              'hitchItemId': hitchItemId,
              'describe': describe,
              'imageList': stringImageList,
              'name': name,
              'mobile': mobile,
              'departurePlace': departurePlace,
              'departurePlaceLng': departurePlaceLng,
              'departurePlaceLat': departurePlaceLat,
              'destination': destination,
              'destinationLng': destinationLng,
              'destinationLat': destinationLat,
              'rideTime': rideTimeF + ' ' + rideTimeS,
              'rideCount': rideCount,
            },
            sCallback: (res) => {
              setTimeout(() => {
                wx.hideLoading();
              }, 1800)
              console.log(res)
              if (res.code != '200') {
                wx.showToast({
                  title: res.message,
                  icon: 'none',
                  mask: true,
                  duration: 1500
                })
              } else {
                wx.showToast({
                  title: res.message,
                  icon: 'none',
                  mask: true,
                  duration: 1500
                })
                setTimeout(() => {
                  wx.reLaunch({
                    url: '/pages/index/index'
                  })
                }, 1500)
              }
            }
          }
          console.log(params.data)
          app.request(params);
        }
      }, 2000)
    }
  }
})