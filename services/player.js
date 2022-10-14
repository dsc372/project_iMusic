import {myRequest} from './index'

export function reqSongDetail(ids){//一次可传多首歌
  return myRequest.get({
    url:"/song/detail",
    data:{
      ids
    }
  })
}

export function reqSongLyric(id){
  return myRequest.get({
    url:"/lyric",
    data:{
      id
    }
  })
}