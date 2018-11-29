// pages/home/home.js
import { requestbaner, req} from './../../utils/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList:[],
    xingzuo:'',
    shengxiao:'',
    indicatorDots: false,
    hasdot:false,
    'word':"http://47.101.136.23:8080/sport/image/575822035958730970.jpg"
  },
  gotoThems:function(e){
      wx.navigateTo({
        url: './../Thems/thems',
      })
  },
  gotocris:function(e){
    var sendData={};
    req.reqmissum(sendData,res=>{
        console.log('res',res);
        if(res.data.data.length>0){
            var imgInfro=res.data.data[0];
            var wordInfor=res.data.data2;
          var id = imgInfro.id;
            console.log('imgInfor',imgInfro);
          wx.setStorageSync('imgInfor', imgInfro);
          var path = imgInfro.path;
          var name = imgInfro.name;
          var content = imgInfro.content;
        var wordsstatus = wordInfor.wordsstatus;
          if (wordsstatus && wordsstatus!=0){
            var words = wordInfor.words;
            var wordstime = wordInfor.wordstime;
            wx.navigateTo({
              url: '/pagesB/runnew/runned/runned?id=' + id + "&path=" + path + "&name=" + name + "&content=" + content + "&words=" + words + "&wordstime=" + wordstime,
            })
        }
          wx.navigateTo({
            url: '/pagesB/runnew/runned/runned?id=' + id + "&path=" + path + "&name=" + name + "&content=" + content,
          })
        }else{
          wx.navigateTo({
            url: './../fillImage/fillImage',
          })
        }
    })
   
  },
  checkSession: function () {
    var jscode = wx.getStorageSync('jscode');
    if (!jscode) {
      wx.navigateTo({
        url: '/pages/index/index',
      })
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
    console.log('homeonload');
    this.checkSession()
    var self = this;
    this.setData({
      hasdot: false
    })
    try {
      var jscode = wx.getStorageSync('jscode');
      if (!jscode) {
        return;
      }
      console.log('jscode', jscode);
      if (jscode) {
        requestbaner({}, function (res) {
          console.log('imgres', res.data.data);
          var xingzuo = res.data.data['sx'];
          var elsee = res.data.data['xz'];

          self.setData({
            swiperList: res.data.data2,
            xingzuo: xingzuo,
            shengxiao: elsee
          })
          for (var i in res.data.data) {
            console.log(res.data.data[i]);
          }
        }, 'GET');
      }
    } catch (e) {

    }
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