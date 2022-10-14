// pages/more_menu/more_menu.js
import { all } from 'underscore'
import {reqSongMenuTag,reqSongMenuList, reqRecommandList} from '../../services/music'
Page({
  data:{
    songMenus:[],
  },
  onLoad(){
    this.getSongMenuTag()
  },
  async getSongMenuTag(){
    let res= await reqSongMenuTag()
    if(res.code===200){
      const tags=res.tags
      const allPromise=[]
      for(const tag of tags){
        allPromise.push(reqSongMenuList(tag.name))
      }
      Promise.all(allPromise).then(res=>{
        this.setData({songMenus:res})
      })
    }else{
      console.log('获取songMenuTag失败')
    }
  }
})