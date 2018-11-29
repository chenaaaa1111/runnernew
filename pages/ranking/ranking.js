// pages/ranking/ranking.js
import request from './../../utils/request.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ranking: [],
    pageNum: 1,
    ishas:true,
    pageSize:15,
    userName:'',
    uid:0
  },
  scrollload:function(e){
    var self=this;
    var sendData={

    }
      console.log('scroll');
    wx.showLoading({
      title: '玩命加载中',
    });
    var sendData = { pageNum: this.data.pageNum,
      pageSize: this.data.pageSize};
    request.req.requestRanking(sendData, function (res) {
      wx.hideLoading();
      console.log('查询排行榜', res.data.data);//查询排行榜
      if(!res.data.data||res.data.data.length==0)      {
        self.setData({ ishas:false});
        return;
      }
    
      var lists = res.data.data;
      self.setData({
        ranking: self.data.ranking.concat(lists),
        pageNum: self.data.pageNum + 1
      })
    });

  },
  onReachBottom(){
      console.log('下拉刷新');
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //查询排行榜
    var self=this;
    var userName = app.globalData.userInfo.name ;
    console.log(userName);
    var sendDa = {
      pageNum: this.data.pageNum,
      pageSize: this.data.pageSize
    }
    request.req.requestRanking(sendDa, function (res) {
      var uid=res.data.data2;
      console.log('uid',uid);
      self.setData({
        uid: uid
      })

      console.log('查询排行榜', res.data.data);//查询排行榜
      var lists = res.data.data;
      self.setData({
        ranking: lists,
        pageNum: self.data.pageNum+1
      })
      // self.scrollload();
    });
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
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
    return {
      title: '运动酷咖',
      path: '/pages/index/index?positionId=' + true  // 当打开分享链接的时候跳转到小程序首页，并设置参数positionId
    }
  }
})