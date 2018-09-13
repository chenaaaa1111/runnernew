//index.js
//获取应用实例
import request from './../../utils/request.js'
const app = getApp()
Page({
  data: {
    motto: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
   wx.switchTab({
     url: './../home/home',
   })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      console.log(app.globalData.userInfo);
      wx.switchTab({
        url: './../home/home',
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        wx.switchTab({
          url: './../home/home',
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          console.log('resu',res);
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          var jscode = wx.getStorageSync('jscode');
          console.log('jscode', jscode);
          // if (jscode) {
          //   request.requestLogin({
          //     'jscode': jscode,
          //     'name': userInfo.nickName, 'photo': userInfo.avatarUrl
          //   },function (res) {
          //     console.log('indexUserInfor',res);
          //       console.log('sessionid', res.data.data.sessionid);
          //       var sessionId = res.data.data.sessionid;
          //     wx.setStorageSync('sessionId',sessionId);
          //       wx.setStorageSync('token', res.data.data.token)

          //     });
          // }
          wx.switchTab({
            url: './../home/home',
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    var userInfo = e.detail.userInfo;
    app.globalData.userInfo = e.detail.userInfo;
    // wx.login({
    //   success:function(res){
    //       console.log('第一次登陆',res);
    //   }
    // })
    var jscode = wx.getStorageSync('jscode');
    console.log('jscode',jscode);
    // if (jscode){

    //   request.requestLogin({
    //     'jscode': jscode,
    //     'name': userInfo.nickName, 'photo': userInfo.avatarUrl
    //   },function (res) {
    //     console.log('resgetUserInfor',res);
    //       console.log('sessionid', res.data.data.sessionid);
    //       var sessionId = res.data.data.sessionid;
    //       wx.setStorageSync('sessionId', sessionId);
    //       wx.setStorageSync('token', res.data.data.token)

    //     });
    // }
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    wx.switchTab({
      url: './../home/home',
    })
  }
})
