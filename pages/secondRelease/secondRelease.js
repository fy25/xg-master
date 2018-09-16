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
    secondHandCarItemId: '',
    stringImageList: '',
    read: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.type)
    let uid = wx.getStorageSync('uid');
    this.setData({
      type: options.type,
      uid: uid
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

  // 获取附加列表
  getLuminousList() {
    let type = this.data.type + 1;
    let params = {
      type: 'POST',
      url: 'CarItemList.aspx',
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
    let secondHandCarItemId = e.detail.value.join(',');
    this.setData({
      secondHandCarItemId: secondHandCarItemId
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
    if (this.data.type == '0') {
      console.log("出售")
      let uid = this.data.uid;
      let type = this.data.type;
      let describe = this.data.describe;
      let secondHandCarItemId = this.data.secondHandCarItemId;
      let name = this.data.name;
      let mobile = this.data.mobile;
      if (describe == null || secondHandCarItemId == null || name == null || mobile == null) {
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
              url: 'ReleaseCar.aspx',
              data: {
                'uid': uid,
                'type': parseInt(type) + 1,
                'secondHandCarItemId': secondHandCarItemId,
                'describe': describe,
                'imageList': stringImageList,
                'name': name,
                'mobile': mobile
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
            app.request(params);
          }
        }, 2000)
      }
    } else if (this.data.type == '1') {
      console.log("求购")
      let uid = this.data.uid;
      let type = this.data.type;
      let describe = this.data.describe;
      let secondHandCarItemId = this.data.secondHandCarItemId;
      let name = this.data.name;
      let mobile = this.data.mobile;
      console.log(describe)
      console.log(secondHandCarItemId)
      console.log(name)
      console.log(mobile)
      if (describe == null || name == null || mobile == null) {
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
          let params = {
            type: 'POST',
            url: 'ReleaseCar.aspx',
            data: {
              'uid': uid,
              'type': parseInt(type) + 1,
              'secondHandCarItemId': secondHandCarItemId,
              'describe': describe,
              'imageList': stringImageList,
              'name': name,
              'mobile': mobile
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
          app.request(params);
        }, 2000)
      }
    }
  }
})