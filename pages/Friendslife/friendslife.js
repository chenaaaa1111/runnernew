// pages/Friendslife/friendslife.js
import request from './../../utils/request.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ranking:[],
    pageNum: 1
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var sendData = { pageNum:1};
    var self=this;
    // request.req.requestFriedLife(sendData,function(res){
    //   console.log(res.data.data);//查询朋友圈
    //   self.setData({

    //   })
    // });
    //查询排行榜
    var sendDa={
      pageNum:this.data.pageNum
    }
    request.req.requestRanking(sendDa, function (res) {
      
      console.log('查询排行榜',res.data.data);//查询排行榜
      var lists = res.data.data;
      self.setData({
        ranking: lists
      })
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