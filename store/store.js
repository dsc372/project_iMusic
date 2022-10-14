import { observable, action } from 'mobx-miniprogram'
const audioContext = wx.createInnerAudioContext()//创建播放器
export const store = observable({
  songId:-1,
  isSameSong:false,
  recommandSongs: [],
  rankings: {},
  currentSongList:[],
  currentSongIndex:-1,
  currentTime:0,
  audioContext:audioContext,
  isPlay:true,
  playMode: 0,//0为顺序播放，1为单曲循环，2为随机播放

  updateRecommandSongs: action(function (recommandSongs) {
    this.recommandSongs = recommandSongs
  }),
  updateRankings: action(function (rankings) {
    const map = {
      '新歌榜': 'newRankings',
      '原创榜': 'originRankings',
      '飙升榜': 'upRankings'
    }
    const tempRankings = {}
    for (let i = 0; i < 3; i++) {
      let key = rankings[i].playlist.name
      tempRankings[map[key]] = rankings[i].playlist
    }
    this.rankings = tempRankings
  }),
  updateCurrentSongList: action(function (type, list) {
    if (type === 'recommand') { 
      this.currentSongList = this.recommandSongs 
    }
    else {
      this.currentSongList = [...list]
    }
  }),
  updateCurrentSongIndex:action(function(index){
    this.currentSongIndex=index
  }),
  updateIsPlay:action(function(boolean){
    this.isPlay=boolean
    if (this.isPlay) audioContext.play()
    else audioContext.pause()
  }),
  updateCurrentTime:action(function(time){
    this.currentTime=time
  }),
  updatePlayMode:action(function(num){
    this.playMode=num
  }),
  updateSongId:action(function(id){
    if(id===this.songId)this.isSameSong=true
    else this.isSameSong=false
    this.songId=id
  }),
})