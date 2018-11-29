// pages/echart/echart.js
import {req} from './../../utils/request.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    url:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // req.runTeamByStep({
    //   pageSize: 10,
    //   pageNum: 1,
    // },res=>{
    //   console.log("echart地图",res)
    //   if(res.data&& res.data.data){
    //     let data = res.data.data,
    //     resData = [];
        //   runList = [],
        //   runData = [],
        //   colorList = ["green","yellow","red"];
        //   for(let i=0,len=data.length;i<len;i++){
        //     runList.push({ name: data[i].start_point, value: data[i].name + data[i].step });
        //     runData.push([{
        //       name: data[i].start_point,
        //       itemStyle: {
        //         normal: {
        //           show: true,
        //           color: colorList[i] || "blue",
        //         }
        //       },
        //     }, { name: data[i].end_point, value: data[i].name + data[i].step }])
        //   }
        // for (let i = 0, len = data.length; i < len; i++){
        //   resData.push({
        //     name: data[i].name,
        //     step: data[i].step,
        //     end_point: data[i].end_point,
        //     start_point: data[i].start_point,
        //   });
        // }
        var token = wx.getStorageSync('token');
        let url = `http://106.14.153.111:9096/sport?token=${token}`;
        this.setData({ url: url});
    //   }
    // })
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