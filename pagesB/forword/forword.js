// pages/forword/forword.js
import request from './../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      cityLis:[],
      tgchoose:false,
       cityId:0,
      cityName:'',
      choose:false,
      countryName:'',
    showmenban:false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  backhome:function(){
      wx.navigateBack({
        delta:1
      })
  },
  chooseCity:function(res){
    console.log('chooseCity',res);
    var cityId=res.detail.cityId;
    var cityName = res.detail.cityName;
    var countryName = res.detail.countryName;
    this.setData({ cityId: cityId, cityName: cityName,
                  countryName: countryName,
      choose: !this.data.choose,
      chooseCity: !this.data.chooseCity,
                   showmenban: !this.data.showmenban
                  }
)
  },
  gotoworld:function(){
    if (this.data.cityId){
        wx.navigateTo({
          url: "/pages/cityImages/cityImages?cityId=" + this.data.cityId + "&cityName="+this.data.cityName+
            "&countryName=" + this.data.countryName,
        })
    }else{
      wx.showModal({
        title: '提示',
        content: '请选择城市',
        duration:1000,
        showCancel:false,
        
        success: function (recc) {
            comsole.log(recc);
        }
      })
    }
  
  },
  onLoad: function (options) {
    var self=this;
    request.req.reqcitys({}, function (res) {
      console.log(res)
      self.setData({
        cityLis:res.data.data
      })
      console.log('citys', self.data.cityLis)
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
  tgchoose:function(event){
    this.setData({ choose: !this.data.choose, showmenban: !this.data.showmenban})

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