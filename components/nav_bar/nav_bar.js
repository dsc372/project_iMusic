// components/nav_bar/nav_bar.js
const app=getApp()
Component({
  options:{
    multipleSlots:true,
  },
  properties:{
    title:{
      type:String,
      value:'导航标题',
    }
  },
  data: {
    statusHeight:0,
    navHeight:0,
  },
  lifetimes:{
    attached(){
      this.setData({statusHeight:app.globalData.statusHeight,navHeight:app.globalData.navHeight})
    }
  },
  methods:{
    onLeftTap(){
      wx.navigateBack({
        delta: 1,
      })
    }
  }
})
