// pages/main_music/main_music.js
import { reqMusicBanner, reqRecommandList ,reqSongMenuList,reqRankings} from "../../services/music"
import {createStoreBindings}from 'mobx-miniprogram-bindings'
import {store} from '../../store/store'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: '',
    bannerList: [],
    bannerHeight: 0,
    hotMenuList:[],
    recommandMenuList:[],
    recommandSongList:[],
    rankingsShow:false,
  },

  onLoad() {
    this.getMusicBanner()
    this.getRecommand(3778678)
    this.storeBindings=createStoreBindings(this,{
      store,
      fields:['rankings','currentSongIndex','currentSongList','isPlay'],
      actions:['updateRecommandSongs','updateRankings','updateCurrentSongList','updateCurrentSongIndex','updateIsPlay']
    })
    this.getHotMenuList()
    this.getRecommandMenuList()
    this.getRankingLists()
  },

  onUnload() {
    this.storeBindings.destroyStoreBindings()
  },

  onBannerImageLoad(event) {
    if (this.data.bannerHeight === 0) {//节流
      let scale = event.detail.height / event.detail.width
      this.setData({ bannerHeight: scale * 700 })
    }
  },

  onSearchClick() {
    wx.navigateTo({
      url: '/pages/detail_search/detail_search',
    })
  },

  onRecommandMoreClick() {
    wx.navigateTo({
      url: '/pages/more_music/more_music?type=recommand',
    })
  },

  onMenuMoreClick(){
    wx.navigateTo({
      url: '/pages/more_menu/more_menu',
    })
  },

  onRecommandSongItemTap(event){
    this.updateCurrentSongList('recommand',[])
    this.updateCurrentSongIndex(event.target.dataset.index)
  },

  onPlayOrPause() {
    this.updateIsPlay(!store.isPlay)
  },

  onPlayBarTap(){
    wx.navigateTo({
      url: `/packagePlayer/pages/music_player/music_player?id=${store.currentSongList[store.currentSongIndex].id}`,
    })
  },

  async getMusicBanner() {
    let res = await reqMusicBanner()
    if (res.code === 200) {
      this.setData({ bannerList: res.banners })
    } else {
      console.log('加载bannerList失败')
    }
  },

  async getRecommand(id) {
    let res = await reqRecommandList(id)
    if (res.code === 200) {
      this.setData({recommandSongList:res.playlist.tracks.splice(0,6)})
      this.updateRecommandSongs([...this.data.recommandSongList,...res.playlist.tracks])
    } else {
      console.log("加载recommSongs失败")
    }
  },

  async getHotMenuList(){
    let res=await reqSongMenuList()
    if(res.code===200){
      this.setData({hotMenuList:res.playlists})
    }else{
      console.log('加载hotMenuList失败')
    }
  },

  async getRecommandMenuList(){
    let res=await reqSongMenuList('华语')
    if(res.code===200){
      this.setData({recommandMenuList:res.playlists})
    }else{
      console.log('加载recommMenuList失败')
    }
  },

  async getRankingLists(){
    const rankingsId=[3779629,2884035,19723756]
    const allPromise=[]
    for(let id of rankingsId){
      allPromise.push(reqRankings(id))
    }
    Promise.all(allPromise).then(res=>{
      this.updateRankings(res)
      this.setData({rankingsShow:true})
    },err=>{
      console.log('加载rankings失败')
    })
  },


  onTest(){
    console.log(store.currentSongList[store.currentSongIndex].al.picUrl)
  }
})
