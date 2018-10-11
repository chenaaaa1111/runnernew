// pages/cityImages/cityImages.js
import request from './../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[],
    cityId:''
  },
  goTorun:function(e){
      console.log(e)
    var imgId = e.currentTarget.id;
    var cityId = this.data.cityId;
    var sendData = { cityimgid: imgId};
    request.req.reqaddwordimage(sendData,function(res){
      console.log('status',res.data.data.runstatus);
      var nowId = "";
      
      if (res.data && res.data.data2 && res.data.data2.id){
         nowId = res.data.data2.id;
      }
      // 0 不是在跑这张图，1 是，2  新用户
      var status = res.data.data.runstatus;
      if (status==0) {
          wx.showModal({
            title: '提示',
            content: '确定要重新选择图片？',
            showCancel: true,//是否显示取消按钮
            cancelText: "取消",//默认是“取消”
            cancelColor: '#ccc',//取消文字的颜色
            confirmText: "确定",//默认是“确定”
            confirmColor: '#000',//确定文字的颜色
            success: function (recc) {
              if (recc.cancel){
                //取消
                wx.navigateTo({
                  url: '/pages/runnerword/runnerword?imgId=' + nowId + "&cityId=" + cityId,//返回在跑的图片
                })
              }else{
                wx.navigateTo({
                  url: '/pages/runnerword/runnerword?imgId=' + imgId + "&cityId=" + cityId,
                })
              }
            }
          })
      } else if (status == 1){
            wx.navigateTo({
          url: '/pages/runnerword/runnerword?imgId=' + imgId + "&cityId=" + cityId,
        })
      } else if ((status == 2)){
        wx.navigateTo({
          url: '/pages/runnerword/runnerword?imgId=' + imgId + "&cityId=" + cityId,
        })
      }
    })
    
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var cityId = options.cityId;
    var self=this;
    self.setData({
      cityId: cityId,
      cityName: options.cityName,
      countryName: options.countryName
    })
    console.log('options',options);
    request.req.reqcityImages({ cityid: options.cityId},function(res){
      console.log('请求城市图片',res)
      self.setData({
        dataList:res.data.data
      })
      // var imageList=res.data.data;
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
    return {
      title: '运动酷咖',
      path: '/pages/index/index?positionId=' + true  // 当打开分享链接的时候跳转到小程序首页，并设置参数positionId
    }
  }
})