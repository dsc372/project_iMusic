import {myRequest} from './index'
export function reqMusicBanner(type=0){
  return myRequest.get({
    url:'/banner',
    data:{
      type
    }
  })
}

export function reqRecommandList(id){
  return  myRequest.get({
    url:"/playlist/detail",
    data:{
      id
    }
  })
}

export function reqSongMenuList(cat='全部',limit=6,offest=0){
  return myRequest.get({
    url:"/top/playlist",
    data:{
      cat,
      limit,
      offest,
    }
  })
}

export function reqSongMenuTag(){
  return myRequest.get({
    url:'/playlist/hot',
  })
}

export function reqRankings(id){
  return myRequest.get({
    url:'/playlist/detail',
    data:{
      id
    }
  })
}