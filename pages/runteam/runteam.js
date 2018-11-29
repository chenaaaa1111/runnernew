// pages/runteam/runteam.js
import {
  req
} from './../../utils/request.js';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    teamList: [],
    uid: "",
  },
//跳转加入跑团详情页面
  goPersonTeam: function(event){
    var index = event.currentTarget.dataset['index'];
    console.log(event.currentTarget.dataset['index']);
    wx.navigateTo({
      url: './../runteam/joinTeam/joinTeam?id=' + this.data.teamList[index].id ,
    })
  },
  //跳转至创建跑团页面
  goCreateTeam: function () {
    wx.navigateTo({
      url: './../runteam/createTeam/createTeam',
    })
    //跳转至地图页面
    // wx.navigateTo({
    //   url: './../echart/echart',
    // })
  },
    //加入跑团——跳转跑团列表
  //跳转至跑团列表
  goTeamList: function () {
    wx.navigateTo({
      url: './../runList/runList',
    })
  },
  //跳转至活动页—propaganda
  goPropaganda: function () {
    wx.navigateTo({
      url: './../propaganda/propaganda',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取数据-是否加入跑团等
    req.teamstatus({}, res => {
      console.log("跑团首页", res);
      if (res.data.data.teamstatus === "0") {
        console.log("未加入跑团", res.data.data2)
        this.setData({
          teamList: res.data.data2,
          uid: res.data.data.uid
        });
      } else if (res.data.data2.teamstatus === "1") {
        console.log("已加入跑团", res.data.data)
        wx.reLaunch({
          url: "./../runteam/personTeam/personTeam"
        })
      }
    })
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

  }
})