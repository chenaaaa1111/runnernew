// pages/runnew/runnew.js

import request from './../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isrunnerd:true,
    date:'2018-10-01',
    imgPath: "http://47.101.136.23:8080/sport/image/cityimg/beijingniaochao.jpg",
    opacity:0.2,
    isfinish: false,
    InterGetRun:'',
    imgId:"",
    list: [],
    totalNum: 0,//图片总步数
    dashedpath: '',//虚线图背景
    path: '',//是先图背景
    runNum: 0,//当前走了多少块
    imgmany: '',//图片走了多少步
    startNum: 0,
    todayNum: 0,
    toNum: 0,
    forWhat: '',
    forwhom: "",
    golNumber: 0        //下一目标数
  },
   addImage:function(sendData,callback){
     request.req.reqaddwordimage(sendData,function(res){
       if (callback){
         callback(res);
       }
     })
   },
   getRunNum:function(sendData,callBack){
        wx.getWeRunData({
          success:function(res){
            console.log('微信运动信息',res);
            sendData.data = res.encryptedData;
            sendData.iv=res.iv;
            request.req.reqwordstep(sendData,function(res){
              if(callBack){
                callBack(res);
              }
            })
          }
        })
   },
  comit:function(e){
    console.log('世界添加留言');
    console.log(e);
    var sendData = {};
    sendData.words = e.detail.words;
    sendData.wordstime = e.detail.wordstime;
    sendData.cityimgid = this.data.imgId;
    this.setData({ sendData: sendData });
    //发送请求
    request.req.reqsendwordMessage(sendData, function (res) {
      console.log('世界添加留言');
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log("options",options);
      var self=this;
      //添加要跑的图片
    var sendData={};
    if (options.imgId){
      sendData = { cityimgid: options.imgId };
      self.setData({
        imgId: options.imgId
      })
    }
     
    this.addImage(sendData,function(res){
        console.log("添加图片");
        var imgPath=res.data.data.path;
        self.setData({
          imgPath: imgPath
        })

    })

    var sendData = { status: 2, cityimgid: options.imgId}
    this.getRunNum(sendData,function(res){
          console.log("获取步数");
          if(res.data&&res.data.data){
            var stepInfor=res.data.data;
            var many = stepInfor.many;//跑步步数
            var totolImgNum = stepInfor.setstep;//规定步数
            if (many >= totolImgNum){
                self.setData({
                  isrunnerd:true
                })
            }
            var golnum = ((totolImgNum - many) >= 0) ? -(totolImgNum - many):0;
            var opacity =0.2+ Math.abs(many / totolImgNum) ;
            self.setData({
              golNumber: golnum,
              imgmany: many,
              opacity: opacity
            })

          }
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
    var self=this;
    var dingshi = this.data.InterGetRun;
    if (InterGetRun) {
      clearInterval(InterGetRun)

    }
    var InterGetRun = setInterval(function(){
      if (self &&self.data&&self.data.imgId){
        var sendData = { status: 1, cityimgid: self.data.imgId}
        self.getRunNum(sendData, function (res) {
          console.log("获取步数");
          if (res.data && res.data.data) {
            var stepInfor = res.data.data;
            var many = stepInfor.many;//跑步步数
            var totolImgNum = stepInfor.setstep;//规定步数
            var golnum = ((totolImgNum - many) >= 0) ? -(totolImgNum - many) : 0;
            var opacity =0.2+ Math.abs(many / totolImgNum);
            if (many >= totolImgNum && !self.data.isrunnerd) {
              self.setData({
                isrunnerd: true
              })
            }
            self.setData({
              golNumber: golnum,
              imgmany: many,
              opacity: opacity
            })

          }
        })
      }
    },10000);
    this.setData({ InterGetRun: InterGetRun})
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    var InterGetRun = this.data.InterGetRun;
    if (InterGetRun) {
      clearInterval(InterGetRun)

    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var InterGetRun = this.data.InterGetRun;
    if (InterGetRun) {
      clearInterval(InterGetRun)

    }
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