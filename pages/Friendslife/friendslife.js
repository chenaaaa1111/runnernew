// pages/Friendslife/friendslife.js
import request from './../../utils/request.js';
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ranking:[],
    imgUrls:[1,2,3],
    autoplay:false,
    hasMore:true,
    pageNum: 1,
    interval:1000,
    duration:500,
    pageSize:'',
    runNum:0,
    friedList:[],//动态列表
    focus:false,
    comname:'',//回复人姓名
    showNummessage:-1,
    commentList:[],
    inputShow:false,
    isShowAll:false,
    placeholder:'说点什么吧～',
    value:'',
    commenId:'',
    replayData:false,
    isReplay:false,
    scrolly:true,
    changeCommentId:'',
    showcoverImage:false,
    isscroll:false,
    showImgPath:''
    
  },
  hidecoverImage:function(e){
    this.setData({
      showImgPath:'', showcoverImage: false, scrolly: true
    })
  },
  loadMore:function(e){
    wx.showLoading({
      title: '加载中'
    })
    var sendData = { pageNum:this.data.pageNum+1, pageSize: 10 };
    var self = this;
    var height_01 = wx.getSystemInfoSync().windowHeight;
    app.globalData.height_01 = height_01;
    if(this.data.hasMore){
      request.req.requestFriedLife(sendData, function (res) {
        console.log('查询动态', res.data.data);//查询朋友圈
        wx.hideLoading();
        if (res.data && res.data.data && res.data.data.length >= 0) {
          var friedList = self.data.friedList.concat(res.data.data);
          console.log('friedList', friedList)
          wx.setStorageSync('commentList', friedList);
          self.setData({
            friedList: friedList,
            commentList: friedList,
            pageNum: self.data.pageNum + 1
          })
        } else {
          wx.showToast({
            title: '已没有更多动态',
            'icon': 'none',

          })
          self.setData({
            hasMore: false,
          })
        }
      });
    }else{
      wx.showToast({
        title: '已没有更多动态',
        'icon': 'none',

      })
    }
  
  },
  showImage:function(e){
    var src = e.currentTarget.dataset.src;
    console.log(e.currentTarget)
    var id=e.currentTarget.dataset.id;
    var friendList = wx.getStorageSync('commentList');
    console.log('friendLy', friendList)
    var _this=this;
    friendList.forEach((val,key)=>{
      if(val.id==id){
        console.log(val.imglist)
        _this.setData({
          imgUrls: val.imglist
        })
      }
    })
    this.setData({
      showImgPath: src, showcoverImage: true, scrolly:false
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  //监听input获得焦点

  bindfocus: function (e) {
    let that = this;

    let height = 0;

    let height_02 = 0;

    wx.getSystemInfo({
      success: function (res) {
        height_02 = res.windowHeight;
        console.log('syncheight', e.detail.height, app.globalData.height_01, height_02);
      }
    })
    console.log('height', e.detail.height, app.globalData.height_01, height_02);

    height = e.detail.height - (app.globalData.height_01 - height_02);



    that.setData({

      height: height,

    })

  },

  //监听input失去焦点

  bindblur: function (e) {

    this.setData({

      height: 0,

      inputShow: false,

    });



  },

  onLoad: function (options) {
    var sendData = { pageNum:1,pageSize:10};
    var self=this;
   
    //查询排行榜
    var sendDa={
      
    }
    request.req.reqfranking(sendDa, function (res) {   
      console.log('查询排行榜',res.data.data);//查询排行榜
      var lists = res.data.data;
      self.setData({
        ranking: lists
      })
    });
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
    wx.showLoading({
      title: '加载中',
    })
    var sendData = { pageNum: 1, pageSize: 10 };
    var self = this;
    var height_01 = wx.getSystemInfoSync().windowHeight;
    app.globalData.height_01 = height_01;
   
    request.req.requestFriedLife(sendData, function (res) {
      console.log('查询动态', res.data.data);//查询朋友圈
      var commentList = res.data.data;
      wx.setStorageSync('commentList', commentList);
      wx.hideLoading();
      self.setData({
        friedList: res.data.data,
        commentList: commentList
      })

    });
  },
  replay:function(e){
      console.log('回复',e.currentTarget);
    var dataset=e.currentTarget.dataset;
    var comname = dataset.comuname;//被回复人name；
    console.log('********comname', comname);
    this.setData({ placeholder:'回复'+comname+":"})
    var manId=dataset.manid;//被回复者id
    var masterid = dataset.masterid;//评论id
    console.log('masterId', masterid)
  var sendData={replyContent:'酸酸',	
                replyuid: manId,	
                replyuname: comname,	
                masterid: masterid,
                 commentid: e.currentTarget.id	
                }
    this.setData({ replayData: sendData, isReplay: true, inputShow: true, commenId: masterid, comname: comname});
 
  },
  commentInput:function(e){
      console.log('comment',e);
  },
  changeShowAll:function(e){
    console.log('显示全部');
    this.setData({ isShowAll:true});
  },
  commitConfirm:function(e){
    var self=this;
    console.log('添加评论', e.detail.value);
    var userInfor = app.globalData.userInfo;
    var userName = userInfor.nickName;
    console.log('userInfor', userInfor);
    if(!this.data.isReplay){//添加评论
      request.req.addComment({
        content: e.detail.value,
        masterid: this.data.commenId
      }, function (res) {
        var comment = res.data.data;
        var comment = res.data.data2;
        var commentList = wx.getStorageSync('commentList');
        commentList.forEach(function (val, key) {
          console.log(val, key);
          if (val.id == self.data.commenId) {
            console.log("改变前", self.data.commentlist);
            commentList[key].commentlist = comment;
            self.setData({ friedList: commentList, showNummessage: -1 })
            console.log("改变后", self.data.commentlist);
            return;
          }
        })
        console.log(res);
      })
    }else{//回复
      var replayData=this.data.replayData;
      replayData.replyContent = e.detail.value;
      request.req.replay(replayData,function(res){
        console.log(res);
        var comment = res.data.data2;
        var commentList = wx.getStorageSync('commentList');
        commentList.forEach(function (val, key) {
          console.log(val, key);
          if (val.id == self.data.commenId) {
            console.log("改变前", self.data.commentlist);
            commentList[key].commentlist = comment;
            self.setData({ friedList: commentList, showNummessage: -1, isReplay:false })
            console.log("改变后", self.data.commentlist);
            return;
          }
        })
        console.log(res);
      })
    }
    
  },
  addMessage:function(e){
    console.log('添加评论', e);
    var id = e.currentTarget.dataset.id;
    console.log('pinglunId', e.currentTarget.dataset.id);
    var commenId=id;//评论的动态id
   
    this.setData({
      focus: true, inputShow: true, commenId: commenId, placeholder:"说点什么吧～"
    });

  },
  addComment:function(e){
    console.log('显示评论',e);
    
  },
  editFriend:function(e){
    console.log('添加朋友圈')
    console.log(e);
  },
  addzan:function(e){
    console.log(e);
    var id = e.currentTarget.dataset.id;
     var self=this;

    request.req.addlikenum({
      masterid: id
    }, function (res) {
      self.setData({
        showNummessage:'-1',

      })
      var friendList = wx.getStorageSync('commentList');
      friendList.forEach((val,key)=>{
        console.log(val.id+":"+key);
        if (val.id == id){
          val.likenum = res.data.data.likenum;
          val.islike = res.data.data.islike;
          self.setData({
              friedList: friendList
            });
          wx.setStorageSync("commentList", friendList)
          return;          
        }
       
      })
    })
  },
  scrollfriend:function(e){
    // if (this.data.focus){
      this.setData({
        focus: false
      })
    // }
  
  },
  showMeage:function(e){
    var showNummessage = e.currentTarget.id;
    if (this.data.showNummessage == showNummessage){
      this.setData({
        showNummessage: -1
      })
    }else{
      this.setData({
        showNummessage: showNummessage
      })
    }
   
  },
  inputclick:function(e){

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