// pages/runnew/runned/runned.js

import request from './../../../utils/request.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    totolNum:0,
    nextnum:0,
    getmisData:'',
    path:'',
    opacity:0,
    content: '',
    name: 'name'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self=this;
    var id=options.id;
    var path = options.path;
    var content = options.content;
    var name=options.name;
    this.setData({name: name,content:content});
    this.setData({path:path})
    var sendData={
      id: id,
      status:2
    }
    request.req.reqmisRunStep(sendData,function(res){
      console.log('获取步数',res);
    })

    var getmisData=setInterval(function(){
      var sendData = {
        id: id,
        status: 1
      }
      request.req.reqmisRunStep(sendData, function (res) {
        var totolNum = res.data.data.startstep;
        var many = res.data.data.many;
        var per = many / totolNum;
        var stepNum = res.data.data.setstep;
        self.setData({ opacity: stepNum})
        console.log('获取步数', stepNum);
        self.setData({ totolNum: totolNum,
          nextnum: stepNum-many})
      })
    },5000)
    this.setData({
      getmisData: getmisData
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
    clearInterval(this.data.getmisData);
    console.log('onUnload')
    this.setData({
      getmisData: ''
    })
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