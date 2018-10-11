//index.js
//获取应用实例
import request from './../../utils/request.js'
const app = getApp()
const updateManager = wx.getUpdateManager();
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
  checkSession:function(){
    var jscode=wx.getStorageSync('jscode');
    if(!jscode){
      wx.reLaunch({
        url: '/pages/index/index',
      })
    }
  },
  onLoad: function () {
    //
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      console.log("有用户信息", app.globalData.userInfo, typeof app.globalData.userInfo.nickName);

      if (wx.getStorageSync('sessionId') && wx.getStorageSync('token')){
        wx.switchTab({
        url: './../home/home',
      })
      }
      
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log('callbackRes',res);  
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          console.log('resu低版本获取用户信息处理',res);
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          var jscode = res.code;
           wx.setStorageSync('jscode');
          wx.login({
            success: function (res) {
              console.log("获取到信息登陆 低版本登陆 ", res);
              jscode = res.code;
              wx.setStorageSync('jscode', jscode)
              if (jscode) {
                request.requestLogin({
                  'jscode': jscode,
                  'name': userInfo.nickName, 'photo': userInfo.avatarUrl
                }, function (res) {
                  console.log('index页面请求登陆接口成功', res);
                  console.log('sessionid', res.data.data.sessionid);
                  var sessionId = res.data.data.sessionid;
                  wx.setStorageSync('sessionId', sessionId);
                  wx.setStorageSync('token', res.data.data.token);
                  self.setData({
                    userInfo: e.detail.userInfo,
                    hasUserInfo: true
                  })
                  wx.switchTab({
                    url: './../home/home',
                  })
                });
              }
            }
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    var userInfo = e.detail.userInfo;
    app.globalData.userInfo = e.detail.userInfo;
    var jscode='';
    var self=this;
    wx.login({
      success:function(res){
        console.log("index页面登陆 ",res);
        jscode=res.code;
        wx.setStorageSync('jscode', jscode)
        if (jscode) {
          request.requestLogin({
            'jscode': jscode,
            'name': userInfo.nickName, 'photo': userInfo.avatarUrl
          }, function (res) {
            console.log('index页面请求登陆接口成功', res);
            console.log('sessionid', res.data.data.sessionid);
            var sessionId = res.data.data.sessionid;
            wx.setStorageSync('sessionId', sessionId);
            wx.setStorageSync('token', res.data.data.token);
            self.setData({
              userInfo: e.detail.userInfo,
              hasUserInfo: true
            })
            wx.switchTab({
              url: './../home/home',
            })
          });
        } 
      }
    })


  }
})
