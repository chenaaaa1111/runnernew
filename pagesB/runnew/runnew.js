// pages/runnew/runnew.js

import request from './../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:'',
    isrunnerd:false,
    showNum:false,
     isfinish:false,
      list:[],
      totalNum:0,//图片总步数
      dashedpath:'',//虚线图背景
      path:'',//是先图背景
      runNum:0,//当前走了多少块
      imgmany:'',//图片走了多少步
      startNum:0,
       todayNum:0,
       toNum:0,
      forWhat:'',
      forwhom:"",
      golNumber:0,       //下一目标数
       date:''
  },
  transDate: function (mescStr) {
    var n = mescStr;
    var date = new Date();
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return (Y + M + D)
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
          var width = rect.width;//画布长度
          var height = rect.height;//画布高度
          var wcent = Pwidth / width;//长度缩放比例
          var hcent = Pheight/height;//宽度缩放比
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
            // ctx.drawImage(xz * Iwidth, yz * Iheight, Iwidth, Iheight);    
            ctx.drawImage(res.path, xz * Piwidth, yz * Piheight, Piwidth, Piheight, xz * Iwidth, yz * Iheight, Iwidth, Iheight);
          } 
          ctx.draw();
        }).exec();

      }
    })
  },
  startRun:function(e){
      this.setData({
        showNum:true
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  
  checkSession: function () {
    var jscode = wx.getStorageSync('jscode');
    if (!jscode) {
      wx.navigateTo({
        url: '/pages/index/index',
      })
    }
  },
  onLoad: function (options) {
    var nowTime = this.transDate();
    this.setData({
      date: nowTime
    })
    this.checkSession();
    var num = 0;
    var self = this;
    var id = decodeURIComponent(options.id);
    this.setData({ 'name': id, date: nowTime});
    request.req.requestForItem({ name: id },(res)=>{
      console.log('为谁而跑',res);
      if (res.data.data&&res.data.data.words){
          self.setData({
            words: res.data.data.words,
            date: res.data.data.wordstime
          })
    }
      self.setData({
        forWhat: res.data.data.name,
        forwhom: res.data.data.content
      })
    })
    
    request.req.requestImageRun({ smname: id }, function (res) {//获取图片信息
      console.log('获取图片请求参数', { smname: id });
      console.log('图片信息', res);
      var ImageInfor = res.data.data;
      console.log();
      var many = ImageInfor.many;
      if (many < ImageInfor.step){
      }else{
        self.setData({
          isrunnerd:true
        })
      }
      self.setData({
        dashedpath: ImageInfor.dashedpath,
        path: ImageInfor.fullpath,
        todayNum: many
      })
      var list=res.data.data;
      console.log('list',list);
      var xn=list.heng;
      var yn=list.shu;
      var totolnum=xn*yn;
      var runNum = list.step;
      var penRunNum = runNum / totolnum;//平均每块地步数
      var golNumber=0;  //下一目标
      self.setData({
        list: list,
        totalNum: runNum
      })
      console.log();
      if (options.isfinish) {
        self.setData({ isfinish: true });
        return;
      }
     //获得跑步时的步数
      request.req.requestRunnerber({
        name: id, 
        status: 2
      },function(res){
        console.log('获得开始跑步时的步数',res);
        var todayNum = res.data.data.many;
        var many = res.data.data.many;
        var num = many / penRunNum;//实际1以步数算走了多
        var imgSrc = list.fullpath;
        console.log('bushu', self.data.totalNum,many,self.data.totalNum - many);
        var golNumber =  penRunNum - (many % penRunNum) >= 0 && many < self.data.totalNum?-parseInt((penRunNum - (todayNum % penRunNum))) :0;
        self.setData({
          todayNum: todayNum,
          golNumber: golNumber,
          imgmany: many
        })
        self.dwImg(imgSrc, '.canvas', 'myCanvas', ImageInfor.heng, ImageInfor.shu, num)
      })
     var startStep='';//运动开始时侯的步数
      var dingshi = setInterval(function () {//运动数据
        request.req.requestRunnerber({ name: id, status:1},function(res){
          console.log('运动数据****',res);
         var runData=res.data.data;
          console.log(runData);
          // var todayNum = res.data.data[res.data.data.length - 1].step;//今日总步数
          var todayNum = runData.many;//今日总步数 真实    
          if (todayNum >= runData.setstep){
            self.setData({
              isrunnerd:true
            })
          }
          self.setData({
            todayNum: todayNum
          })
          var imgNumi = runData.many;
          golNumber = penRunNum - (todayNum % penRunNum) >= 0 && self.data.imgmany < self.data.totalNum?-parseInt((penRunNum - (todayNum % penRunNum))) :0;
          self.setData({ golNumber: parseInt(golNumber) })
          console.log('一共跑了步数',todayNum);
          num = imgNumi/penRunNum;//实际1以步数算走了多                       //少块取整数
          // num = num + 1; //测试
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
          if (num > totolnum+1) {
            clearInterval(dingshi)
          }
          var imgSrc = list.fullpath;
          self.dwImg(imgSrc, '.canvas', 'myCanvas', ImageInfor.heng, ImageInfor.shu, num)
          console.log('todayNum',todayNum);
        })
      }, 10000)
       self.setData({
         dingshi: dingshi
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
    var dingshi=this.data.dingshi;
    if(dingshi){
      clearInterval(dingshi)

    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    var dingshi = this.data.dingshi;
    if (dingshi) {
      clearInterval(dingshi)

    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var dingshi = this.data.dingshi;
    if (dingshi) {
      clearInterval(dingshi)

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
    let positionId = this.data.positionId;
    console.log('positionId',this.data.positionId)
    return {
      title: '运动酷咖',
      path: '/pages/index/index?positionId='+true  // 当打开分享链接的时候跳转到小程序首页，并设置参数positionId
    }

  }
})