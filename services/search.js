import {myRequest} from './index'

export function reqSearchDefault(){
  return myRequest.get({
    url:'/search/default',
  })
}

export function reqHotList(){
  return myRequest.get({
    url:'/search/hot/detail',
  })
}

export function reqSearchAnswer(keywords,limit=10){
  return myRequest.get({
    url:`/search?keywords=${keywords}&limit=${limit}`
  })
}