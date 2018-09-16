// pages/release_main/release_main.js
const app = getApp();
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    salaryIndex: 0,
    sexIndex: 0,
    experienceIndex: 0,
    positionIndex: 0,
    sexText: ['不限', '先生', '女士'],
    sexText2: ['保密', '先生', '女士'],
    tempFilePaths: [],
    len: 0,
    imageList: [],
    sex: 0,
    describe: null,
    welfareId: null,
    name: null,
    mobile: null,
    stringImageList: '',
    birthYear: '',
    read: false,
    _num: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.type)
    let now = new Date();
    let uid = wx.getStorageSync('uid');
    this.setData({
      type: options.type,
      uid: uid,
      now: now
    })
    this.getJobList()
    this.getSalaryList()
    this.getWelfareList()
    this.getExperList()
  },
  positionTap (e) {
    let _num = e.currentTarget.dataset.index;
    this.setData({
      _num: _num,
      positionId: this.data.positionList[_num].id
    })
  },

  readTap () {
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

  xzTap () {
    wx.navigateTo({
      url: '/pages/web/web?id=2'
    })
  },
  // 获取职位列表
  getJobList () {
    let params = {
      type: 'POST',
      url: 'PositionList.aspx',
      data: {},
      sCallback: (res) => {
        let positionText = [];
        res.data.forEach(item => {
          positionText.push(item.name)
        })
        console.log(positionText)
        this.setData({
          positionList: res.data,
          positionText: positionText,
          positionId: res.data[0].id
        })
      }
    }
    app.request(params);
  },

  // 获取薪资列表
  getSalaryList () {
    let params = {
      type: 'POST',
      url: 'SalaryList.aspx',
      data: {},
      sCallback: (res) => {
        console.log(res)
        let salaryText = [];
        res.data.forEach(item => {
          salaryText.push(item.name)
        });
        this.setData({
          salaryList: res.data,
          salaryText: salaryText,
          salaryId: res.data[0].id
        })
      }
    }
    app.request(params);
  },

  // 获取福利列表
  getWelfareList () {
    let params = {
      type: 'POST',
      url: 'WelfareList.aspx',
      data: {},
      sCallback: (res) => {
        console.log(res)
        this.setData({
          welfareList: res.data
        })
      }
    }
    app.request(params);
  },

  // 获取工作经验列表
  getExperList () {
    let params = {
      type: 'POST',
      url: 'JobExperienceList.aspx',
      data: {},
      sCallback: (res) => {
        console.log(res)
        let experienceText = [];
        res.data.forEach(item => {
          experienceText.push(item.name)
        });
        this.setData({
          experienceText: experienceText,
          experienceList: res.data,
          jobExperienceId: res.data[0].id
        })
      }
    }
    app.request(params);
  },

  // 选择职位
  changePosition (e) {
    this.setData({
      positionIndex: e.detail.value,
      positionId: this.data.positionList[e.detail.value].id
    })
  },

  // 选择薪资
  changeSalary (e) {
    this.setData({
      salaryIndex: e.detail.value,
      salaryId: this.data.salaryList[e.detail.value].id
    })
  },

  // 选择工作经验
  changeExperience (e) {
    this.setData({
      experienceIndex: e.detail.value,
      jobExperienceId: this.data.experienceList[e.detail.value].id
    })
  },

  // 选择性别
  changeSex (e) {
    this.setData({
      sexIndex: e.detail.value,
      sex: e.detail.value
    })
  },

  // 姓名
  nameTap (e) {
    this.setData({
      name: e.detail.value
    })
  },

  // 电话
  telTap (e) {
    this.setData({
      mobile: e.detail.value
    })
  },

  // 描述
  describeTap (e) {
    console.log(e.detail.value)
    this.setData({
      describe: e.detail.value
    })
  },

  welfareChange: function (e) {
    let welfareId = e.detail.value.join(',');
    this.setData({
      welfareId: welfareId
    })
  },

  // 生日选择
  birthChange (e) {
    this.setData({
      birthYear: e.detail.value
    })
  },

  // 上传照片按钮
  imgTap () {
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#f7982a",
      success: (res) => {
        if (res.tapIndex == 0) {
          console.log("从相册中选择")
          this.chooseImg('album')
        } else {
          console.log("拍照")
          this.chooseImg('camera')
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },

  // 选择照片
  chooseImg (type) {
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
  uploadImg (filePath, number) {
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
  delTap (e) {
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
  submitTap () {
    if (this.data.type == '0') {
      let uid = this.data.uid;
      let positionId = this.data.positionId;
      let salaryId = this.data.salaryId;
      let sex = this.data.sex;
      let describe = this.data.describe;
      let welfareId = this.data.welfareId;
      let name = this.data.name;
      let mobile = this.data.mobile;
      if (describe == null || welfareId == null || name == null || mobile == null) {
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
          console.log(this.data.stringImageList)
          let params = {
            type: 'POST',
            url: 'ReleaseRecruit.aspx',
            data: {
              'uid': uid,
              'positionId': positionId,
              'salaryId': salaryId,
              'sex': sex,
              'describe': describe,
              'welfareId': welfareId,
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
    } else {
      console.log("求职")
      let uid = this.data.uid;
      let positionId = this.data.positionId;
      let salaryId = this.data.salaryId;
      let sex = this.data.sex;
      let describe = this.data.describe;
      let jobExperienceId = this.data.jobExperienceId;
      let birthYear = this.data.birthYear;
      let name = this.data.name;
      let mobile = this.data.mobile;
      if (describe == null || birthYear == null || name == null || mobile == null) {
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
          this.uploadImg(tempFilePaths[index])
        }
        setTimeout(() => {
          let stringImageList = this.data.stringImageList;
          console.log(this.data.stringImageList)
          let params = {
            type: 'POST',
            url: 'ReleaseJobWanted.aspx',
            data: {
              'uid': uid,
              'positionId': positionId,
              'salaryId': salaryId,
              'sex': sex,
              'describe': describe,
              'jobExperienceId': jobExperienceId,
              'birthYear': birthYear,
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