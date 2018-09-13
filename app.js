//app.js
import request from 'utils/request.js'

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res);
        wx.setStorageSync('jscode', res.code);//存储code
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log('resuserInfor',res.userInfo)
              console.log('jscode', wx.getStorageSync('jscode'));
              var sendData = {
                'jscode': wx.getStorageSync('jscode'),
                'name': res.userInfo.nickName, 'photo': res.userInfo.avatarUrl
              };
              request.requestLogin(sendData,
                function (res) {
                  console.log('登陆接口',sendData,res);
                  console.log('sessionid', res.data.data.sessionid);
                  var sessionId = res.data.data.sessionid;
                  wx.setStorageSync('sessionId', sessionId);
                  wx.setStorageSync('token', res.data.data.token)

                });
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})