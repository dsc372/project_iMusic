// pages/music_player/music_player.js
import { reqSongDetail, reqSongLyric } from "../../../services/player"
import _ from "underscore"
import { parseLyric } from "../../../utils/parseLyric"
import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { store } from '../../../store/store'
const app = getApp()
const audioContext = store.audioContext
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songInfo: {},
    durationTime: 0,
    lyricInfos: [],
    lyric: '',
    lyricIndex: -1,

    isFirstPlay: true,

    lyricScrollTop: 0,
    currentPage: 0,
    contentHeight: 0,
    screenHeight: 0,
    pageTitles: ['歌曲', '歌词'],
    isChanging: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['isPlay', 'currentTime', 'playMode', 'isSameSong'],
      actions: ['updateCurrentSongIndex', 'updateIsPlay', 'updateCurrentTime', 'updatePlayMode', 'updateSongId'],
    })
    this.setData({ contentHeight: app.globalData.contentHeight, screenHeight: app.globalData.screenHeight })
    this.songPlay(options.id)
  },

  onUnload() {
    this.storeBindings.destroyStoreBindings()
  },

  onSwiperChange(event) {
    this.setData({ currentPage: event.detail.current })
  },

  onTabsTap(event) {
    this.setData({ currentPage: event.target.dataset.index })
  },

  onSliderChange(event) {
    this.setData({ isChanging: false })
    this.updateCurrentTime(event.detail.value / 100 * this.data.durationTime)
    this.updateIsPlay(true)
    audioContext.seek(event.detail.value / 100 * this.data.durationTime / 1000)//写入的是秒
    audioContext.play()
  },

  onSliderChangeing: _.throttle(function (event) {
    this.setData({ isChanging: true })
    this.updateCurrentTime(event.detail.value / 100 * this.data.durationTime)
  }, 200),

  onPlayOrPause() {
    this.updateIsPlay(!store.isPlay)
  },

  onPlayModeTap() {
    if (store.playMode === 2) {
      this.updatePlayMode(0)
    }
    else {
      this.updatePlayMode(store.playMode + 1)
    }
  },

  onPreOrNextTap(event) {
    this.changeSong(event.target.dataset.type)
  },

  changeSliderProcess: _.throttle(function () {
    if (store.currentTime === 0) this.setData({ isChanging: false })
    if (!this.data.isChanging) {
      this.updateCurrentTime(audioContext.currentTime * 1000)
    }
  }, 800, { leading: false, trailing: false }),

  changeSong(type) {
    if (store.playMode !== 2) {
      if (type === 'pre') {
        if (store.currentSongIndex === 0) {
          this.updateCurrentSongIndex(store.currentSongList.length - 1)
        }
        else {
          this.updateCurrentSongIndex(store.currentSongIndex - 1)
        }
      } else {
        if (store.currentSongIndex === store.currentSongList.length - 1) {
          this.updateCurrentSongIndex(0)
        } else {
          this.updateCurrentSongIndex(store.currentSongIndex + 1)
        }
      }
    } else {
      this.updateCurrentSongIndex(Math.floor(Math.random() * (store.currentSongList.length - 1)))
    }
    this.setData({ songInfo: {} })
    this.updateCurrentTime(0)
    this.songPlay(store.currentSongList[store.currentSongIndex].id)
  },

  songPlay(id) {
    this.updateSongId(id)
    this.getSongDetail(id)
    this.getSongLyric(id)
    try {
      audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
      audioContext.autoplay = true
      if (store.isSameSong) {//同一首歌重进页面后由于onWaiting导致的onTimeUpdate失效
        audioContext.pause();
        if (store.isPlay) {
          audioContext.play()
        }
      }
      if (this.data.isFirstPlay) {
        this.data.isFirstPlay = false
        audioContext.onTimeUpdate(() => {
          this.updateIsPlay(true)//处理在首页play-bar暂停后开启新歌isPlay为flase的bug
          this.changeSliderProcess()
          let index = this.data.lyricInfos.length - 1
          for (let i = 0; i < this.data.lyricInfos.length; i++) {
            const info = this.data.lyricInfos[i]
            if (info.time > audioContext.currentTime * 1000) {
              index = i - 1
              break
            }
          }
          if (this.data.lyricIndex === index) return
          else {
            this.setData({ lyric: this.data.lyricInfos[index].text, lyricIndex: index, lyricScrollTop: index * 40 })
          }
        })
        audioContext.onWaiting(() => {
          audioContext.pause()
        })
        audioContext.onCanplay(() => {
          audioContext.play()
        })
        audioContext.onEnded(() => {
          if (store.playMode !== 1) {
            this.changeSong('next')
          } else {
            audioContext.play()
          }
        })
      }
    } catch (error) {
      wx.showToast({
        title: '加载歌曲失败',
        icon: 'error',
        duration: 1000
      })
    }
  },

  async getSongDetail(id) {
    let res = await reqSongDetail(id)
    if (res.code === 200) {
      this.setData({ songInfo: res.songs[0], durationTime: res.songs[0].dt })
    } else {
      console.log("加载songDetail失败")
    }
  },

  async getSongLyric(id) {
    let res = await reqSongLyric(id)
    if (res.code === 200) {
      this.setData({ lyricInfos: parseLyric(res.lrc.lyric) })
    }
  }
})