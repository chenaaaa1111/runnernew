import {
  req
} from '../../utils/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectTabIndex: '1',
    isTabList: true,
    isSearch: false,
    teamid: "",
    pageNum: 1,
    teamList: [],
    searchVlaue: "",
  },
  //goJoinTeam ——跑团详情
  goJoinTeam(event) {
    var index = event.target.dataset['index'];
    if (this.data.teamList[index].id == this.data.teamid) {
      wx.reLaunch({
        url: './../runteam/personTeam/personTeam',
      })
      return;
    }
    wx.navigateTo({
      url: './../runteam/joinTeam/joinTeam?id=' + this.data.teamList[index].id + (this.data.teamid ? "&teamid=" + this.data.teamid : ""),
    })
  },
  checkSearch(event) {
    // this.data.searchVlaue = event.detail.value;
    this.setData({
      isSearch: true
    })
  },
  unSearch(event) {
    var selectTabIndex = this.data.selectTabIndex;
    this.data.searchVlaue = event.detail.value;
    this.setData({
      isSearch: false
    })
    if (this.data.searchVlaue){
      return;
    }
    if (selectTabIndex === '1') {
      req.getRankByPeople({
        pageSize: 10,
        pageNum: 1
      }, (res) => {
        this.setData({
          teamList: res.data.data
        });
      });
    } else if (selectTabIndex === '2') {
      req.getRankByStep({
        pageSize: 10,
        pageNum: 1
      },  (res) => {
        this.setData({
          teamList: res.data.data
        });
      });
    }
  },
  selectTab(event) {
    let selectTabIndex = event.target.dataset.index,
      self = this;
    if (selectTabIndex === '1') {
      req.getRankByPeople({
        pageSize: 10,
        pageNum: 1
      }, function(res) {
        console.log("人数", res)
        res = res.data.data;
        self.setData({
          teamList: res
        });
      });
    } else if (selectTabIndex === '2') {
      req.getRankByStep({
        pageSize: 10,
        pageNum: 1
      }, function(res) {
        console.log("步数", res)
        res = res.data.data;
        self.setData({
          teamList: res
        });
      });
    }
    this.setData({
      selectTabIndex: selectTabIndex
    });
  },
  //搜索
  searchClub(event) {
    this.setData({
      isTabList: false,
      isSearch: false
    });
    let self = this;
    console.log("搜索内容", event, this.data.searchVlaue);
    req.getClubByName({
      teamname: this.data.searchVlaue
    }, function(res) {
      console.log("搜索结果", res)
      res = res.data.data;
      self.setData({
        teamList: res
      });
    });
  },
  resetTabList(event) {
    if (!event.detail.value) {
      this.setData({
        isTabList: true
      });
    }
    this.data.searchVlaue = event.detail.value;
  },
  getNextTeamList(event) {
    console.log();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let self = this;
    req.getRankByPeople({
      pageSize: 10,
      pageNum: 1
    }, function(res) {
      console.log("跑团列表初始化", res)
      res = res.data.data;
      self.setData({
        teamList: res,
        teamid: options.teamid ? options.teamid : ""
      });
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
  onPullDownRefresh: function() {
    let self = this,
      selectTabIndex = this.data.selectTabIndex;
    if (selectTabIndex === '1') {
      req.getRankByPeople({
        pageSize: 10,
        pageNum: 1
      }, function(res) {
        console.log("人数", res)
        res = res.data.data;
        self.setData({
          teamList: res
        });
      });
    } else if (selectTabIndex === '2') {
      req.getRankByStep({
        pageSize: 10,
        pageNum: 1
      }, function(res) {
        console.log("步数", res)
        res = res.data.data;
        self.setData({
          teamList: res
        });
      });
    }
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let self = this,
      selectTabIndex = this.data.selectTabIndex,
      pagenum = this.data.pageNum;
    pagenum++;
    if (selectTabIndex === '1') {
      req.getRankByPeople({
        pageSize: 10,
        pageNum: pagenum
      }, function(res) {
        console.log("人数", res)
        res = res.data.data;
        self.setData({
          teamList: res
        });
      });
    } else if (selectTabIndex === '2') {
      req.getRankByStep({
        pageSize: 10,
        pageNum: pagenum
      }, function(res) {
        console.log("步数", res)
        res = res.data.data;
        self.setData({
          teamList: res
        });
      });
    }
    this.setData({
      pageNum: pagenum
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})