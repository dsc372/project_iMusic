import { myRequest } from "./index"

export function reqVideoList(limit=20, offset=0) {
  return myRequest.get({
    url: '/top/mv',
    data: {
      limit,
      offset,
    }
  })
}

export function reqMVUrl(id){
  return myRequest.get({
    url:"/mv/url",
    data:{
      id
    }
  })
}

export function reqMVInfo(mvid){
  return myRequest.get({
    url:'/mv/detail',
    data:{
      mvid
    }
  })
}

export function reqMVRelate(id){
  return myRequest.get({
    url:'/related/allvideo',
    data:{
      id
    }
  })
}