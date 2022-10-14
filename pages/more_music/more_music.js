// pages/more_music/more_music.js
import {createStoreBindings}from 'mobx-miniprogram-bindings'
import { reqRankings } from '../../services/music'
import {store} from '../../store/store'

Page({
  data: {
    showInfo:[],
    type:'',
    menuInfo:{},
  },

  onLoad(options) {
    this.storeBindings=createStoreBindings(this,{
      store,
      actions:['updateCurrentSongList','updateCurrentSongIndex'],
    })
    //点击进来的地方不同，显示的内容不同
    this.setData({type:options.type})
    const map={
      3779629:'newRankings',
      2884035:'originRankings',
      19723756:'upRankings'
    }
    if(options.type==='recommand'){
      this.setData({showList:store.recommandSongs,
        title:'推荐歌曲'
      })
    }
    else if(options.type==='ranking'){
      this.setData({showList:store.rankings[map[options.id]].tracks,
      title:store.rankings[map[options.id]].name})
    }else if(options.type==='menu'){
      this.getMenuSongList(options.id)
    }
  },
  onUnload() {
    this.storeBindings.destroyStoreBindings()
  },
  onMoreSongItemTap(event){
    if(this.data.type==='recommand'){
      this.updateCurrentSongList(this.data.type,[])
      this.updateCurrentSongIndex(event.target.dataset.index)
    }else{
      this.updateCurrentSongList(this.data.type,this.data.showList)
      this.updateCurrentSongIndex(event.target.dataset.index)
    }
  },
  async getMenuSongList(id){
    let res =await reqRankings(id)
    if(res.code===200){
      this.setData({showList:res.playlist.tracks,title:res.playlist.name,menuInfo:res.playlist})
    }else{
      console.log('加载menuSongList失败')
    }
  }
})