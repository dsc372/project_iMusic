// components/moreSong_item/moreSong_item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemData: {
      type: Object,
      value: {},
    },
    index:{
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSongItemTap(){
      wx.navigateTo({
        url: `/packagePlayer/pages/music_player/music_player?id=${this.properties.itemData.id}`,
      })
    }
  }
})
