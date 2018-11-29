// pages/runteam/joinTeam/joinTeam.js
import {
  req
} from "./../../../utils/request.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    team: {},
    hasTeam: false,
  },

  //跳转跑团排行
  goRunRank: function(){
    wx.navigateTo({ 
      url: './../../runList/runList',
    })
  },
  //入团申请
  applyTeam:function(){
    var that = this;
    if (this.data.team.checkstatus === 0){
      req.agreeinteam({uid: "-1",teamid:this.data.team.id },res =>{
        console.log("入团",res);
        if (res.data.data && res.data.data.indexOf("已加入其他跑团")){
          wx.showToast({
            title: '已加入其他跑团或已创建跑团',
            'icon': 'none',
            duration: 1000
          });
          return;
        }
        wx.reLaunch({
          url: './../personTeam/personTeam',
        })
        return;
      })
    }
    req.applyTeam({teamid: this.data.team.id},function(res){
      console.log("发起入团申请", res.data)
      if (res.data.data ==="申请成功"){
        wx.showToast({
          title: '申请成功，等待团长审核',
          'icon': 'none',
          duration: 1000
        });
        setTimeout(()=>{
          wx.navigateTo({
            url: './../../runteam/runteam',
          })
        },1000)
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    req.teamDetail({teamid: options.id}, function(res) {
      console.log("跑团详情",res);
      that.setData({
        team: res.data.data,
        ["team.handle"]: res.data.data2.handle,
        hasTeam: !!options.teamid,
      })
    })
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