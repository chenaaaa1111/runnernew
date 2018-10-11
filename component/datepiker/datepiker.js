// component/datepiker/datepiker.js

const date = new Date()
const years = []
const months = []
const days = []

for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    datetime:String,
    date:String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    datetime:'',
    // date: '2018-10-1',
    time: '12:01',
    year:'',
    month:'',
    day:''

  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {
      this.setData({ date: this.transDate()})
     }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    Change: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        date: e.detail.value
      })
      this.triggerEvent('datechange', { changetime: e.detail.value, startdate: this.data.date});
    },
    transDate: function (mescStr) {
      var n = mescStr;
      var date = new Date();
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      return (Y + M + D)
    },
  }
})
