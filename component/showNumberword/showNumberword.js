// component/showNumber/showNumber.js
import request from "./../../utils/request.js"
Component({
  /**
   * 组件的属性列表
   */
  externalClasses: ['btNumcontens'],
  properties: {
    date: String,
    todayNum: Number,
    golNumber: Number,
    words: String,
    wordstime: String,
    name: String,
    isrunnerd: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    showNum: true,
    words: '',
    wordstime: '',
    name: '',
    date: '',
    isrunnerd: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    datechange: function (e) {
      var dateTime = e.detail.changetime;
      // var nowTime = this.transDate();
      this.setData({ wordstime: dateTime || nowTime })
      console.log('时间改变', e);
    },
    transDate: function (mescStr) {
      var n = mescStr;
      var date = new Date();
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      return (Y + M + D)
    },
    startRun: function (e) {
      this.setData({
        showNum: true
      })
      this.triggerEvent('startRun', this.data.showNum)
    },
    confirm: function (e) {
      var nowTime = this.transDate();
      console.log(e);
      var words = e.detail.value;
      var sendData = {
        words: words,
        wordstime: this.data.wordstime || nowTime,
        name: this.data.name
      }
      console.log('信息senddata', sendData);
      // request.req.reqsendMesage(sendData, function (res) {
      //   console.log('提交信息', res);
      // });
      this.triggerEvent('comit', sendData)
    },
    bdinput: function (e) {

    }
  }
})
