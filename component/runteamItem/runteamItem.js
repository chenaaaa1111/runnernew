// component/runteamItem/runteamItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: Object,
  },

  /**
   * 组件的初始数据
   */
  data: {
    data: {
      id: 0,
      name: "name",
      slogan: "slogan",
      logo: "./../../images/runteam/homepage/图一@2x.png",
      step: "step",
      people: "people",
    }
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function() {

    }
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})