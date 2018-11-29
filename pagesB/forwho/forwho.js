// pages/forwho/forwho.js
import { req } from './../../utils/request.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooseItem: [{ text: '事业', bg: './../images/forwho/1@2x.png' }, { text: '朋友', bg: './../images/forwho/2@2x.png' }, { text: '健康', bg: './../images/forwho/3@2x.png' }, { text: '无所事事', bg: './../images/forwho/4@2x.png' }, { text: '未来', bg: './../images/forwho/5@2x.png' }, { text: '明天', bg: './../images/forwho/6@2x.png' }, { text: '没压力', bg: './../images/forwho/7@2x.png' }, { text: '工作', bg: './../images/forwho/8@2x.png' }, { text: '幸福', bg: './../images/forwho/9@2x.png' }, { text: '家人', bg: './../images/forwho/10@2x.png' }, { text: '爱情', bg: './../images/forwho/11@2x.png' }, { text: '自定义', bg: './../images/forwho/12@2x.png' }],
    itemmages: ['./../images/forwho/1@2x.png'],
    forwhom:'事业',
    name:'',
    forWhat: '', 
    foritem:'',
    zidingyi:false,
    forwhompld:'请输入',
    wfocus:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  chooseFom:function(e){
    console.log(e);
    var froms = e.currentTarget.dataset.form;
    this.setData({
      isselect: true
    })
    if (froms == "自定义") {
      this.setData({
        zidingyi: !this.data.zidingyi,
        wfocus:true
       
      })
    }
    this.setData({
      forwhom: froms
    })
   
  },
  getwhom:function(e){
    //    console.log(e);
    // console.log('e', e)
    var froms = e.detail.value;
    if (froms){
      this.setData({
        forwhom: froms
      })
    }
  
  },
  gotoRun:function(e){
    var self=this;
    var self = this;
    req.reqaddforwho({
      'name': '',
      'smname': self.data.name,
      'content': ''

    }, function (res) {
      console.log('forWho', res);
      wx.redirectTo({
        url: './../runnew/runnew?id=' + self.data.name,
      })
    })
  },
  addForwho:function(e){
     var self=this;
    console.log(self.data.forwhom);
    req.reqaddforwho({
      'name': self.data.forwhom||'青春',
      'smname': self.data.name,
      'content': self.data.foritem||'青春无悔'

    },function(res){
      console.log('forWho',res);
      wx.redirectTo({
        url: './../runnew/runnew?id='+self.data.name,
      })
    })
  },
  onLoad: function (options) {
       console.log('options',options);
    var id = decodeURIComponent(options.id)
    this.setData({ name: id })
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
  getItem:function(e){
      console.log('e',e)
    var val = e.detail.value;

      this.setData({
        foritem: val
      })
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