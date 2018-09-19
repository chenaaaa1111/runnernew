// pages/running/running.js

import request from './../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
        ctx :'',
        cwdt:0,//图片 canvas 长度
        cht :690, //canvas;//图片高度
        showbg:false,
        xn:5, //横向切割份数
        yn: 5, //竖向切割份数
        'yn3':'',// y轴切割份数
        'sxn': 690,  //每段的长度
         'syn': 690,  //每段的高度
         'totolNum':0,//总步数
         'nextnum':0, //下一目标
          'onhide':false,
          'forwhom':'投其所好',//为谁而跑
          'forwhat':'为爱而跑'   //为什么而跑
  },
  dwImg:function(imgsrc,ctClass,ctId){
    wx.getImageInfo({
      src: imgsrc,
      success: function (res) {
        var ctx = wx.createCanvasContext(ctId);
        var query = wx.createSelectorQuery();
        query.select(ctClass).boundingClientRect(function (rect) {
          console.log('rect**',rect);
          console.log(rect.width)
          var width = rect.width;
          var height = rect.height;
          console.log('ctxssss');
          ctx.drawImage(res.path, 0, 0, res.width, res.height, 0, 0, width, height);
          ctx.draw();
        }).exec();
   
      }
    })
  },
  drawbg:function(imgSrc){
    wx.getImageInfo({
      src: imgSrc,
      success:function(res){
        var ctx = wx.createCanvasContext('canvasbg');
        var query = wx.createSelectorQuery();
        var imgw=res.width;
        var imh=res.height;
        console.log('resbgbgbgbgbgbgbg',res);
        query.select('.bg').boundingClientRect(function (rect) {
          console.log()
            console.log(rect.width)
            var width = rect.width;
            var height = rect.height;
            console.log('ctxssss');
          ctx.drawImage(res.path, 0, 0, res.width, res.height, 0, 0, width, height);
            ctx.draw();
          }).exec();
          // ctx.drawImage(imgsrc);
      }
    })
  
  },
  getRunnumber:function(){//获取运动数据
    wx.getWeRunData({
      success(res) {
        console.log('运动数据', res.encryptedData);
       var sendData={
         data: res.encryptedData,
         iv:res.iv
       }
        request.req.requestRunnerber(sendData,function (res) {//后台揭秘
          console.log('uuud',res);

          var sendData=JSON.parse(res.data.data)
          console.log('***********************', sendData);
        })
      }
    })
 
  },
  drawImage: function (xn, yn, num, imgsrc,bgsrc, isover, ctx,swidth,sheight){
    // var xn; //横向切割份数
    // var yn; // y轴切割份数
    //num 从上到下第几份
    //imgsrc 图片地址
    var self=this;
    // console.log(ctx.style);
    //  xn=3; //横向切割份数
    //  yn=3; // y轴切割份数    
    var query = wx.createSelectorQuery();
    query.select('.canvas').boundingClientRect(function (rect) {
      console.log(rect.width)
      var width = rect.width;
      var height = rect.height;
      var Iwidth = (rect.width)/xn;//每段图片的长度
      var Iheight = (rect.height) / yn;//每段图片的高度    
      // var xzim = parseInt((num-1)/yn)*Iwidth;//x 轴坐标
      // var yzim = parseInt((num - 1)%xn) * Iheight;//y轴坐标
      var xzim = parseInt((num - 1) % xn) * Iwidth;//x 轴坐标
      var yzim = parseInt((num - 1) / yn) * Iheight;;//y轴坐标
      self.setData({
        cwdt: rect.width,
        cht: rect.height  
      })
      //
      console.log('ctxssss');
      ctx.drawImage(imgsrc, 0, 0, swidth, sheight, 0, 0, width, height);
        for(var y=1;y<=num;y++){
          var yz = parseInt((y - 1) / xn);
          var xz = parseInt((y - 1) % yn);
          console.log('yz',yz);
          ctx.clearRect(xz * Iwidth, yz * Iheight, Iwidth, Iheight);
        } 
        ctx.draw();  
        //  self.drawbg(bgsrc);//绘画背景 
        
    }).exec();
     
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中，请稍后',
    })
    var self = this;
    console.log('option', options);
    this.getRunnumber();
    // request.req.requestrunImage({},function(){
      
    // })
    var imgsrc = "";
    var bgsrc = "";

    request.req.requestImageRun({ smname: options.id},function(res){//获取图片信息
      console.log('图片信息', res.data.data);
      var datas=res.data.data;
      imgsrc = res.data.data.dashedpath;
      bgsrc = res.data.data.path;
      //
    self.dwImg(imgsrc, '.canvas', 'myCanvas');
      self.dwImg(bgsrc, '.bg', 'canvasbg');
   
      wx.hideLoading(); 
      var ctx = wx.createCanvasContext('myCanvas');
      self.setData({ ctx: wx.createCanvasContext('myCanvas') });
      self.setData({
        xn: datas.heng,yn:datas.shu
      })
      console.log(self.data.xn,self.data.yn);
      wx.getImageInfo({
        src: imgsrc,    //请求的网络图片路径
        success: function (res) {
          //请求成功后将会生成一个本地路径即res.path,然后将该路径缓存到storageKeyUrl关键字中
          var num = 0;//测试已经跑的块数
          var runNum = 200;//增加的跑步数
          var steNum=1000;//需要跑的步数
          var runNext = 0;
          var neum =500
          var runInter = setInterval(function () {
            num = num + 1;
            if (self.data.onhide) {
              clearInterval(runInter);
            }
            console.log(self.data.onhide);
            runNum = num * 500;
           
            console.log('res****', res);
            self.setData({ totolNum: self.data.totolNum + runNum })
            self.setData({nextnum: steNum - 200*num});
            if (self.data.nextnum==0){
              steNum=steNum+1000;
            }
            self.drawImage(self.data.xn, self.data.yn, num,  res.path, bgsrc, false, ctx, res.width, res.height);
            //画背景
            if (num >= 25) {
              clearInterval(runInter);
            }
          }, 5000);
        }
      })
     
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
      console.log('hide');
      this.setData({'onhide':true});
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('onUnload');
    this.setData({ 'onhide': true });
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