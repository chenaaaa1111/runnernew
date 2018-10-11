
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cityLis:Array
 
  },

  /**
   * 组件的初始数据
   */
  data: {
    activeId:0,
    countryName:'',
    cityName:''

  },

  /**
   * 组件的方法列表
   */
  methods: {
    gotocities:function(e){
      console.log(e)
      var cityId = e.currentTarget.id;
      var countryName = e.currentTarget.dataset.coutryname;
      var cityName = e.currentTarget.dataset.cityname;
      this.setData({
        activeId: cityId,
        cityName: cityName,
        countryName: countryName
      })

      // wx.navigateTo({
      //   url: '/pages/cityImages/cityImages?cityId=' + cityId,
      // })
      this.triggerEvent('chooseCity', {
        cityId: cityId,
         cityName: cityName,
        countryName: countryName}) 
      console.log(e.currentTarget.id)
    }
  }
})
