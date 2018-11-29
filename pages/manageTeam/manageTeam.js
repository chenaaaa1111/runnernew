// pages/manageTeam/manageTeam.js
import {
  req
} from "./../../utils/request.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    label: "最后登录", //最后登录 && 申请时间
    checkLog: "2", //1入团审核 2请离跑团
    hasApply: false, //是否有入团申请
    ischeck: false,
    teamid: "",
    pageNum: 1,
    personList: [],
    uid: "",
  },

  //选中列表项
  checkItem: function(event) {
    var index = Number(event.target.dataset.index);
    var data = "personList[" + index + "].checked";
    if (this.data.uid == this.data.personList[index].uid) {
      wx.showToast({
        title: '团长不能请离本人！',
        'icon': 'none',
        duration: 2000
      });
      return;
    }
    this.setData({
      [data]: !(this.data.personList[index].checked)
    })
  },

  //入团申请列表
  clickCheckIn(event) {
    this.checkIn();
  },
  checkIn: function(page = 1) {
    console.log("page", page)
    //更新personList
    this.setData({
      personList: []
    })
    req.applyList({
      teamid: this.data.teamid,
      pageSize: 10,
      pageNum: page
    }, res => {
      console.log("入团申请列表", res)
      if (res.data.data) {
        if (page === 1) {
          this.setData({
            personList: res.data.data
          })
        } else {
          this.data.personList.push(...res.data.data);
        }
      }
    })
    this.setData({
      ischeck: true,
      checkLog: "1",
      label: "申请时间",
      pageNum: page
    });
  },
  //审核同意入团申请
  agreCheckIn: function() {
    var uidList = [],
      personList = this.data.personList;
    for (var i = 0, len = personList.length; i < len; i++) {
      if (personList[i].checked === true) {
        uidList.push(personList[i].uid)
      }
    }
    if (uidList.length < 1) {
      return;
    }
    req.agreeinteam({
      teamid: this.data.teamid,
      uid: uidList.join(",")
    }, res => {
      console.log("同意入团申请", res)
      if (res.data.data) {
    //更新personList
        this.checkIn();
      }
    })
    this.setData({
      ischeck: true,
      checkLog: "1",
      label: "申请时间"
    });
  },
  //请离跑团列表
  checkOut: function() {
    this.setData({
      ischeck: true,
      checkLog: "2"
    });
  },
  //确认清理团员
  agreCheckOut: function() {
    var uidList = [],
      personList = this.data.personList;
    for (var i = 0, len = personList.length; i < len; i++) {
      if (personList[i].checked === true) {
        uidList.push(personList[i].uid)
      }
    }
    if (uidList.length < 1) {
      return;
    }
    req.outTeam({
      teamid: this.data.teamid,
      uid: uidList.join(",")
    }, res => {
      console.log("请离操作", res)
      if (res.data.data) {
        wx.showToast({
          title: '请离成功！',
          'icon': 'none',
          duration: 2000
        });
        //更新personList
        this.loadTeamer();
        return;
      }
      wx.showToast({
        title: '请离失败！',
        'icon': 'none',
        duration: 2000
      });
    });
  },
  //加载团内团员
  loadTeamer: function(page = 1) {
    req.userRanking({
      teamid: this.data.teamid,
      pageSize: 10,
      pageNum: page
    }, res => {
      console.log("团内排行", res)
      if (res.data.data) {
        if (page === 1) {
          this.setData({
            personList: res.data.data,
            // teamid: options.teamid
          })
        } else {
          this.data.personList.push(...res.data.data);
          this.setData({
            pageNum: page
          })
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      teamid: options.teamid,
      uid: options.uid ? options.uid: ""
    })
    this.loadTeamer();
    req.applyList({
      teamid: options.teamid,
      pageSize: 1,
      pageNum: 1
    }, (response) => {
      console.log("是否有入团申请", response.data.data.length > 0)
      if (response.data.data) {
        this.setData({
          hasApply: response.data.data.length > 0
        })
      }
    })
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
    if (this.data.checkLog === "2") {
      this.onload();
    }
    if (this.data.checkLog === "1") {
      this.checkIn();
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    pagenum = this.data.pageNum;
    pagenum++;
    if (this.data.checkLog === "2") {
      req.userRanking({
        teamid: this.data.teamid,
        pageSize: 10,
        pageNum: pagenum
      }, res => {
        if (res.data.data) {
          this.data.personList.push(...res.data.data);
          this.setData({
            pageNum: pagenum
          });
        }
      });
    } else if (this.data.checkLog === "1") {
      this.checkIn(pagenum);
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})