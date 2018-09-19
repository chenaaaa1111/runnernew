// pages/cherish/cherish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      hasUpload:false,
      beforeUp:true,
      imSrc:'',
      isShowfill:true
  },
  chooseImageTap:function(res){
    var self=this;
      wx.chooseImage({
        success: function(res) {
            console.log(res);
          var tempFilePaths=res.tempFilePaths;
          var imSrc = tempFilePaths[0];
          self.setData({
            imSrc: imSrc,
            isShowfill:true
          });
      //     wx.uploadFile({
      //       url: 'http://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
      //       filePath: tempFilePaths[0],
      //       name: "file",
      //       formData: {
      //         "user": "test"
      //       },
      // success: function (res) {
      //         var data = res.data
      //         //do something
      //       }
      //     })

        },
      })
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  goRun:function(e){
      this.setData({
        beforeUp:false
      })
  },
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