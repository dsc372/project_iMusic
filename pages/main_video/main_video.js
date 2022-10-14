// pages/main_video/main_video.js
import { reqVideoList } from "../../services/video"

Page({
  data: {
    limit: 20,
    offset: 0,
    hasMore: true,
    videoList: []
  },
  onLoad() {
    this.getVideoList(this.data.limit, this.data.offset)
  },
  async onPullDownRefresh(){
    this.data.videoList=[]
    this.data.offset=0
    this.data.hasMore=true
    await this.getVideoList(this.data.limit, this.data.offset)
    wx.stopPullDownRefresh()
  },
  onReachBottom() {
    if (this.data.hasMore) {
      this.getVideoList(this.data.limit, this.data.offset)
    } else {
      wx.showToast({
        title: '已经到底啦',
        icon: 'success',
        duration: 1000
      })
    }
  },
  async getVideoList(limit, offset) {
    const res = await reqVideoList(limit, offset)
    if (res.code === 200) {
      const tempVideoList = [...this.data.videoList, ...res.data]
      this.setData({ videoList: tempVideoList })
      this.data.offset = this.data.videoList.length
      this.data.hasMore = res.hasMore
    } else {
      console.log('videoList加载失败')
    }
  },

  onVideoItemTap(event){
    const video=event.target.dataset.video
    wx.navigateTo({
      url:`/packageVideo/pages/detail_video/detail_video?id=${video.id}`
    })
  }
})