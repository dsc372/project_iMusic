1.音乐页面轮播图的高度由图片的高度动态决定，在image标签bindload的回调中计算宽高比，在乘以swiper的宽度即可,并节流
2.热门歌单scrollview向左滚动时，左边padding变小:
style="margin-left: -{{scrollMarginLeft}}rpx;width:{{scrollWidth}}rpx", 
onScroll(event){
    const scrollMarginLeft=event.detail.scrollLeft>25?25:event.detail.scrollLeft
    this.setData({scrollMarginLeft})
    this.setData({scrollWidth:725+scrollMarginLeft})
},
3.推荐歌单请求时的cat参数应由用户生成，此处写死为“华语”
4.更多歌单在请求完tags后要根据tags中的tag分别去请求歌单，要用到Promis.all
5.mobx中对象深度响应式，暂时考虑整个替换
6.频繁setData页面渲染慢，考虑左边直接插一段view代替maigin
<scroll-view class="menu-list" scroll-x enable-flex bindscroll="onScroll" style="margin-left: -{{scrollMarginLeft}}rpx;width:{{scrollWidth}}rpx">
onScroll(event){
  const scrollMarginLeft=event.detail.scrollLeft>25?25:event.detail.scrollLeft
  this.setData({scrollMarginLeft})
  this.setData({scrollWidth:725+scrollMarginLeft})
  console.log(this.data.scrollMarginLeft,this.data.scrollWidth)
},
7.歌曲详情中使用轮播图，监听change，修改nav中的歌曲/歌词
8.music_player页面必读通过screenHeight+margin-bottom适应不同机型
9.歌曲播放：
const audioContext = wx.createInnerAudioContext()//创建播放器
audioContext.src = `https://music.163.com/song/media/outer/url?id=${this.data.id}.mp3`
audioContext.autoplay=true
10.歌曲跳转后不在onUpdateTime（可能是因为缓存问题，内部暂停了一下）
audioContext.onWaiting(()=>{
  audioContext.pause()
})
audioContext.onCanplay(()=>{
  audioContext.play()
})
11.slider滑动时只改时间，松手后，才改音频
12.滑动滑块时，歌曲仍在播放，依旧会audioContext.onTimeUpdate，导致滑块反复横跳，增加一个变量isChanging解决
13.移动滑块时，加节流，避免setData过于频繁，滑块渲染延迟
14.快速点击滑块时滑块跳动（onTimeUpdate中有一瞬间audioContext.currentTime仍为原值）
方案1:在seek之后立即setData一次（还是有一定几率出现）
方案2:给onTimeUpdate中onSliderChangeing节流并{leading:false,trailing:false}
15.那个歌曲在歌单中的索引通过wx:for中的index即可
16.播放器的监听只需要加一次
if (this.data.isFirstPlay) {}
17.随机播放：在next中random
   单曲循环：在onEnded中autdioContext.play()
18.同一首歌重进页面后由于onWaiting导致onTimeUpdate失效
audioContext.pause()；
audioContext.play();但这样会导致报一个play()打断pause()的错误
可以在进入player页面时通过ID添加一个isSameSong，只有为true时才执行上面的代码
19.分包、手动对vant处理，使主包大小从690+k降至350+k
