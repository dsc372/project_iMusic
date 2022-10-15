// pages/detail_search/detail_search.js
import { reqSearchDefault, reqHotList, reqSearchAnswer } from "../../../services/search"
import _ from "underscore"
Page({

  data: {
    searchDefault: '',
    searchValue: '',
    hotList: [],
    searchAnswer: [],
    history: [],
  },
  onLoad(options) {
    this.getSearchDefault()
    this.getHotList()
  },

  onSearchChange(event) {
    this.setData({ searchValue: event.detail })
    this.getSearchAnswer(this.data.searchValue)
  },

  onHotItemTap(event){
    this.addHistory(this.data.hotList[event.currentTarget.dataset.index].searchWord)
  },

  onSearchAnswerTap(event){
    this.addHistory(this.data.searchAnswer[event.currentTarget.dataset.index].name)
    this.setData({searchValue:''})
  },

  onDeleteTap(){
    this.setData({history:[]})
  },

  addHistory(val) {
    const index=this.data.history.indexOf(val)
    if(index!==-1){
      console.log(index)
      this.data.history.splice(index,1)
      console.log(this.data.history.length)
    }
    this.setData({history:[val,...this.data.history]})
    if(this.data.history.length>10){
      this.setData({history:this.data.history.splice(0,10)})
    }
  },

  async getSearchDefault() {
    let res = await reqSearchDefault()
    if (res.code === 200) {
      this.setData({ searchDefault: res.data.showKeyword })
    } else {
      console.log('加载searchDefault失败')
    }
  },

  async getHotList() {
    let res = await reqHotList()
    if (res.code === 200) {
      this.setData({ hotList: res.data })
    } else {
      console.log('加载hotList失败')
    }
  },

  async getSearchAnswer(keywords, limit = 10) {
    if (keywords === '') return
    let res = await reqSearchAnswer(keywords, limit)
    if (res.code === 200) {
      this.setData({ searchAnswer: res.result.songs })
    } else {
      this.setData({ searchAnswer: ['暂未搜索到相关内容'] })
    }
  }
})