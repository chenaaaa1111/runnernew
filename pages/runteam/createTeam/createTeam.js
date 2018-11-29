// pages/runteam/createTeam/createTeam.js
import {
  req
} from "./../../../utils/request.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isChange: false, //是否为修改跑团信息
    teamid: "",
    logosrc: "",
    name: "",
    slogan: "",
    intro: "",
    addIsChk: false,
    uninpt: false, //跑团名称是否输入错误
  },

  //选择logo图片
  upLogo: function() {
    let teamid = "";
    if (this.data.teamid) {
      teamid = this.data.teamid;
    }
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      success: function(res) {
        const src = res.tempFilePaths[0];
        wx.redirectTo({
          url: `../selectAvatar/selectAvatar?src=${src}&teamid=${teamid}`,
        });
      }
    })
  },
  //上传图片
  uploadLogo(id){
    var that = this;
    //上传logo——在创建跑团成功后
    wx.uploadFile({
      url: 'https://ishzi.cn/sport/team/uploadlogo',
      filePath: that.data.logosrc,
      header: {
        'Cookie': "JSESSIONID=" + wx.getStorageSync('sessionId')
      },
      name: 'imgFile',
      formData: {
        teamid: id,
        token: wx.getStorageSync('token')
      },
      success: function (logores) {
        var resData = logores.data ? JSON.parse(logores.data).data : "";
        if (logores.statusCode === 200 && resData === "上传成功") {
          console.log("上传成功", logores);
          // wx.showToast({
          //   title: '跑团创建成功！',
          //   'icon': 'none',
          //   duration: 2000
          // });
          wx.reLaunch({
            url: './../../runteam/personTeam/personTeam',
          })
        }
      }
    })
  },
  //创建跑团——确认
  createTeam: function() {
    if (!this.data.name) {
      wx.showToast({
        title: '请完善跑团信息！',
        'icon': 'none',
        duration: 2000
      });
    }
    var that = this;
    var sendData = {
      name: this.data.name,
      slogan: this.data.slogan,
      // logo: this.data.logosrc,
      checkstatus: this.data.addIsChk === true ? 1 : 0,
      intro: this.data.intro,
    };
    req.createTeam(sendData, function(res) {
      console.log("创建跑团", res.data.data.teamid, sendData)
      if (res.data.data.teamid) {
        if (!that.data.logosrc) {
          // wx.showToast({
          //   title: '跑团创建成功！',
          //   'icon': 'none',
          //   duration: 2000
          // });
          wx.reLaunch({
            url: './../../runteam/personTeam/personTeam',
          })
        } else {
          this.uploadLogo(res.data.data.teamid);
        }
      }
    });
  },
  //信息修改
  changeInfo() {
    var checkstatus = this.data.addIsChk === true ? 1 : 0;
    req.updateteam({
      id: this.data.teamid,
      intro: this.data.intro,
      slogan: this.data.slogan,
      checkstatus: checkstatus,
    }, res => {
      console.log("跑团信息更新", !this.data.logosrc)
      if (res.data.data.id) {
        if (!this.data.logosrc) {
          wx.showToast({
            title: '跑团信息更新成功！',
            'icon': 'none',
            duration: 2000
          });
          wx.navigateBack({
            delta: 1
          })
        } else {
          this.uploadLogo(this.data.teamid);
        }

      }
    })
  },
  //名称输入校验
  nameValida: function(e) {
    var that = this;
    if (e.detail.value.length < 2) {
      this.setData({
        uninpt: true
      });
      return;
    }
    //跑团名称是否重复
    req.isteamname({
      name: e.detail.value
    }, function(res) {
      console.log("名称查重", res);
      if (res.data.data.isname === "1") {
        that.setData({
          uninpt: false,
          name: e.detail.value,
        });
        return;
      }
      if (res.data.data.isname === "0") {
        wx.showToast({
          title: '该名称已经被占用！',
          'icon': 'none',
          duration: 2000
        });
        that.setData({
          uninpt: true
        });
      }
    });
    console.log('跑团名称', e.detail.value);
  },
  //口号输入校验
  sloganValida: function(e) {
    this.setData({
      slogan: e.detail.value
    });
    console.log('跑团口号', e.detail.value);
  },
  //简介输入校验
  introValida: function(e) {
    this.setData({
      intro: e.detail.value
    });
    console.log('跑团简洁', e.detail.value);
  },
  //switch——触发change事件
  switchChange: function(e) {
    this.setData({
      addIsChk: e.detail.value
    });
    console.log('switch 发生 change 事件，携带值为', e.detail.value, this.data.addIsChk);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.teamid) {
      req.teamDetail({
        teamid: options.teamid
      }, res => {
        if (res.data && res.data.data) {
          let data = res.data.data;
          this.setData({
            isChange: true,
            teamid: options.teamid, 
            name: data.name,
            // logosrc: data.logo,
            slogan: data.slogan,
            intro: data.intro,
            addIsChk: data.checkstatus === 1 ? true : false,
          });
        }
      });
    }
    if (options.avatar) {
      this.setData({
        logosrc: options.avatar
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})