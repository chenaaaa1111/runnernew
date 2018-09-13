// component/swiper.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    swiperList:Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgUrls: [
      '../../images/bannera.png',
      './../../images/bannerb.png'
    ],
    indicatorDots: false,
    indicatorDots:true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeIndicatorDots: function (e) {
      this.setData({
        indicatorDots: !this.data.indicatorDots
      })
    },
    changeAutoplay: function (e) {
      this.setData({
        autoplay: !this.data.autoplay
      })
    },
    intervalChange: function (e) {
      this.setData({
        interval: e.detail.value
      })
    },
    durationChange: function (e) {
      this.setData({
        duration: e.detail.value
      })
    }
  }
})
