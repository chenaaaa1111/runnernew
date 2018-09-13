// pages/runnew/runnew.js

import request from './../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      list:[],
      runNum:0,//当前走了多少块
      startNum:0,
       todayNum:0,
       toNum:0
  },
  dwImg: function (imgsrc, ctClass, ctId,xn,yn,num) {
    var self=this;
    wx.getImageInfo({
      src: imgsrc,
      success: function (res) {
        var ctx = wx.createCanvasContext(ctId);
        var query = wx.createSelectorQuery();
        var Pwidth=res.width;//图片宽度
        var Pheight=res.height;//图片高度
        var Piwidth = Pwidth / xn;//每段图片长度
        var Piheight = Pheight/yn;//每段图片高度
        query.select(ctClass).boundingClientRect(function (rect)         {
          console.log('rect**', rect);
          console.log(rect.width)
          var width = rect.width;//画布长度
          var height = rect.height;//画布高度
          var wcent = Pwidth / width;//长度缩放比例
          var hcent = Pheight/height;//宽度缩放比
          console.log('ctxssss');
          console.log(rect.width)
          var width = rect.width;
          var height = rect.height;
          var Iwidth = (rect.width) / xn;//每段图片的长度
          var Iheight = (rect.height) / yn;//每段图片的高度    
          // var xzim = parseInt((num-1)/yn)*Iwidth;//x 轴坐标
          // var yzim = parseInt((num - 1)%xn) * Iheight;//y轴坐标
          var xzim = parseInt((num - 1) % xn) * Iwidth;//x 轴坐标
          var yzim = parseInt((num - 1) / yn) * Iheight;;//y轴坐标
          self.setData({
            cwdt: rect.width,
            cht: rect.height
          })
          for (var y = 1; y <= num; y++) {
            var yz = parseInt((y - 1) / xn);
            var xz = parseInt((y - 1) % xn);
            console.log('yz', yz);
            // ctx.drawImage(xz * Iwidth, yz * Iheight, Iwidth, Iheight);    
            ctx.drawImage(res.path, xz * Piwidth, yz * Piheight, Piwidth, Piheight, xz * Iwidth, yz * Iheight, Iwidth, Iheight);
          } 
          ctx.draw();
        }).exec();

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var num = 0;
    var self = this;
    request.req.requestImageRun({ smname: options.id }, function (res) {//获取图片信息
      console.log('图片信息', res.data.data);
      var list=res.data.data;
      var xn=list.heng;
      var yn=list.shu;
      var totolnum=xn*yn;
      var runNum = list.step;
      var penRunNum = runNum / totolnum;//平均每块地步数
      self.setData({
        list: list
      })
     var startStep='';//运动开始时侯的步数
      var dingshi = setInterval(function () {//运动数据
        request.req.requestRunnerber(function(res){
          console.log('运动数据****',res);
          var todayNum = res.data.data[res.data.data.length - 1].step;//今日总步数
          console.log('一共跑了步数',todayNum);
          num = todayNum/penRunNum;//实际1⃣以步数算走了多                       //少块取整数
          //num = num + 1; //测试
          var runNum = self.data.runNum;
          if(runNum==num){
              return;
          }else{
            self.setData({ runNum:num})

          }
    
          var toNum = (num + 1) * penRunNum - todayNum;
          self.setData({ todayNum: todayNum, toNum: toNum })
          var startNum = self.data.startNum;
          var step = parseInt((todayNum - startNum) / penRunNum)
          if (num > totolnum) {
            clearInterval(dingshi)
          }
          var imgSrc = list.path;
          self.dwImg(imgSrc, '.canvas', 'myCanvas',3, 5, num)
          // console.log(res.data.data[res.data.data.length - 1]);
       
          // if ((step)>0){
          //   num=num+step;
          // }
          console.log('todayNum',todayNum);

        })
     


      }, 2000)

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