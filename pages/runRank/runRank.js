import {
  req
} from '../../utils/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectTabIndex: '1',
    pageNum: 1,
    teamList: [],
    teamid: ""
  },
  //goJoinTeam ——跑团详情
  goJoinTeam(event) {
    var index = event.currentTarget.dataset['idx'];
    console.log("runRank跳转跑团详情", event, this.data.teamList[index].id == this.data.teamid)
    if(this.data.teamList[0].uname){
      return;
    }
    if (this.data.teamList[index].id == this.data.teamid){
      wx.reLaunch({
        url: './../runteam/personTeam/personTeam',
      })
      return;
    }
    wx.navigateTo({
      url: './../runteam/joinTeam/joinTeam?id=' + this.data.teamList[index].id + (this.data.teamid ? "&teamid=" + this.data.teamid: ""),
    })
  },
  selectTab: function(event) {
    let selectTabIndex = event.target.dataset.index,
      self = this,
      result = [];
    if (selectTabIndex === '1') {
      req.getRankByPeople({
        pageSize: 10,
        pageNum: 1
      }, function(res) {
        console.log("跑团排行", res)
        result = res.data.data;
        self.setData({
          teamList: result
        });
      });
    } else if (selectTabIndex === '2') {
      req.getRankInTermByStep({
        teamid: this.data.teamid,
        pageSize: 10,
        pageNum: 1
      }, function(res) {
        result = res.data.data;
        console.log("团内排行", res)
        self.setData({
          teamList: result
        });
      });
    }
    this.setData({
      selectTabIndex: selectTabIndex,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let self = this, result = [];
    req.getRankByPeople({
      teamid: options.teamid,
      pageSize: 10,
      pageNum: 1
    }, function(res) {
      console.log("跑团排行", res)
      result = res.data.data;
      self.setData({
        teamList: result,
        teamid: options.teamid ? options.teamid : ""
      });
      console.log(self.data.teamList)
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  //刷新页面
  onPullDownRefresh: function() {
    var selectTabIndex = this.data.selectTabIndex,
      self = this,
      result = [];
    if (selectTabIndex === '1') {
      req.getRankByPeople({
        pageSize: 10,
        pageNum: 1
      }, function(res) {
        console.log("跑团排行", res)
        result = res.data.data;
        self.setData({
          teamList: result
        });
      });
    } else if (selectTabIndex === '2') {
      req.getRankInTermByStep({
        teamid: 1,
        pageSize: 10,
        pageNum: 1
      }, function(res) {
        result = res.data.data;
        console.log("团内排行", res)
        self.setData({
          teamList: result
        });
      });
    }
    this.setData({
      pageNum: 1
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var selectTabIndex = this.data.selectTabIndex,
      self = this,
      pagenum = this.data.pageNum;
    if (selectTabIndex === '1') {
      req.getRankByPeople({
        pageSize: 10,
        pageNum: pagenum++
      }, function(res) {
        console.log("跑团排行", res)
        res = res.data.data;
      });
    } else if (selectTabIndex === '2') {
      req.getRankInTermByStep({
        teamid: 1,
        pageSize: 10,
        pageNum: pagenum++
      }, function(res) {
        res = res.data.data;
        console.log("团内排行", res)
      });
    }
    this.data.teamList.push(...res);
    this.setData({
      pageNum: pagenum
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})