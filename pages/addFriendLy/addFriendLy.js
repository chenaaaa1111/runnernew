
import request from './../../utils/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
      upImgFiles:[],
      comment:'',
      textValue:'',
      masterid: ''
  },
  addComment:function(e){
    console.log(e);
    var _this=this;
    var files = _this.data.upImgFiles;
    console.log('哈哈',files, _this.data.textValue);
    if (files == 'undefined'||files.length<=0){
        wx.showToast({
          title: '请选择图片',
          'icon':'none'
        })
        return;

    }
    if (!_this.data.textValue){
      wx.showToast({
        title: '请填写内容',
        'icon': 'none'
      })
      return;
    }
    for(var ins in files){
      var filepath = files[ins];
      console.log('path',files[ins])
      filepath = filepath.substring(filepath.lastIndexOf('.') + 1, filepath.length)
      if (filepath != 'jpg' && filepath != 'gif' && filepath != 'png'){
        wx.showToast({
          title: '上传格式不正确',
          icon: 'none',
          duration: 2000
        });
        return;
      }
       
    }
    request.req.addmaster({ mastername: _this.data.textValue},function(res){
        console.log('发表动态成功',res);
     
      var masterid = res.data.data.masterid;
      _this.setData({
        masterid: masterid
      })
      for (var fileindex in files) {
        _this.upImages(files[fileindex], masterid);
      }
    
    })
  
  },
  upImages: function (file, masterid){
      wx.uploadFile({
        url: 'https://ishzi.cn/sport/master/uploadmasterimg',
        filePath: file,
        header: { 'Cookie': "JSESSIONID=" + wx.getStorageSync('sessionId') },
        name: 'imgFile',
        formData: { masterid: masterid, token: wx.getStorageSync('token')},
        success:function(res){
          wx.navigateBack({

          })
        }

      })
  },
  textinput:function(e){
      console.log('eee',e);
    var value = e.detail.value;
    this.setData({ textValue: value})
  },
  upImg:function(e){
    console.log(e);
    var self=this;
    wx.chooseImage({
      success: function(res) {//选择图片
         console.log('图片',res);
        var files = res.tempFilePaths;
        for (var fileindex in files){
         var  filepath = files[fileindex];
          filepath = filepath.substring(filepath.lastIndexOf('.') + 1, filepath.length)
          if (filepath != 'jpg' && filepath != 'gif' && filepath != 'png') {
            wx.showToast({
              title: '上传格式不正确',
              'icon': 'none',
              duration: 2000
            });
            return;
          }
         }
        self.setData({
          upImgFiles: res.tempFilePaths
        })
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