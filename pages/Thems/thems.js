// pages/Thems/thems.js

import { requestbaner, req } from './../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      dataList:[],
      dropUp:false,
      dropDown:"",
      easydropUp:true,
      easydropDown:"",
      isChoose:false,
      canRun:true
      
  },
  goback:function(e){
    wx.navigateBack({
      delta: 1    
    })
  },
  goTorun:function(e){
    console.log('e',e);
    var name = e.currentTarget.id;
    console.log('*****', e.currentTarget.dataset.canRun);
    if (!e.currentTarget.dataset.ischoose && e.currentTarget.dataset.canrun){
      req.reqaddImage({ name: e.currentTarget.id},function(res){
           console.log('res',res);
      })
      wx.navigateTo({
        url: './../forwho/forwho?id=' + name,
      })
    }else{
      wx.navigateTo({
        url: './../running/running?id=' + name,
      })
    }
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self=this;
    req.requestThenms({},function(res){
        console.log('thems',res);
        var list=[];
        var twoarray=[];
        for(var ind in res.data.data){
          var imgArra = [];
          for (var i = 0; i < res.data.data[ind].heng;i++){
            imgArra.push('./../../images/themsItem/s7.png')
          }
          res.data.data[ind].starImages = imgArra;
          twoarray.push(res.data.data[ind])
          if (twoarray.length>=2){
            list.push(twoarray);
            twoarray=[];
          }

        }
        self.setData({ dataList: list})
        console.log('selfdata', list);
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