// pages/detail_video/detail_video.js
import {reqMVUrl,reqMVInfo,reqMVRelate} from "../../../services/video"

Page({
  data:{
    id:0,
    mvUrl:'',
    mvInfo:{},
    mvRelate:[],
  },
  onLoad(options){
    this.setData({id:options.id})
    this.getMVUrl(this.data.id)
    this.getMVInfo(this.data.id)
    this.getMVRelate(this.data.id)
  },
  async getMVUrl(id){
    let res=await reqMVUrl(id)
    if(res.code===200){
      this.setData({mvUrl:res.data.url})
    }else{
      console.log('获取mvUrl失败')
    }
  },
  async getMVInfo(id){
    let res=await reqMVInfo(id)
    if(res.code===200){
      this.setData({mvInfo:res.data})
    }else{
      console.log('获取mvUrl失败')
    }
  },
  async getMVRelate(id){
    let res=await reqMVRelate(id)
    if(res.code===200){
      this.setData({mvRelate:res.data})
    }else{
      console.log('获取mvRelate失败')
    }
  },
})