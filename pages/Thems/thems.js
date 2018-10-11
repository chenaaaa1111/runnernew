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
      canRun:true,
      isclick:false
      
  },
  goback:function(e){
    console.log(111)
    this.setData({
      isclick:true
    });
    wx.switchTab({
      url: './../home/home'
    })
  },
  goTorun:function(e){
    console.log('e',e);
    var name = e.currentTarget.id;
    var ischoose = e.currentTarget.dataset.ischoose;
    var runed = e.currentTarget.dataset.runed;
    console.log('*****', e.currentTarget.dataset.canRun);
    if (true){
      req.requestloadImage({
        name: e.currentTarget.id
      },function(res){
        console.log('status', res.data.data.status);
         var oldName ='';//
        if (res.data && res.data.data2 && res.data.data2.name){
          oldName = res.data.data2.name;
         }
        if (res.data.data.runstatus==0){//判断点击是否为正在跑的图片
          wx.showModal({
            title: '提示',
            content: '确定要重新选择图片？',
            showCancel: true,//是否显示取消按钮
            cancelText: "取消",//默认是“取消”
            cancelColor: '#ccc',//取消文字的颜色
            confirmText: "确定",//默认是“确定”
            confirmColor: '#000',//确定文字的颜色
            success: function (recc) {
              console.log('recc',recc)
              if (recc.cancel) {
                //点击取消,默认隐藏弹框
                //点击取消,默认隐藏弹框

                if (res.data.data.status == 1 && runed == 1) {
                  wx.navigateTo({
                    url: './../runnew/runnew?id=' + oldName,
                  })
                } else {
                  wx.navigateTo({
                    url: './../runnew/runnew?id=' + oldName,
                  })
                }
                return false;
              } else if (recc.confirm){
                //点击确定
                if (res.data.data.status == 0) {//没有选择过为爱而跑
                  wx.navigateTo({
                    url: './../forwho/forwho?id=' + name
                  })

                } else if (res.data.data.status == 1 && runed == 1) {
                  wx.navigateTo({
                    url: './../runnew/runnew?id=' + name ,
                  })
                } else {
                  wx.navigateTo({
                    url: './../runnew/runnew?id=' + name,
                  })
                }
              }
            },
            fail: function (res) { },//接口调用失败的回调函数
            complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
          })

        } else if ((res.data.data.runstatus==2)){
          //点击确定
          if (res.data.data.status == 0) {//没有选择过为爱而跑
            wx.navigateTo({
              url: './../forwho/forwho?id=' + name
            })

          } else if (res.data.data.status == 1 && runed == 1) {
            wx.navigateTo({
              url: './../runnew/runnew?id=' + name,
            })
          } else {
            wx.navigateTo({
              url: './../runnew/runnew?id=' + name,
            })
          }

        } else if ((res.data.data.runstatus==1)){
          wx.navigateTo({
            url: './../runnew/runnew?id=' + name,
          })
        }
       
     
       
      })
    
    }else{
      
    }
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
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
    var self = this;
    this.setData({ isclick: false })
    req.requestThenms({}, function (res) {
      console.log('thems', res);
      var list = [];
      var twoarray = [];
      for (var ind in res.data.data) {
        var imgArra = [];
        for (var i = 0; i < res.data.data[ind].heng; i++) {
          imgArra.push('./../../images/themsItem/s7.png')
        }
        res.data.data[ind].starImages = imgArra;
        twoarray.push(res.data.data[ind])
        if (twoarray.length >= 2) {
          list.push(twoarray);
          twoarray = [];
        }

      }
      self.setData({ dataList: list })
      console.log('selfdata', list);
    })
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