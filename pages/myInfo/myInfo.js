// pages/myInfo/myInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sexArr: ['保密', '男', '女'],
    sexIndex: 0,
    birthday: '',
    sex: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo()
  },
  // 获取会员信息
  getUserInfo() {
    let uid = wx.getStorageSync('uid');
    if (uid != '') {
      let params = {
        type: 'POST',
        url: 'UserInfo.aspx',
        data: {
          'uid': uid
        },
        sCallback: (res) => {
          console.log(res)
          this.setData({
            headImg: res.data.headImg,
            nickname: res.data.nickname,
            birthday: res.data.birthday,
            mobile: res.data.mobile,
            sex: res.data.sex,
            number: res.data.number,
            sexIndex: res.data.sex
          })
        }
      }
      console.log(params.data)
      app.request(params);
    }
  },
  // 选择生日
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      birthday: e.detail.value
    })
  },

  bindPickerChange(e) {
    this.setData({
      sex: e.detail.value,
      sexIndex: e.detail.value
    })
  },

  nameTap(e) {
    this.setData({
      nickname: e.detail.value
    })
  },

  // 修改信息
  editTap() {
    let uid = wx.getStorageSync('uid');
    let headImg = this.data.headImg;
    let nickname = this.data.nickname;
    let sex = this.data.sex;
    let birthday = this.data.birthday;
    let params = {
      type: 'POST',
      url: 'EditUserInfo.aspx',
      data: {
        'uid': uid,
        'nickname': nickname,
        'sex': sex,
        'birthday': birthday
      },
      sCallback: (res) => {
        console.log(res)
        if (res.code == '200') {
          wx.showToast({
            title: res.message,
            mask: true,
            duration: 1500,
            icon: 'success'
          });
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 1500)
        }

      }
    }
    console.log(params.data)
    app.request(params);
  }
})