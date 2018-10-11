// pages/runnew/runned/runned.js

import request from './../../../utils/request.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    words:'',
    id:'',
    isrunnerd:true,
    date:'2018-10-01',
    name:'name',
    todayNum:0,
    totolNum:0,//图片规定步数
    imgNum:0,//在图片上完成步数
    nextnum:0,
    getmisData:'',
    path:'',
    opacity:0,
    todyNum:0,//总步数
    content: '',
    name: 'name'
  },
  changeTime:function(e){
      //提交
      
  },
  comit:function(e){
    console.log('缅怀添加留言');
      console.log(e);
      var sendData={};
    sendData.words = e.detail.words;
    sendData.wordstime = e.detail.wordstime;
    sendData.missid = e.detail.name;
    this.setData({ sendData: sendData});
    //发送请求
    request.req.reqsendmissMessage(sendData,function(res){
      console.log('缅怀添加留言');
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self=this;
    var id=options.id;
    var path = options.path;
    var content = options.content;
    var words=options.words;
    var wordstime = options.wordstime;
    if (wordstime){
        this.setData({
          words: words,
          date: wordstime
        })
    }
    var name=options.name;
    this.setData({name: name,content:content});
    this.setData({path:path,id:id})
    var sendData={
      id: id,
      status:2
    }
    request.req.reqmisRunStep(sendData,function(res){
      console.log('获取步数',res);
      var runInfor=res.data.data;
      var imgnum = runInfor.many;
      var totolnum = runInfor.setstep;
      console.log(',', imgnum, totolnum);
      if (imgnum >= totolnum){
          self.setData({
            isrunnerd:true
          })
      }
    })

    var getmisData=setInterval(function(){
      var sendData = {
        id: id,
        status: 1
      }
      request.req.reqmisRunStep(sendData, function (res) {
        var todyNum = res.data.data.startstep;
        var totolNum = res.data.data.setstep;
        var many = res.data.data.many;
        var per = many / totolNum;
        if (many >= totolNum){
          self.setData({ isrunnerd: true })

        }
        var stepNum = res.data.data.setstep;
        self.setData({ opacity: per})
        console.log('获取步数', stepNum);
        self.setData({
          totolNum: totolNum, 
          imgNum:many,
          todyNum: todyNum,
          nextnum: stepNum-many})
      })
    },5000)
    this.setData({
      getmisData: getmisData
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
    clearInterval(this.data.getmisData);
    console.log('onUnload')
    this.setData({
      getmisData: ''
    })
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