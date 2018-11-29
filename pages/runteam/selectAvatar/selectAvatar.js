import WeCropper from '../../../lib/we-cropper/we-cropper.js'

const device = wx.getSystemInfoSync();
const width = device.windowWidth;
const height = device.windowHeight - 50;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    teamid: "",
    cropperOpt: {
      id: 'cropper',
      width,
      height,
      tranlateX: width / 2, //定义canvas 的原点
      tranlateY: height / 2, //定义canvas 的原点
      scale: 2.5,
      zoom: 8,
      cut: {
        x: 0, // 裁剪框的坐标
        y: -(height - width) / 2, // 裁剪框的坐标
        width: width, //裁剪框的大小
        height: width
      }
    }
  },
  touchStart(e) {
    this.wecropper.touchStart(e);
  },
  touchMove(e) {
    this.wecropper.touchMove(e);
  },
  touchEnd(e) {
    this.wecropper.touchEnd(e);
  },
  getCropperImage() {
    const teamid = this.data.teamid;
    this.wecropper.getCropperImage((avatar) => {
      if (avatar) {
        wx.redirectTo({
          url: `../createTeam/createTeam?avatar=${avatar}&teamid=${teamid}`
        });
      } else {
        console.log('获取图片失败，请稍后再试。');
      }
    })
  },
  //重新选择
  uploadTap() {
    var self = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      success: function(res) {
        const src = res.tempFilePaths[0];
        self.wecropper.pushOrign(src);
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const {
      cropperOpt
    } = this.data;
    this.setData({
      teamid: options.teamid,
    })
    if (options.src) {
      cropperOpt.src = options.src;
      console.log(cropperOpt.src);
      new WeCropper(cropperOpt)
        .on('ready', (ctx) => {
          console.log(`wecropper is ready for work!`)
        })
        .on('beforeImageLoad', (ctx) => {
          console.log(`before picture loaded, i can do something`)
          console.log(`current canvas context:`, ctx)
          wx.showToast({
            title: '上传中',
            icon: 'loading',
            duration: 20000
          })
        })
        .on('imageLoad', (ctx) => {
          console.log(`picture loaded`)
          console.log(`current canvas context:`, ctx)
          wx.hideToast()
        })
        .on('beforeDraw', (ctx, instance) => {
          console.log(`before canvas draw,i can do something`)
          console.log(`current canvas context:`, ctx)
        })
        .updateCanvas()
    } else {
      wx.showToast({
        title: '获取图片地址失败，请重新选择',
        icon: 'none',
        duration: 20000,
      })
    }
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