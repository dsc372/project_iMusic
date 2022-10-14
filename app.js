// app.js
App({
  globalData:{
    statusHeight:0,
    navHeight:44,
    contentHeight:0,
    screenHeight:0,
  },
  onLaunch(){
    wx.getSystemInfo({
      success: (result) => {
        this.globalData.statusHeight=result.statusBarHeight
        this.globalData.contentHeight=result.screenHeight-result.statusBarHeight-this.globalData.navHeight
        this.globalData.screenHeight=result.screenHeight
      },
    })
  }
})
