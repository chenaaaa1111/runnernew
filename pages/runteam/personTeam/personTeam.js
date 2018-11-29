// pages/runteam/personTeam/personTeam.js
import {
  req
} from "./../../../utils/request.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isadmin: true,
    placeholder: "",
    team: {},
  },
  //下载二维码
  goPropaganda(){
    wx.navigateTo({
      url: './../../../propaganda/propaganda'
    })
  },
  //跳转页面修改跑团信息
  infoChange(){
    wx.navigateTo({
      url: './../../runteam/createTeam/createTeam?teamid=' + this.data.team.id + "&isChange=true&name=" + this.data.team.name + "&intro=" + this.data.team.intro + "&slogan=" + this.data.team.slogan + "&logo" + this.data.team.logo + "&isCheck=" + this.data.team.checkstatus,
    })
  }, 
  //跳转团员管理页面
  goManageTeam: function() {
    console.log("跳转团员管理页面",this.data.team)
    wx.navigateTo({
      url: './../../manageTeam/manageTeam?teamid=' + this.data.team.id + "&uid=" + this.data.team.uid,
    })
  },
  //修改团内公告——待接口
  addNotice: function(event) {
    var value = event.detail.value;
    req.updateteam({
      id: this.data.team.id,
      notice: value
    }, res => {
      console.log("更新公告", res,event)
      if (res.data.data.notice === value) {
        wx.showToast({
          title: '更新跑团公告成功！',
          'icon': 'none',
          duration: 2000
        });
      } else{
        wx.showToast({
          title: '更新跑团公告失败！',
          'icon': 'none',
          duration: 2000
        });
      }
    })
  },
  //退出跑团
  outTeam: function() {
    var that = this;
    req.outTeam({
      teamid: this.data.team.id,
      uid: this.data.team.uid + ""
    }, function(res) {
      console.log("退出跑团", res, JSON.stringify(that.data.team.uid))
      if (res.data.data) {
        wx.showToast({
          title: '退出跑团成功！',
          'icon': 'none',
          duration: 2000
        });
        setTimeout(()=>{
          wx.reLaunch({
            url: './../../runteam/runteam',
          })
        },2000);
        return;
      }
      wx.showToast({
        title: '退出跑团失败！',
        'icon': 'none',
        duration: 2000
      });
    });
  },
  //goRunRank
  goRunRank: function() {
    wx.navigateTo({
      url: './../../runRank/runRank?teamid=' + this.data.team.id,
    })
  },
  //goRunList
  goRunList: function() {
    wx.navigateTo({
      url: './../../runList/runList?teamid=' + this.data.team.id,
    })
  },
  previewImage: function() {
    wx.previewImage({
      current: this.data.team.wx, // 当前显示图片的http链接
      urls: [this.data.team.wx] // 需要预览的图片http链接列表
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    req.teamstatus({}, res => {
      console.log("个人跑团首页", res)
      if (res.data.data2.teamstatus === "1") {
        var userData = res.data.data;
        this.setData({
          team: userData,
          isadmin: userData.islead === 1,
          ["team.uid"]: res.data.data2.uid
        });
        if (userData.notice === "null" || !userData.notice) {
          this.setData({
            ["team.notice"]: "",
            ["team.placeholder"]: this.data.isadmin ? "身为团长，对你的团员说点什么吧！" : "暂无公告。"
          })
        }
        console.log(this.data.team)
      } else {
        wx.reLaunch({
          url: './../../runteam/runteam',
        })
      }
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})